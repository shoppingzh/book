/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/.vitepress/**/*.{vue,js,ts,jsx,tsx}",
    './docs/**/*.{md,vue,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        primary: '#1D2129',
        regular: '#4E5969',
        secondary: '#86909C',
        disabled: '#C9CDD4',
      }
    },
  },
  plugins: [],
}
