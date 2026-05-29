/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // AI Integrity brand palette
        // Warm, professional, approachable — not corporate-cold like enterprise tools
        brand: {
          50:  "#f0f4ff",
          100: "#e0eaff",
          200: "#c7d7fe",
          300: "#a4bcfd",
          400: "#7a97fa",
          500: "#5a72f5",  // primary
          600: "#4253e8",
          700: "#3540ce",
          800: "#2d37a6",
          900: "#2a3483",
          950: "#1b2055",
        },
        accent: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",  // warm accent
          600: "#ea6c10",
          700: "#c2560c",
          800: "#9a450d",
          900: "#7c3a0f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
