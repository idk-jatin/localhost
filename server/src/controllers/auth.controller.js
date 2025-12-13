const User = require("../models/user");
const AppError = require("../utils/AppError");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { createOtp, validateOtp } = require("../services/otp.service");
const { sendVerifyOtp } = require("../utils/email");
const {signAccessToken,signRefreshToken,hashToken,} = require("../utils/token");
const { setAuthCookies } = require("../utils/cookies");




exports.registerUser = async (req, res, next) => {
  try {
    // Getting the zod validated user registeration data attached in body
    const { email, password, handle } = req.body;

    // Checking if email and handle is in use already
    if (await User.findOne({ email }))
      return next(new AppError("EMAIL_IN_USE", "Email already in use", 400));
    if (await User.findOne({ handle }))
      return next(new AppError("HANDLE_IN_USE", "Handle already in use", 400));

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


