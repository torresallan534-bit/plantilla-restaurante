'use client'

import React from 'react'
import { MessageCircle, Check, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

interface WhatsAppFloatingBtnProps {
  whatsappNumber: string
}

export default function WhatsAppFloatingBtn({ whatsappNumber }: WhatsAppFloatingBtnProps) {
  const { lastAddedProduct, openCart } = useCart()
  const cleanPhone = (whatsappNumber || '573001234567').replace(/\D/g, '')

  return (
    <>
      {/* Toast de Producto Agregado */}
      {lastAddedProduct && (
        <div className="fixed bottom-24 right-6 z-50 animate-slide-in">
          <div
            onClick={openCart}
            className="cursor-pointer flex items-center gap-3 rounded-2xl bg-stone-900 text-white px-4 py-3 shadow-2xl border border-stone-700/80 hover:bg-stone-800 transition transform hover:scale-105"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white leading-tight">¡Agregado al pedido!</p>
              <p className="text-stone-300 truncate max-w-[180px] font-sans">
                {lastAddedProduct.nombre}
              </p>
            </div>
            <div className="ml-2 pl-2 border-l border-stone-700 flex items-center text-secondary text-xs font-bold gap-1">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Ver</span>
            </div>
          </div>
        </div>
      )}

      {/* Botón Flotante de WhatsApp */}
      <aside aria-label="Contacto directo por WhatsApp" className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir chat de WhatsApp para atención rápida"
          className="group flex items-center gap-3 rounded-full bg-emerald-600 p-3.5 sm:px-5 sm:py-3.5 text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <MessageCircle className="h-6 w-6 sm:h-5 sm:w-5 fill-white text-emerald-600" />
          <span className="hidden sm:inline font-sans text-xs font-bold tracking-wide">
            ¿Dudas? Escríbenos
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </a>
      </aside>
    </>
  )
}
