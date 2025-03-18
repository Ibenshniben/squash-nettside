/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af', // blue-800
          hover: '#1e3a8a', // blue-900
        },
        secondary: {
          DEFAULT: '#16a34a', // green-600
          hover: '#15803d', // green-700
        }
      },
    },
  },
  plugins: [],
}