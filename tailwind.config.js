/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      //Definisco i miei Breakpoint 
      'md':'1100px',
      'sm': '670px'
    },
    extend: {},
  },
  plugins: [],
}

