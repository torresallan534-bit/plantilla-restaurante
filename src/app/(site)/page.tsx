import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import MenuSection from '@/components/MenuSection'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import WhatsAppFloatingBtn from '@/components/WhatsAppFloatingBtn'
import { getBusinessSettings, getCategories, getProducts } from '@/lib/payloadClient'

// Revalidar contenido cada 60 segundos o bajo demanda con Payload Hooks
export const revalidate = 60

export default async function HomePage() {
  const [business, categories, products] = await Promise.all([
    getBusinessSettings(),
    getCategories(),
    getProducts(),
  ])

  return (
    <main className="min-h-screen flex flex-col bg-brand-warm-bg text-stone-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Barra de Navegación Superior Dinámica */}
      <Navbar business={business} />

      {/* Hero Section de Alto Impacto */}
      <Hero business={business} />

      {/* Sección Conócenos: Dos Columnas & Grilla Bento */}
      <AboutUs business={business} />

      {/* Menú Interactivo: Categorías, Búsqueda y Botón 'Agregar al pedido' */}
      <MenuSection categories={categories} products={products} />

      {/* Pie de Página: Horarios, Ubicación y Créditos Panda Haus */}
      <Footer business={business} />

      {/* Slide-over Carrito Lateral & Checkout Directo a WhatsApp */}
      <CartDrawer business={business} />

      {/* Botón Flotante de WhatsApp para Contacto Inmediato */}
      <WhatsAppFloatingBtn whatsappNumber={business.numeroWhatsApp} />
    </main>
  )
}
