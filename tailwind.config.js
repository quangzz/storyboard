/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: '#7662AB',
          700: '#6b57a0',
        }
      },
      backdropBlur: {
        sm: '4px',
      }
    },
  },
  plugins: [],
}