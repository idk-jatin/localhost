
const express = require("express");
const authRouter = express.Router();

const {registerUser,verifyOtp} = require("../controllers/auth.controller");
const {validate} = require('../middleware/validate');
const {registerSchema,verifyOtpSchema} = require('../schemas/auth.schemas');

// User register api endpoint
authRouter.post("/register",validate(registerSchema) ,registerUser);

// User email verification api endpoint
authRouter.post("/verify-otp",validate(verifyOtpSchema), verifyOtp);

module.exports = authRouter;
