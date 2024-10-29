/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-black": "#282828",
        "black": "#000",
        "white": "#fff",
        "blue": "#55A3F0",
        "light-grey": "#F7F8F8",
        "grey" : "#F2F2F2",
        "semi-dark-gray" : "#E4E4E4",
        "dark-grey" : "#28282880",
        "green" : "#4ADE80",
        "red" : "#F43F5E"
      },
       fontFamily: {
        'vazirmatn': ['VazirMatn'],
      },
      fontWeight: {
        "200": 200,
        "300": 300,
        "400": 400,
        "500": 500,
        "600": 600,
      },
      borderRadius : {
        "4xl" :"7.5rem", 
        "12" : "3rem",
        "40": "40px",
        "30": "30px"
      },
    },
  },
  plugins: [],
}

