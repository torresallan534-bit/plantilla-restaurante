'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Check, Star, AlertCircle } from 'lucide-react'
import { Product } from '../types'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleAdd = () => {
    if (!product.disponible) return
    addToCart(product, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <div
      className={`group relative flex flex-col rounded-3xl border border-stone-200/70 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-card hover:border-orange-200 ${
        !product.disponible ? 'opacity-70 grayscale-[30%]' : ''
      }`}
    >
      {/* Contenedor de la Imagen */}
      <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-stone-100">
        <Image
          src={product.imagenUrl || '/images/arepas-1.jpg'}
          alt={product.nombre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges superiores */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.destacado && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              <Star className="h-3 w-3 fill-white" />
              Favorito
            </span>
          )}
        </div>

        {/* Overlay si está agotado */}
        {!product.disponible && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
              <AlertCircle className="h-4 w-4" />
              Agotado por hoy
            </span>
          </div>
        )}
      </div>

      {/* Contenido de la Card */}
      <div className="flex flex-1 flex-col justify-between pt-4">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-orange-700 transition-colors line-clamp-1">
              {product.nombre}
            </h3>
          </div>

          <p className="mt-1.5 text-xs sm:text-sm text-stone-500 font-sans line-clamp-2 leading-relaxed">
            {product.descripcion}
          </p>
        </div>

        {/* Precio y Botón de Agregar */}
        <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
              Precio
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-orange-600">
              {formatPrice(product.precio)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.disponible}
            className={`inline-flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 shadow-md'
                : product.disponible
                ? 'bg-stone-900 text-white hover:bg-orange-600 hover:shadow-md hover:shadow-orange-600/20'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
            aria-label={`Agregar ${product.nombre} al pedido`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Agregar al pedido</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
