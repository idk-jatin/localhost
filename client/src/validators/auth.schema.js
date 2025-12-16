import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(5)
    .max(80)
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(/^[a-zA-Z0-9@]+$/, {
      message: "Password can contain only letters, numbers, and @",
    }),

  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(30, "Handle must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Handle can only contain letters, numbers, _ and -",
    }),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^[a-zA-Z0-9@]+$/, {
      message: "Password can contain only letters, numbers, and @",
    }),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});
