const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/user");
const ERR = require("../constants/errorCodes");

exports.verifyAccess = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next(new AppError(ERR.AUTH_REQUIRED,"Authentication required",401));
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS);

    const user = await User.findById(payload.sub).select("-passwordHash -hashedRefreshToken");

    if (!user) {
      return next(new AppError(ERR.NOT_FOUND,"User not found",404));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError(ERR.AUTH_REQUIRED,"Session expired",401));
  }
};
