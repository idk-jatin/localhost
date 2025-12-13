const redis = require("../config/redis");
const AppError = require("../utils/AppError");

const OTP_TTL = 10 * 60; 
const MAX_ATTEMPTS = 5;

function buildOtpKey(email, purpose = "verify_email") {
  return `otp:${purpose}:${email.toLowerCase()}`;
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}


// Creates otp and store the temp user detail in Redis
exports.createOtp = async(email,tempUserData,purpose = "verify_email")=> {
  if (!redis) throw new AppError("REDIS_NOT_CONFIGURED", "Redis not configured", 500);

  const key = buildOtpKey(email, purpose);
  const code = generateOtp();

  const payload = {
    code,
    tempUserData,
    attempts: 0,
    purpose,
  };

  await redis.set(key, JSON.stringify(payload), { ex: OTP_TTL });

  return code;
}

// Validate Otp by fetching it from Redis and returning user data if true.
exports.validateOtp = async(email, inputCode, purpose = "verify_email")=> {
  if (!redis) throw new AppError("REDIS_NOT_CONFIGURED", "Redis not configured", 500);

  const key = buildOtpKey(email, purpose);
  const payload = await redis.get(key);

  if (!payload) {
    throw new AppError("OTP_EXPIRED", "OTP has expired or does not exist", 400);
  }
    // Limits using an otp for max 5 times
  if (payload.attempts >= MAX_ATTEMPTS) {
    throw new AppError("OTP_TOO_MANY_ATTEMPTS", "Too many wrong attempts", 429);
  }
  
  if (payload.code !== inputCode) {
    payload.attempts += 1;

    await redis.set(key, JSON.stringify(payload), { ex: OTP_TTL });

    throw new AppError("OTP_WRONG", "Incorrect OTP", 400);
  }
  // deletion after successful verification
  await redis.del(key);
  return payload.tempUserData;
}


