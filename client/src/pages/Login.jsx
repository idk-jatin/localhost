import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";

import TerminalPanel from "../components/ui/TerminalPanel";
import TerminalInput from "../components/ui/TerminalInput";
import TerminalButton from "../components/ui/TerminalButton";
import LogPanel from "../components/ui/LogPanel";
import GridBackground from "../components/ui/GridBackground";
import PasswordStrengthBar from "../components/PasswordStrength";

import { useAuth } from "../hooks/useAuth";
import { useFormLogs } from "../hooks/useFormLogs";
import { login, signup, verifyOtp, fetchMe } from "../store/auth.slice";
import { getPasswordStrength } from "../utils/ui/passwordStrength";

import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from "../validators/auth.schema";

export default function Login() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [mode, setMode] = useState("signup");
  const [phase, setPhase] = useState("credentials");

  const [logs, setLogs] = useState([
    { message: "Auth module loaded", time: Date.now() },
    { message: "Awaiting credentials", time: Date.now() },
  ]);

  const pushLog = (message, level = "info") => {
    setLogs((prev) => [...prev, { message, level, time: Date.now() }]);
  };

  const form = useForm({
    resolver: zodResolver(
      phase === "otp"
        ? verifyOtpSchema
        : mode === "login"
        ? loginSchema
        : registerSchema
    ),
  });

  const { register, handleSubmit, formState, getValues, reset, watch } = form;
  useFormLogs({ errors: formState.errors, pushLog });

  useEffect(() => {
    if (user) pushLog("Session authenticated, redirecting...");
  }, [user]);

  const password = watch("password");
  const { score } = getPasswordStrength(password);

  const onSubmit = async (data) => {
    console.log(formState.errors);

    console.log(data);

    try {
      if (mode === "login") {
        pushLog("Authenticating user...");
        const res = await dispatch(login(data));

        if (res.meta.requestStatus === "fulfilled") {
          pushLog("Authentication sucessful");
          await dispatch(fetchMe()).unwrap();
        } else {
          pushLog(res.payload?.message || "Login failed", "error");
        }
      }

      if (mode === "signup" && phase === "credentials") {
        pushLog("Regsitering identity...");
        const res = await dispatch(signup(data));
        if (res.meta.requestStatus === "fulfilled") {
          pushLog("OTP dispatched to registered email");
          pushLog("Awaiting OTP verification");
          setPhase("otp");
        } else {
          pushLog(res.payload?.message || "Signup failed", "error");
        }
      }

      if (phase === "otp") {
        pushLog("Verifying OTP...");
        const res = await dispatch(
          verifyOtp({ email: getValues("email"), otp: data.otp })
        );
        if (res.meta.requestStatus === "fulfilled") {
          pushLog("Identity verified");
          await dispatch(fetchMe()).unwrap();
        } else {
          pushLog(res.payload?.message || "OTP verification failed", "error");
        }
      }
    } catch {
      pushLog("Unexpected system error", "error");
    }
  };
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-3 sm:px-6">
      <GridBackground density="low" />

      <div
        className="
        absolute inset-0
        bg-gradient-to-b
        from-bg via-transparent to-bg
        pointer-events-none
      "
      />
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <TerminalPanel
          title={
            <div className="flex items-center justify-between gap-2">
              <span className="truncate">
                {mode === "login" ? "AUTH :: LOGIN" : "AUTH :: SIGNUP"}
              </span>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-terminalMuted">
                {"~$login?"}
                {"("}
                <button
                  onClick={() => {
                    setMode("login");
                    setPhase("credentials");
                    reset();
                    pushLog("Switched to LOGIN mode");
                  }}
                  className={mode === "login" ? "text-terminal" : "opacity-60"}
                >
                  Yes
                </button>
                |
                <button
                  onClick={() => {
                    setMode("signup");
                    setPhase("credentials");
                    reset();
                    pushLog("Switched to SIGNUP mode");
                  }}
                  className={mode === "signup" ? "text-terminal" : "opacity-60"}
                >
                  No
                </button>
                {")"}
              </div>
            </div>
          }
          active
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-4"
          >
            {phase === "credentials" && (
              <>
                <TerminalInput
                  prompt="email"
                  {...register("email")}
                  error={formState.errors.email}
                />

                {mode === "signup" && (
                  <TerminalInput
                    prompt="handle"
                    {...register("handle")}
                    error={formState.errors.handle}
                  />
                )}

                <TerminalInput
                  type="password"
                  prompt="password"
                  {...register("password")}
                  error={formState.errors.password}
                />
                {mode === "signup" && phase === "credentials" && (
                  <PasswordStrengthBar score={score} />
                )}

                <TerminalButton type="submit">
                  {mode === "login" ? "LOGIN" : "REQUEST OTP"}
                </TerminalButton>
              </>
            )}

            {phase === "otp" && (
              <>
                <TerminalInput
                  prompt="OTP"
                  {...register("otp")}
                  error={formState.errors.otp}
                />

                <TerminalButton type="submit">VERIFY</TerminalButton>
              </>
            )}
            <div className="border-t border-borderGreen pt-2">
              <LogPanel logs={logs} maxHeight="120px" />
            </div>
          </form>
        </TerminalPanel>
      </div>
    </div>
  );
}
