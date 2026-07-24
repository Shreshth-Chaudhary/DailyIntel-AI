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
        // DailyIntel Professional Editorial Design System
        di: {
          bg:       '#0d0e12',   // main background
          surface:  '#181920',   // card surfaces
          'surface-high': '#1e1f26', // elevated surfaces
          'surface-highest': '#24252e', // modals, top-level
          border:   '#464750',   // subtle borders
          'border-light': '#2a2c34', // very subtle dividers
          primary:  '#1a56db',   // CTA, active state
          'primary-dim': '#386bef', // hover
          secondary:'#0f766e',   // secondary actions (teal)
          teal:     '#0d9488',
          amber:    '#d97706',   // importance scores / UPSC
          'amber-light': '#f59e0b',
          red:      '#dc2626',
          green:    '#16a34a',
          text:     '#e5e4f0',   // primary text
          muted:    '#aaaab5',   // secondary text
          faint:    '#74757f',   // very muted / labels
          saffron:  '#f59e0b',   // UPSC saffron accent
        },
        // Legacy aliases to avoid breaking existing code
        intel: {
          50: '#f0f4ff',
          100: '#e0e9fe',
          200: '#bae0fd',
          300: '#7cc7fd',
          400: '#36a8fa',
          500: '#0c8ce9',
          600: '#1a56db',
          700: '#0157a3',
          800: '#064b86',
          900: '#0b3f6f',
          950: '#07284a',
        },
        bloomberg: {
          amber: '#d97706',
          green: '#16a34a',
          cyan: '#0d9488',
          red: '#dc2626',
          bg: '#0d0e12',
          card: '#181920',
          border: '#464750',
          hover: '#1e1f26',
        },
        upsc: {
          saffron: '#f59e0b',
          gold: '#d97706',
          navy: '#0f2042',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'IBM Plex Mono', 'monospace'],
        editorial: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'di': '4px',
        'di-md': '6px',
        'di-lg': '8px',
      },
      boxShadow: {
        'di': '0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.4)',
        'di-lg': '0 4px 16px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
