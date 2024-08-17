/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(-30%)' },
          '100%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'wiggle': 'wiggle 1s ease-in-out',
      },
    },
  },
  plugins: [],
}