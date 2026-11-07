import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { getThemeBranding } from '@/lib/payloadClient'

// Revalidación dinámica para reflejar inmediatamente cambios de colores en Payload CMS
export const dynamic = 'force-dynamic'
export const revalidate = 0

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: 'Panda Arepas & Grill | Menú Digital & Pedidos por WhatsApp',
  description:
    'Plantilla Maestra para Restaurantes por Panda Haus. Sabor auténtico del maíz peto artesanal y carnes a la brasa. Pide tu domicilio directamente a nuestro WhatsApp.',
  icons: {
    icon: '/logo/Logo.webp',
  },
}

/**
 * Convierte un color Hex (#RRGGBB o #RGB) a formato RGB separado por espacios ("R G B")
 * requerido para que Tailwind aplique opacidades nativas (ej. bg-primary/90, text-secondary/80).
 */
function hexToRgb(hex: string = '#C2410C', fallback: string = '194 65 12'): string {
  if (!hex) return fallback
  let clean = hex.replace('#', '').trim()
  if (clean.length === 3) {
    clean = clean.split('').map((char) => char + char).join('')
  }
  const num = parseInt(clean, 16)
  if (isNaN(num) || clean.length !== 6) return fallback
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `${r} ${g} ${b}`
}

function ensureHex(hex: string = '#C2410C', fallback: string = '#C2410C'): string {
  if (!hex) return fallback
  const trimmed = hex.trim()
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch del Global "Branding y Tema" administrado exclusivamente por SuperAdmin
  const theme = await getThemeBranding()

  // Colores limpios en formato Hex
  const primaryHex = ensureHex(theme.primaryColor, '#C2410C')
  const secondaryHex = ensureHex(theme.secondaryColor, '#D97706')
  const bgWarmHex = ensureHex(theme.backgroundColor, '#FAF8F5')
  const surfaceHex = ensureHex(theme.surfaceColor, '#FFFFFF')
  const textMainHex = ensureHex(theme.textColor, '#1C1917')

  // Colores convertidos a RGB para Tailwind con soporte de opacidad
  const primaryRgb = hexToRgb(primaryHex, '194 65 12')
  const secondaryRgb = hexToRgb(secondaryHex, '217 119 6')
  const bgWarmRgb = hexToRgb(bgWarmHex, '250 248 245')
  const surfaceRgb = hexToRgb(surfaceHex, '255 255 255')
  const textMainRgb = hexToRgb(textMainHex, '28 25 23')

  // Inyección de variables CSS tanto como objeto inline como en etiqueta <style> en :root
  const themeStyles = {
    '--color-primary': primaryHex,
    '--color-primary-rgb': primaryRgb,
    '--color-secondary': secondaryHex,
    '--color-secondary-rgb': secondaryRgb,
    '--color-bg-warm': bgWarmHex,
    '--color-bg-warm-rgb': bgWarmRgb,
    '--color-surface': surfaceHex,
    '--color-surface-rgb': surfaceRgb,
    '--color-text-main': textMainHex,
    '--color-text-main-rgb': textMainRgb,
  } as React.CSSProperties

  const cssVariablesString = `
    :root {
      --color-primary: ${primaryHex};
      --color-primary-rgb: ${primaryRgb};
      --color-secondary: ${secondaryHex};
      --color-secondary-rgb: ${secondaryRgb};
      --color-bg-warm: ${bgWarmHex};
      --color-bg-warm-rgb: ${bgWarmRgb};
      --color-surface: ${surfaceHex};
      --color-surface-rgb: ${surfaceRgb};
      --color-text-main: ${textMainHex};
      --color-text-main-rgb: ${textMainRgb};
    }
  `

  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}
      style={themeStyles}
    >
      <head>
        <style
          id="theme-dynamic-vars"
          dangerouslySetInnerHTML={{ __html: cssVariablesString }}
        />
      </head>
      <body
        style={themeStyles}
        className="antialiased min-h-screen flex flex-col font-sans bg-theme-bg text-theme-text"
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
