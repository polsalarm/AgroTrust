/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#154212',
        'primary-container': '#42683A',
        'on-primary': '#FFFFFF',
        'primary-fixed': '#bcf0ae',
        'on-primary-fixed': '#002201',
        'secondary': '#8DAF7E',
        'secondary-container': '#bcf0ae',
        'on-secondary': '#002201',
        'on-secondary-container': '#154212',
        'surface-container-high': '#e3e9dd',
        'surface-container-lowest': '#fbf9f8',
        'surface-container-low': '#f6f3f2',
        'on-surface': '#1a1c18',
        'on-surface-variant': '#42493e',
        'outline': '#72796e',
        'outline-variant': '#c2c9bb',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
