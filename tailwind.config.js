/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    screens: {
      'lg': '1500px'
    },
    colors: {
      'primary': '#252525',
      'white': '#F2F2F2',
      'accent': '#0EBBAB',
      'test': '#FF0000',
      'dark': '#0F0F0F'
      },
    extend: {},
  },
  plugins: [],
  "scripts": {
    "build:css": "tailwindcss build styles.css -o output.css",
  }, 
}

