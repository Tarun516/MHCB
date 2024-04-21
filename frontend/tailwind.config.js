/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apricot: '#FFB78C',
        transparent: 'transparent',
        // You can adjust the hex value to match your desired shade of apricot
      },
    },
  },
  plugins: [],
};