
const express = require("express");
const authRouter = express.Router();

const {verifyAccess} = require('../middleware/auth.middleware')
const {registerUser,verifyOtp, loginUser, getMe, logoutUser, refreshToken} = require("../controllers/auth.controller");
const {validate} = require('../middleware/validate');
const {registerSchema,verifyOtpSchema,loginSchema} = require('../schemas/auth.schemas');

// User register api endpoint
authRouter.post("/register",validate(registerSchema) ,registerUser);

// User email verification api endpoint
authRouter.post("/verify-otp",validate(verifyOtpSchema), verifyOtp);

// User login api endpoint 
authRouter.post("/login",validate(loginSchema),loginUser);

// User detail fetching api protected by verifyAccess middleware
authRouter.get("/me",verifyAccess,getMe);

// User logout api protected endpoint
authRouter.post("/logout",verifyAccess,logoutUser);

// Access token refresh endpoint
authRouter.post("/refresh",refreshToken);

module.exports = authRouter;
