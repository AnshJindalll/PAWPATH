/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          600: "rgb(var(--olive-600) / <alpha-value>)",
          700: "rgb(var(--olive-700) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
