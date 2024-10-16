/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-1': '#FDFBF8', // Add your custom color here
        'color-2' : '#C1B5A7',
      },
    },
  },
  plugins: [],
}
