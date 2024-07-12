/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#9D4CFF',
        secondary: '#16BEFD',
        secondaryblue:'#36bfff',
        secondarypink:'#b377fc',
        secondarygreen:'#8DDD71',
      },
      maxWidth: {
        '8xl': '100rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}