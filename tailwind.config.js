/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/.vitepress/**/*.{vue,js,ts,jsx,tsx}",
    './docs/**/*.{md,vue,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
