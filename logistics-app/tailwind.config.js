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
          DEFAULT: '#FF7A00',
        },
        background: {
          DEFAULT: '#ffffff',
          secondary: '#F8F9FA'
        }
      }
    },
  },
  plugins: [],
}
