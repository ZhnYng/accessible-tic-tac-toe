/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accessible-foreground': '#512D6D',
        'accessible-background': '#EEEEEE',
      }
    },
  },
  plugins: [],
}