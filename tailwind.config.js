/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        intel: {
          50: '#f0f4ff',
          100: '#e0e9fe',
          200: '#bae0fd',
          300: '#7cc7fd',
          400: '#36a8fa',
          500: '#0c8ce9',
          600: '#006ec7',
          700: '#0157a3',
          800: '#064b86',
          900: '#0b3f6f',
          950: '#07284a',
        },
        bloomberg: {
          amber: '#ffb000',
          green: '#00e676',
          cyan: '#00e5ff',
          red: '#ff1744',
          bg: '#0a0d14',
          card: '#121722',
          border: '#1e2638',
          hover: '#1a2234',
        },
        upsc: {
          saffron: '#ff7722',
          gold: '#e6a100',
          navy: '#0f2042',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(12, 140, 233, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(12, 140, 233, 0.6)' },
        }
      }
    },
  },
  plugins: [],
};
