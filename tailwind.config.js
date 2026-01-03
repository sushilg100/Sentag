
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          deep: '#0F1115',
          slate: '#161A22',
          focus: '#4C5C8A',
          positive: '#3A7D44',
          critical: '#B5474F',
          warning: '#C58B2A',
        }
      }
    },
  },
  plugins: [],
}
