'use client'

import React from 'react'
import Image from 'next/image'
import { Sparkles, HeartHandshake, Award, ShieldCheck, Flame } from 'lucide-react'
import { BusinessConfig } from '../types'

interface AboutUsProps {
  business: BusinessConfig
}

export default function AboutUs({ business }: AboutUsProps) {
  return (
    <section id="conocenos" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda: Historia, Pasión y Métricas */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>{business.conocenosBadge || 'Nuestra Historia'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
              {business.conocenosTitulo || 'El Auténtico Arte de la Masa y el Fuego Lento'}
            </h2>

            <div className="space-y-4 text-stone-600 font-sans leading-relaxed text-base sm:text-lg">
              <p>
                {business.conocenosParrafo1 ||
                  'Nacimos con una sola obsesión: rescatar el sabor auténtico del maíz peto molido en casa y combinarlo con rellenos generosos, carnes ahumadas al carbón y queso artesanal de campo.'}
              </p>
              <p className="text-stone-500 text-sm sm:text-base">
                {business.conocenosParrafo2 ||
                  'Cada arepa y plato que sale de nuestra cocina es amasado a mano en el momento. Creemos que la buena comida une a las personas y cada bocado debe despertar memorias de hogar.'}
              </p>
            </div>

            {/* Cuadrícula de Métricas / Estadísticas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              {(business.stats || []).map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-100 bg-stone-50/60 p-4 transition hover:bg-orange-50/40 hover:border-orange-100 hover:shadow-sm"
                >
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-orange-600">
                    {stat.numero}
                  </p>
                  <p className="text-xs font-medium text-stone-600 mt-1">{stat.etiqueta}</p>
                </div>
              ))}
            </div>

            {/* Compromiso Artesanal */}
            <div className="pt-4 flex items-center gap-4 text-xs text-stone-500 font-sans">
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Ingredientes 100% Frescos</span>
              </div>
              <div className="h-3 w-px bg-stone-200" />
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <HeartHandshake className="h-4 w-4 text-orange-600" />
                <span>Productores Campesinos Locales</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Grilla Estilo Bento-Grid de Imágenes */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-4">
              {/* Bloque Bento 1: Imagen Grande Vertical */}
              <div className="col-span-7 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-stone-200/80 shadow-md group">
                <Image
                  src="/images/arepas-1.jpg"
                  alt="Arepas Rellenas en preparación artesanal"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-full bg-orange-600 px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider mb-1">
                    Artesanal
                  </span>
                  <p className="font-serif font-bold text-sm text-white">
                    Maíz Seleccionado Grano a Grano
                  </p>
                </div>
              </div>

              {/* Columna derecha del bento: 2 bloques apilados */}
              <div className="col-span-5 flex flex-col gap-4">
                {/* Bloque Bento 2: Imagen horizontal */}
                <div className="relative h-36 sm:h-44 rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm group">
                  <Image
                    src="/images/arepas-2.jpg"
                    alt="Cocción al carbón"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 rounded-full bg-stone-900/80 backdrop-blur-md p-1.5 text-white">
                    <Flame className="h-3.5 w-3.5 text-orange-400" />
                  </div>
                </div>

                {/* Bloque Bento 3: Imagen cuadrada o detalle */}
                <div className="relative h-32 sm:h-48 rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm group">
                  <Image
                    src="/images/arepas-3.jpg"
                    alt="Doble queso derretido"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      Dorado Perfecto
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloque Bento 4 Inferior: Tarjeta de Valor / Banner Editorial */}
              <div className="col-span-12 rounded-3xl border border-orange-100 bg-orange-50/70 p-5 flex items-center justify-between shadow-soft">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-600 text-white font-bold shadow-sm">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                      Garantía de Sabor de Panda Haus
                    </h4>
                    <p className="text-xs text-stone-600 font-sans">
                      Si tu arepa no llega caliente y crujiente, te la cambiamos de inmediato.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
