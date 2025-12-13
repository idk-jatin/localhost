const { z } = require("zod");

exports.registerSchema = z.object({
  email: z
    .string()
    .min(5).max(80).email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20,{message: "Password must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9@]+$/,{
      message: "Password can contain only letters, numbers, and @"}),
  handle: z
    .string()
    .min(3, { message: "Handle must be at least 3 characters"})
    .max(30, { message: "Handle must be at most 30 characters"})
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Handle can only contain letters, numbers, _ and -",
    }),
});


exports.loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20,{message: "Password must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9@]+$/, {
      message: "Password can contain only letters, numbers, and @",
    }),
});


exports.verifyOtpSchema = z.object({
  email: z
    .string()
    .min(5).max(80).email({ message: "Invalid email address" }),

  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});
