/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        primary: {
          DEFAULT: '#0f172a',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#64748b',
          foreground: '#0f172a',
        },
        accent: {
          DEFAULT: '#4f46e5', // indigo
          light: '#eef2ff',
        },
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
      }
    },
  },
  plugins: [],
}
