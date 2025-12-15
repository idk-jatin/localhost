import { useState } from "react";
import TerminalPanel from "../components/ui/TerminalPanel";
import TerminalInput from "../components/ui/TerminalInput";
import TerminalButton from "../components/ui/TerminalButton";
import LogPanel from "../components/ui/LogPanel";
import api from "../api/axios";
import GridBackground from "../components/ui/GridBackground";

export default function Login() {
  const [mode, setMode] = useState("signup");
  const [phase, setPhase] = useState("credentials");

  /** ---------------- FORM STATE ---------------- */
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  /** ---------------- LOGS ---------------- */
  const [logs, setLogs] = useState([
    { message: "Auth module loaded", time: Date.now() },
    { message: "Awaiting credentials", time: Date.now() },
  ]);

  const pushLog = (message, level = "info") => {
    setLogs((prev) => [...prev, { message, level, time: Date.now() }]);
  };

  /** ---------------- ACTIONS ---------------- */

  // LOGIN (no OTP)
  const loginUser = async () => {
    try {
      pushLog("Authenticating user…");

      await api.post("/auth/login", {
        email,
        password,
      });

      pushLog("Authentication successful");
      pushLog("Session initialized");

      // redirect will come later
    } catch (err) {
      pushLog(err.response?.data?.error?.message || "Login failed", "error");
    }
  };

  // SIGNUP → REQUEST OTP
  const requestOtp = async () => {
    try {
      pushLog("Registering identity…");

      await api.post("/auth/register", {
        email,
        handle,
        password,
      });

      pushLog("OTP dispatched to registered email");
      pushLog("Awaiting OTP verification");

      setPhase("otp");
    } catch (err) {
      pushLog(err.response?.data?.error?.message || "Signup failed", "error");
    }
  };

  // VERIFY OTP (signup only)
  const verifyOtp = async () => {
    try {
      pushLog("Verifying OTP…");

      await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      pushLog("Identity verified");
      pushLog("Access granted");

      // redirect later
    } catch (err) {
      pushLog(
        err.response?.data?.error?.message || "OTP verification failed",
        "error"
      );
    }
  };

  /** ---------------- UI ---------------- */

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-3 sm:px-6">
      <GridBackground density="low" />

      {/* Vignette */}
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
                <button
                  onClick={() => {
                    setMode("login");
                    setPhase("credentials");
                    pushLog("Switched to LOGIN mode");
                  }}
                  className={mode === "login" ? "text-terminal" : "opacity-60"}
                >
                  (Yes
                </button>
                |
                <button
                  onClick={() => {
                    setMode("signup");
                    setPhase("credentials");
                    pushLog("Switched to SIGNUP mode");
                    pushLog("OTP verification will be required");
                  }}
                  className={mode === "signup" ? "text-terminal" : "opacity-60"}
                >
                  No)
                </button>
              </div>
            </div>
          }
          active
        >
          <div className="space-y-3 sm:space-y-4">
            {/* ---------- CREDENTIALS PHASE ---------- */}
            {phase === "credentials" && (
              <>
                <TerminalInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  prompt="email"
                />

                {mode === "signup" && (
                  <TerminalInput
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    prompt="handle"
                  />
                )}

                <TerminalInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  prompt="password"
                />

                <TerminalButton
                  onClick={mode === "login" ? loginUser : requestOtp}
                >
                  {mode === "login" ? "LOGIN" : "REQUEST OTP"}
                </TerminalButton>
              </>
            )}

            {/* ---------- OTP PHASE (SIGNUP ONLY) ---------- */}
            {phase === "otp" && (
              <>
                <TerminalInput
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  prompt="OTP>"
                />

                <TerminalButton onClick={verifyOtp}>VERIFY</TerminalButton>
              </>
            )}

            {/* ---------- SYSTEM LOGS ---------- */}
            <div className="border-t border-borderGreen pt-2">
              <LogPanel logs={logs} maxHeight="120px" />
            </div>
          </div>
        </TerminalPanel>
      </div>
    </div>
  );
}
