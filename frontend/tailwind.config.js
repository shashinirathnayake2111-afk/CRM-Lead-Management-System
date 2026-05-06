/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#38abf8',
          500: '#0e88d3',
          600: '#026aa2',
          700: '#035584',
          800: '#08486d',
          900: '#0c3d5b',
          950: '#08273d',
        },
      },
    },
  },
  plugins: [],
}
