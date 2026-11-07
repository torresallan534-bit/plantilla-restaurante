'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, Phone, MessageCircle, Heart } from 'lucide-react'
import { BusinessConfig } from '../types'

interface FooterProps {
  business: BusinessConfig
}

export default function Footer({ business }: FooterProps) {
  const cleanPhone = (business.numeroWhatsApp || '573001234567').replace(/\D/g, '')

  return (
    <footer id="horarios" className="bg-stone-900 text-stone-300 pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          {/* Info del Restaurante & Logo */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative h-14 w-44 bg-white/10 rounded-2xl p-2 backdrop-blur-sm inline-block">
              <Image
                src={business.logoUrl || '/logo/logo.svg'}
                alt={business.nombreRestaurante}
                fill
                className="object-contain p-1"
              />
            </div>

            <p className="font-serif italic text-xl text-stone-200">{business.eslogan}</p>

            <p className="text-stone-400 text-sm font-sans max-w-sm leading-relaxed">
              Auténtico maíz peto procesado artesanalmente día a día. Rellenos generosos y el mejor
              toque ahumado al carbón.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-xs font-bold text-white transition shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Pedir o Chatear por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Horarios de Atención */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <Clock className="h-5 w-5 text-orange-500" />
              <h3>Horarios de Atención</h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm font-sans">
              {(business.horarios || []).map((h, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between border-b border-stone-800/80 pb-2.5"
                >
                  <span className="text-stone-400">{h.dias}</span>
                  <span className="font-semibold text-white">{h.horas}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ubicación & Contacto */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <MapPin className="h-5 w-5 text-orange-500" />
              <h3>Visítanos</h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed">
              {business.direccionFisica || 'Carrera 7 # 68-12, Zona Gourmet'}
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Phone className="h-3.5 w-3.5 text-stone-500" />
                <span>Línea directa: +{business.numeroWhatsApp}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/admin"
                className="inline-block text-[11px] text-stone-500 hover:text-stone-300 transition underline underline-offset-4"
              >
                Acceso Administrador (CMS)
              </Link>
            </div>
          </div>
        </div>

        {/* Barra de Créditos y Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <p>© {new Date().getFullYear()} {business.nombreRestaurante}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Plantilla Maestra desarrollada con</span>
            <Heart className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
            <span className="font-bold text-white">Panda Haus Agencia Web</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
