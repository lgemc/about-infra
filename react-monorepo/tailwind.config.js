/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {},
  },
};
