/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'pastel-blue': '#A7BED3',
        'pastel-pink': '#F2C9D6',
        'pastel-yellow': '#FFF5C2',
        'pastel-green': '#C2E9B2',
        'pastel-purple': '#D8B5E5',
      }
    },
  },
  plugins: [],
}