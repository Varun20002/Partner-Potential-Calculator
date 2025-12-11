/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00D09C',
        accent: '#EB5B3C',
        'bg-light': '#F8F9FA',
        'text-dark': '#44475B',
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

