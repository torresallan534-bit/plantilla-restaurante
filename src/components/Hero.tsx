'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Flame, Sparkles, Clock, Star } from 'lucide-react'
import { HeroContentData } from '../types'
import { useCart } from '../context/CartContext'

interface HeroProps {
  hero: HeroContentData
}

export default function Hero({ hero }: HeroProps) {
  const { openCart } = useCart()

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-brand-warm-bg">
      {/* Elementos decorativos sutiles de fondo */}
      <div className="absolute top-10 right-0 -mr-20 w-96 h-96 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -ml-20 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Columna Izquierda: Mensaje Editorial y Conversión */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Badge de Prestigio */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/80 px-4 py-1.5 text-xs font-semibold text-orange-800 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-600 animate-pulse" />
              <span>{hero.badge || 'Auténtica Tradición & Sabor Artesanal'}</span>
            </div>

            {/* Titular Principal de Alto Impacto */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12]">
                {hero.tituloPrincipal}
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-orange-700 font-normal">
                {hero.subtitulo}
              </p>
            </div>

            {/* Párrafo Descriptivo */}
            <p className="text-stone-600 font-sans text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {hero.descripcion}
            </p>

            {/* Botones de Acción / CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-orange-600 hover:bg-orange-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{hero.textoCTA || 'Ver Nuestro Menú'}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <button
                onClick={openCart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-white hover:bg-stone-50 px-6 py-4 text-base font-semibold text-stone-800 shadow-sm transition hover:border-stone-400"
              >
                <Clock className="h-5 w-5 text-stone-500" />
                <span>Pedir a Domicilio</span>
              </button>
            </div>

            {/* Micro-Social Proof */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-stone-800">4.9 / 5</span>
                <span>({hero.ratingText || 'más de 1.200 clientes felices'})</span>
              </div>
              <div className="h-4 w-px bg-stone-300 hidden sm:block" />
              <div className="flex items-center gap-2 font-medium text-stone-700">
                <Flame className="h-4 w-4 text-orange-600" />
                <span>100% Maíz Peto Sin Conservantes</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Imagen Principal de Impacto con Tarjetas Flotantes */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-stone-100">
                <Image
                  src={hero.imagenFondoUrl || '/images/arepas-1.jpg'}
                  alt={hero.tituloPrincipal}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Tarjeta Flotante 1: Recomendado */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 rounded-2xl bg-white p-4 shadow-xl border border-stone-100/80 max-w-[220px] animate-fade-in backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold">
                    🔥
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                      Plato Insignia
                    </p>
                    <p className="font-serif font-bold text-xs text-stone-900 leading-tight">
                      Arepa Paisa Suprema al Carbón
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Flotante 2: Entrega Caliente */}
              <div className="absolute -top-4 -right-4 sm:-right-6 rounded-2xl bg-stone-900/90 text-white p-3.5 shadow-xl border border-stone-800 max-w-[190px] backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <p className="text-xs font-semibold">Despacho en 35-45 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
