import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-primary, #C2410C)',
          'primary-hover': 'var(--color-primary-hover, #9A3412)',
          'primary-light': 'var(--color-primary-light, #FFEDD5)',
          accent: 'var(--color-accent, #D97706)',
          'accent-hover': 'var(--color-accent-hover, #B45309)',
          'accent-light': 'var(--color-accent-light, #FEF3C7)',
          surface: 'var(--color-surface, #FFFFFF)',
          'warm-bg': 'var(--color-bg-warm, #FAF8F5)',
          cream: 'var(--color-cream, #FFFDF9)',
          dark: 'var(--color-dark, #1C1917)',
          'dark-muted': 'var(--color-dark-muted, #78716C)',
          border: 'var(--color-border, #E7E5E4)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(28, 25, 23, 0.05)',
        card: '0 10px 30px -4px rgba(28, 25, 23, 0.08)',
        hover: '0 20px 40px -6px rgba(28, 25, 23, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
