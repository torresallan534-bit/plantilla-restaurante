'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, MessageCircle, Menu as MenuIcon, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { ThemeBranding, SalesShipping } from '../types'

interface NavbarProps {
  theme: ThemeBranding
  salesShipping: SalesShipping
}

export default function Navbar({ theme, salesShipping }: NavbarProps) {
  const { totalItems, openCart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cleanPhone = (salesShipping.numeroWhatsApp || '573001234567').replace(/\D/g, '')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-theme-surface/95 backdrop-blur-md shadow-sm border-b border-stone-200/50 py-3.5'
          : 'bg-theme-surface/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Dinámico Traído desde Payload */}
          <Link href="#inicio" className="flex items-center gap-3 group">
            <div className="relative h-12 w-36 sm:h-14 sm:w-44 transition transform group-hover:scale-[1.02]">
              <Image
                src={theme.logoUrl || '/logo/logo.svg'}
                alt={salesShipping.nombreRestaurante}
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <Link
              href="#inicio"
              className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Inicio
            </Link>
            <Link
              href="#menu"
              className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Menú
            </Link>
            <Link
              href="#conocenos"
              className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Conócenos
            </Link>
            <Link
              href="#horarios"
              className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Horarios & Ubicación
            </Link>
          </nav>

          {/* Acciones (Carrito + Botón WhatsApp) */}
          <div className="flex items-center gap-3">
            {/* Botón Carrito con Contador */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-2xl bg-stone-100 hover:bg-primary/10 px-3.5 py-2.5 text-sm font-semibold text-theme-text transition border border-stone-200/80 group"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="h-5 w-5 text-stone-700 group-hover:text-primary transition-colors" />
              <span className="hidden sm:inline font-sans text-xs">Pedido</span>
              {totalItems > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white animate-fade-in shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón WhatsApp de Contacto */}
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition shadow-sm shadow-emerald-600/20 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contactar</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl p-2 text-stone-700 hover:bg-stone-100"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menú Mobile Desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-stone-100 bg-theme-surface/95 rounded-2xl p-4 shadow-xl space-y-3 animate-fade-in">
            <Link
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-theme-text hover:bg-primary/10 hover:text-primary rounded-lg transition"
            >
              Inicio
            </Link>
            <Link
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-theme-text hover:bg-primary/10 hover:text-primary rounded-lg transition"
            >
              Menú
            </Link>
            <Link
              href="#conocenos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-theme-text hover:bg-primary/10 hover:text-primary rounded-lg transition"
            >
              Conócenos
            </Link>
            <Link
              href="#horarios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-theme-text hover:bg-primary/10 hover:text-primary rounded-lg transition"
            >
              Horarios & Ubicación
            </Link>
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Chatear por WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
