/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#D42F2F',
          green: '#0F5132',
          gold: '#FFD700',
        }
      },
      fontFamily: {
        christmas: ['Dancing Script', 'cursive'],
        greatVibes: ['Great Vibes', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
        lobster: ['Lobster', 'cursive'],
        sans: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        christmas: {
          "primary": "#D42F2F",
          "secondary": "#0F5132",
          "accent": "#FFD700",
          "neutral": "#2a323c",
          "base-100": "#1d232a",
          "base-200": "#191e24",
          "base-300": "#15191e",
        },
      },
    ],
  },
}