/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#2c1e4a",
        secondary: "#1e1536",
      },
      fontFamily: {
        rubik: ['"Rubik Mono One"', "sans-serif"],
        dancingScript: ['"Dancing Script"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
