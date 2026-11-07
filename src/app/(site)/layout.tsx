import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { getThemeBranding } from '@/lib/payloadClient'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch del Global "Branding y Tema" administrado exclusivamente por SuperAdmin
  const theme = await getThemeBranding()

  // Inyección de variables CSS en línea para consumo dinámico por Tailwind
  const themeStyles = {
    '--color-primary': theme.primaryColor,
    '--color-primary-hover': theme.primaryColor,
    '--color-secondary': theme.secondaryColor,
    '--color-bg-warm': theme.backgroundColor,
    '--color-surface': theme.surfaceColor,
    '--color-text-main': theme.textColor,
  } as React.CSSProperties

  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}
      style={themeStyles}
    >
      <body
        style={themeStyles}
        className="antialiased min-h-screen flex flex-col font-sans bg-brand-warm-bg text-brand-dark"
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
