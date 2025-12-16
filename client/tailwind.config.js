import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        bg: "#09090b",
        terminal: "#22c55e",
        terminalMuted: "#16a34a",
        warning: "#facc15",
        error: "#ef4444",

        borderGreen: "rgba(34,197,94,0.25)",
        gridGreen: "rgba(34,197,94,0.08)",
      },

      fontFamily: {
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },

      animation: {
        blink: "blink 1s steps(1) infinite",
        pulseSlow: "pulseSlow 4s linear infinite",
         terminalPulse: "terminalPulse 0.6s ease-out",
      },

      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
        pulseSlow: {
          "0%": { opacity: "0.4" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.4" },
        },
      },

      boxShadow: {
        terminalSoft: "0 0 4px rgba(34,197,94,0.18)",
        terminalFocus: "0 0 6px rgba(34,197,94,0.35)",
        terminalPulse: "0 0 10px rgba(34,197,94,0.5)",
        terminalError: "0 0 6px rgb(239, 68, 68,0.35)"
      },

      borderWidth: {
        DEFAULT: "1px",
      },
    },
  },

  plugins: [],
};
