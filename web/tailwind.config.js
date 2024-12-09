/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleUpDown: {
          "0%, 100%" : { transform: "scale(1)" },
          "50%" : { transform: "scale(1.1)" },
        },
      },
      animation: {
        scaleLoop: "scaleUpDown 2s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}

