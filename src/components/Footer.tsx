'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, Phone, MessageCircle, Heart, Instagram, Facebook } from 'lucide-react'
import { FooterContentData, SalesShipping, ThemeBranding } from '../types'

interface FooterProps {
  footer: FooterContentData
  salesShipping: SalesShipping
  theme: ThemeBranding
}

export default function Footer({ footer, salesShipping, theme }: FooterProps) {
  const cleanPhone = (salesShipping.numeroWhatsApp || '573001234567').replace(/\D/g, '')

  return (
    <footer id="horarios" className="bg-stone-900 text-stone-300 pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          {/* Info del Restaurante & Logo Traído desde Payload */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative h-14 w-44 bg-white/10 rounded-2xl p-2 backdrop-blur-sm inline-block">
              <Image
                src={theme.logoUrl || '/logo/logo.svg'}
                alt={salesShipping.nombreRestaurante}
                fill
                className="object-contain p-1"
              />
            </div>

            <p className="font-serif italic text-xl text-stone-200">
              {footer.tituloSEO || salesShipping.nombreRestaurante}
            </p>

            <p className="text-stone-400 text-sm font-sans max-w-sm leading-relaxed">
              {footer.descripcionSEO}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-xs font-bold text-white transition shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Pedir por WhatsApp</span>
              </a>

              {/* Redes Sociales Dinámicas */}
              <div className="flex items-center gap-2">
                {(footer.redesSociales || []).map((red, idx) => (
                  <a
                    key={idx}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800 text-stone-300 hover:bg-primary hover:text-white transition"
                    title={red.red}
                  >
                    {red.red === 'instagram' ? (
                      <Instagram className="h-4 w-4" />
                    ) : red.red === 'facebook' ? (
                      <Facebook className="h-4 w-4" />
                    ) : (
                      <MessageCircle className="h-4 w-4" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Horarios de Atención Dinámicos */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <Clock className="h-5 w-5 text-primary" />
              <h3>Horarios de Atención</h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm font-sans">
              {(salesShipping.horarios || []).map((h, i) => (
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

          {/* Ubicación & Acceso CMS */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              <h3>Visítanos</h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed">
              {salesShipping.direccionFisica || 'Carrera 7 # 68-12, Zona Gourmet'}
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Phone className="h-3.5 w-3.5 text-stone-500" />
                <span>Línea directa: +{salesShipping.numeroWhatsApp}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/admin"
                className="inline-block text-[11px] text-stone-500 hover:text-stone-300 transition underline underline-offset-4"
              >
                Panel de Control Payload CMS (/admin)
              </Link>
            </div>
          </div>
        </div>

        {/* Barra de Créditos y Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <p>
            © {new Date().getFullYear()} {salesShipping.nombreRestaurante}. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>{footer.creditos || 'Desarrollado con pasión por Panda Haus Agencia Web'}</span>
            <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
          </div>
        </div>
      </div>
    </footer>
  )
}
