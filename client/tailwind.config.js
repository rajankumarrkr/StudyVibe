/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-nav': 'rgb(var(--color-surface-nav) / <alpha-value>)',
        content: 'rgb(var(--color-content) / <alpha-value>)',
        overlay: 'rgb(var(--color-overlay) / <alpha-value>)',
        primary: {
          DEFAULT: '#6C4EFF',
          50: '#f0eeff',
          100: '#e4deff',
          200: '#cebfff',
          300: '#aa8eff',
          400: '#845cff',
          500: '#6c4eff',
          600: '#5c3aff',
          700: '#4e28e6',
          800: '#4122bc',
          900: '#361e96',
        },
        accent: {
          neon: '#00F0FF',
          violet: '#8B5CF6'
        }
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #6C4EFF 0%, #3B82F6 100%)',
        'neon-glow': 'radial-gradient(circle at 50% 50%, rgba(108, 78, 255, 0.15) 0%, transparent 80%)',
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(108, 78, 255, 0.25)',
        'glow': '0 0 20px rgba(108, 78, 255, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
