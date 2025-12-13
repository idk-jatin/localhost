/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        terminal: {
          bg: "#020617",      // zinc-950
          green: "#22c55e",   // green-500
          border: "#1f2933",  // custom dark border
        },
      },
    },
  },
  plugins: [],
};
