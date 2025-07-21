/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8F3",
        beige: "#EADCD1",
        "brown-light": "#D8A384",
        "brown-dark": "#6B6A69",
        "text-main": "#312E2B",
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
        script: ["Dancing Script", "cursive"],
        mono: ["Special Elite", "monospace"],
      },
    },
  },
  plugins: [],
};
