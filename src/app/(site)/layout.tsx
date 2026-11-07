import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

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
  keywords: [
    'restaurante',
    'arepas artesanales',
    'menú digital',
    'pedidos whatsapp',
    'grill',
    'domicilios',
    'panda haus',
  ],
  icons: {
    icon: '/logo/Logo.webp',
  },
  openGraph: {
    title: 'Panda Arepas & Grill | Especialidades al Carbón',
    description: 'El verdadero sabor del maíz artesanal. Haz tu pedido directo por WhatsApp.',
    images: ['/images/arepas-1.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
