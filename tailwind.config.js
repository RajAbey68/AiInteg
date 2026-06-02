/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Deep ink — primary dark surface (replaces generic navy)
        ink: {
          50:  '#f3f4f6',
          100: '#e5e7eb',
          200: '#c8cbd0',
          300: '#9ea3ad',
          400: '#6b7280',
          500: '#4b5563',
          600: '#374151',
          700: '#1f2937',
          800: '#111827',
          900: '#0a0f1a',
          950: '#050810',
        },
        // Burnished gold — single accent, earns trust from regulated professions
        gold: {
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
        // Warm parchment — off-white body background (not clinical white)
        parchment: {
          50:  '#fdfcf8',
          100: '#faf7f0',
          200: '#f5f0e4',
          300: '#ede5d1',
        },
      },
    },
  },
  plugins: [],
};
