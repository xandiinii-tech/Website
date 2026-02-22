module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0f0f0f",
          800: "#1a1a1a",
          700: "#2d2d2d",
        },
        accent: {
          purple: "#a855f7",
          pink: "#ec4899",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blink-3': 'blink-3 1.2s steps(6, start) 1',
      },
      keyframes: {
        'blink-3': {
          '0%, 10%, 20%, 30%, 40%, 50%, 60%': { opacity: '1' },
          '5%, 15%, 25%, 35%, 45%, 55%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
