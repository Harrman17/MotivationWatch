/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    colors: {
      'primary': '#3C3C3C',
      'white': '#F2F2F2',
      'accent': '#0EBBAB',
      'test': '#FF0000'
      },
    extend: {},
  },
  plugins: [],
  "scripts": {
    "build:css": "tailwindcss build styles.css -o output.css",
  }, 
}

