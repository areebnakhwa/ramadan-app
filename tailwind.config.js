/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "islamic-primary": "#D4AF37", // Gold
        "islamic-bg": "#0f0f0f", // Dark Background
        "islamic-card": "#1a1a1a", // Card Background
      },
    },
  },
  plugins: [],
};
