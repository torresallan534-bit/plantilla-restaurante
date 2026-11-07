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
        // Clases semánticas dinámicas conectadas al Global de Payload CMS
        primary: {
          DEFAULT: 'rgb(var(--color-primary-rgb, 194 65 12) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-rgb, 194 65 12) / 0.9)',
          light: 'rgb(var(--color-primary-rgb, 194 65 12) / 0.1)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary-rgb, 217 119 6) / <alpha-value>)',
          hover: 'rgb(var(--color-secondary-rgb, 217 119 6) / 0.9)',
          light: 'rgb(var(--color-secondary-rgb, 217 119 6) / 0.1)',
        },
        'theme-bg': 'rgb(var(--color-bg-warm-rgb, 250 248 245) / <alpha-value>)',
        'theme-surface': 'rgb(var(--color-surface-rgb, 255 255 255) / <alpha-value>)',
        'theme-text': 'rgb(var(--color-text-main-rgb, 28 25 23) / <alpha-value>)',

        // Alias retrocompatibles
        brand: {
          primary: 'rgb(var(--color-primary-rgb, 194 65 12) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary-rgb, 217 119 6) / <alpha-value>)',
          surface: 'rgb(var(--color-surface-rgb, 255 255 255) / <alpha-value>)',
          'warm-bg': 'rgb(var(--color-bg-warm-rgb, 250 248 245) / <alpha-value>)',
          dark: 'rgb(var(--color-text-main-rgb, 28 25 23) / <alpha-value>)',
        },
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(28, 25, 23, 0.05)',
        card: '0 10px 30px -4px rgba(28, 25, 23, 0.08)',
        hover: '0 20px 40px -6px rgba(28, 25, 23, 0.12)',
        'primary/20': '0 10px 25px -5px rgb(var(--color-primary-rgb, 194 65 12) / 0.2)',
        'primary/25': '0 10px 25px -5px rgb(var(--color-primary-rgb, 194 65 12) / 0.25)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
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
