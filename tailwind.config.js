/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,jade}", "!./node_modules"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      keyframes: {
        "float-and-bounce": {
          "0%": {
            transform: "translateY(0) rotate(0)",
          },
          "33%": {
            transform: "translateY(-1rem) rotate(-1deg)",
          },
          "66%": {
            transform: "translateY(-0.5rem) rotate(2deg)",
          },
          "100%": {
            transform: "translateY(0) rotate(0)",
          },
        },
      },
      animation: {
        "float-and-bounce": "float-and-bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
