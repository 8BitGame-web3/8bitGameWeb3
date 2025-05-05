/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'retro-black': '#0f0f0f',
        'retro-gray': '#1a1a1a',
        'retro-white': '#f0f0f0',
        'retro-red': '#ff0000',
        'retro-green': '#00ff00',
        'retro-blue': '#0000ff',
      },
      fontFamily: {
        'retro': ['Press Start 2P', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 