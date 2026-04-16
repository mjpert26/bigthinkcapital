/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Big Think Capital brand palette
        // Primary: deep navy blue — trust, expertise, financial authority
        btc: {
          50:  '#f0f6ff',
          100: '#dbe8ff',
          200: '#bdd3ff',
          300: '#8fb4ff',
          400: '#5e8dff',
          500: '#3a68f5',
          600: '#254be0',
          700: '#1d3bbb',  // Primary brand blue
          800: '#1a3396',
          900: '#0e2366',  // Deep navy (headers, hero bg)
          950: '#071542',
        },
        // Accent: gold/amber for CTAs and highlights — premium, optimistic
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // Primary accent
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Neutrals — slightly warm grays for body/background
        neutral: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        // Semantic
        success: '#10b981',
        warning: '#f59e0b',
        error:   '#ef4444',
      },
      fontFamily: {
        display: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        'btc-sm':  '0 1px 2px 0 rgb(14 35 102 / 0.05)',
        'btc':     '0 4px 12px -2px rgb(14 35 102 / 0.08), 0 2px 4px -2px rgb(14 35 102 / 0.04)',
        'btc-lg':  '0 20px 40px -12px rgb(14 35 102 / 0.15), 0 8px 16px -8px rgb(14 35 102 / 0.08)',
        'btc-xl':  '0 32px 64px -16px rgb(14 35 102 / 0.20), 0 16px 32px -16px rgb(14 35 102 / 0.12)',
        'glow':    '0 0 40px rgb(245 158 11 / 0.25)',
      },
      backgroundImage: {
        'gradient-btc':    'linear-gradient(135deg, #0e2366 0%, #1d3bbb 100%)',
        'gradient-accent': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'gradient-hero':   'radial-gradient(ellipse at top, #1d3bbb 0%, #0e2366 50%, #071542 100%)',
      },
      animation: {
        'fade-in':   'fadeIn 0.6s ease-out forwards',
        'slide-up':  'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':     'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float:   { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
}
