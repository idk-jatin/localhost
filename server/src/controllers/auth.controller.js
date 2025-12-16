const User = require("../models/user");
const AppError = require("../utils/AppError");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { createOtp, validateOtp } = require("../services/otp.service");
const { sendVerifyOtp } = require("../utils/email");
const {
  signAccessToken,
  signRefreshToken,
  hashToken,
  verifyRefreshToken, 
  verifyTokenHash
} = require("../utils/token");
const { setAuthCookies } = require("../utils/cookies");
const ERR = require("../constants/errorCodes");

exports.registerUser = async (req, res, next) => {
  try {
    // Getting the zod validated user registeration data attached in body
    const { email, password, handle } = req.body;

    // Checking if email and handle is in use already
    if (await User.findOne({ email }))
      return next(new AppError(ERR.EMAIL_IN_USE, "Email already in use", 400));
    if (await User.findOne({ handle }))
      return next(
        new AppError(ERR.HANDLE_IN_USE, "Handle already in use", 400)
      );

    const passwordHash = await argon2.hash(password);

    // Creates otp and stores data in redis client
    const otp = await createOtp(
      email,
      { email, passwordHash, handle },
      "verify_email"
    );

    // Sends mail to the user email
    await sendVerifyOtp(email, otp);

    return res.json({ ok: true, data: { message: "OTP sent to email" } });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    // Validates User Input Otp to the temporary stored in Redis
    const userData = await validateOtp(email, otp, "verify_email");

    // Creating User Instance in DB
    const user = await User.create({
      email: userData.email,
      passwordHash: userData.passwordHash,
      handle: userData.handle,
      emailVerified: true,
      role: "user",
    });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);
    // Saving hashed refresh token in DB for rotation
    user.hashedRefreshToken = await hashToken(refreshToken);
    await user.save();

    // Setting the cookie in the browser
    setAuthCookies(res, { accessToken, refreshToken });

    return res.json({
      ok: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          handle: user.handle,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Checking email exist or not
    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new AppError(ERR.INVALID_CREDENTIALS, "Invalid email or password", 400)
      );
    }
  

    const valid = await argon2.verify(user.passwordHash, password);

    
    // Checking credentials
    if (!valid) {
      return next(
        new AppError(ERR.INVALID_CREDENTIALS, "Invalid email or password", 400)
      );
    }

    if (!user.emailVerified) {
      return next(
        new AppError(
          ERR.EMAIL_NOT_VERIFIED,
          "Please verify your email first",
          403
        )
      );
    }
  //Setting up the cookies
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    // Saving hashed refresh token in DB for rotation
    user.hashedRefreshToken = await hashToken(refreshToken);
    await user.save();

    // Setting the cookie in the browser
    setAuthCookies(res, { accessToken, refreshToken });

    return res.json({
      ok: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          handle: user.handle,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    // If the referesh token is present, nulling it from DB for avoiding reuse
    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken);

        const user = await User.findById(payload.sub);
        if (user) {
          user.hashedRefreshToken = null;
          await user.save();
        }
      } catch {}
    }
    // Clearing cookie from browser
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({ ok: true, data: { message: "Logged out successfully" } });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async(req,res,next)=>{
  try {
    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken){
      return next(new AppError(ERR.AUTH_REQUIRED,"Refresh Token Missing",401));
    }
    // Extracting payload from existing refresh token
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      return next(new AppError(ERR.AUTH_REQUIRED,"Invalid or expired refresh token",401));
    }
    // Matching the refresh token valid or not with DB
    const user = await User.findById(payload.sub);

    if(!user || !user.hashedRefreshToken){
      return next(new AppError(ERR.AUTH_REQUIRED,"Session Expired",401));
    }

    const valid = verifyTokenHash(user.hashedRefreshToken,refreshToken);

    if(!valid){
      return next(new AppError(ERR.AUTH_REQUIRED,"Invalid refresh token",401))
    }

    // Assigning new access token
    const newAccessToken = signAccessToken(user._id);

    setAuthCookies(res,{accessToken:newAccessToken,refreshToken});

    return res.json({ok:true,data:{message:"Access token refreshed"}});

  } catch (err) {
    next(err);
  }
}


exports.getMe = async(req,res,next)=>{
  try {
    // User is already attached by verifyAcess middleware
    res.setHeader("Cache-Control", "no-store");
    return res.json({ok:true,
      data:{
        user:{
          id:req.user._id,
          email:req.user.email,
          handle:req.user.handle,
          role: req.user.role,
          emailVerified: req.user.emailVerified,
          stacks: req.user.stacks
        }
      }
    });

  } catch (err) {
    next(err);
  }
}

