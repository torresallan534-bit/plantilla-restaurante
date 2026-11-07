import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import MenuSection from '@/components/MenuSection'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn'
import {
  getThemeBranding,
  getSalesShipping,
  getHeroContent,
  getFooterContent,
  getAboutUsContent,
  getCategories,
  getProducts,
} from '@/lib/payloadClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const [
    theme,
    salesShipping,
    hero,
    footer,
    aboutUs,
    categories,
    products,
  ] = await Promise.all([
    getThemeBranding(),
    getSalesShipping(),
    getHeroContent(),
    getFooterContent(),
    getAboutUsContent(),
    getCategories(),
    getProducts(),
  ])

  return (
    <main className="min-h-screen flex flex-col bg-theme-bg text-theme-text selection:bg-primary/20 selection:text-primary">
      {/* 1. Navbar con logo y datos dinámicos */}
      <Navbar theme={theme} salesShipping={salesShipping} />

      {/* 2. Hero Section 100% editable desde Payload */}
      <Hero hero={hero} />

      {/* 3. Sección Conócenos (Bento Grid) editable desde Payload */}
      <AboutUs aboutUs={aboutUs} />

      {/* 4. Menú Interactivo (Core): Categorías, Buscador y Botón de Agotado */}
      <MenuSection categories={categories} products={products} />

      {/* 5. Footer con SEO, Horarios y Redes Sociales */}
      <Footer footer={footer} salesShipping={salesShipping} theme={theme} />

      {/* 6. Carrito Slide-over con Costo de Domicilio y Checkout formateado */}
      <CartDrawer salesShipping={salesShipping} />

      {/* 7. Botón Flotante de WhatsApp para Contacto Inmediato */}
      <WhatsAppFloatingBtn whatsappNumber={salesShipping.numeroWhatsApp} />
    </main>
  )
}
