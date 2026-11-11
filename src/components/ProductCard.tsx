'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Check, Star, Ban, SlidersHorizontal } from 'lucide-react'
import { Product } from '../types'
import { useCart } from '../context/CartContext'
import ProductOptionsModal from './ProductOptionsModal'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)

  const isAvailable = product.disponible !== false
  const hasOptions = Boolean(product.gruposOpciones && product.gruposOpciones.length > 0)

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleAddClick = () => {
    if (!isAvailable) return
    if (hasOptions) {
      setIsOptionsModalOpen(true)
    } else {
      addToCart(product, 1)
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 1800)
    }
  }

  const handleConfirmOptions = (selectedOptions: Record<string, string>) => {
    addToCart(product, 1, selectedOptions)
    setIsOptionsModalOpen(false)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <>
      <div
        className={`group relative flex flex-col rounded-3xl border bg-theme-surface p-4 shadow-sm transition-all duration-300 ${
          isAvailable
            ? 'border-stone-200/70 hover:shadow-card hover:border-primary/40'
            : 'border-stone-200/50 opacity-60 grayscale-[35%]'
        }`}
      >
        {/* Contenedor de la Imagen con Cartel Visual de Agotado */}
        <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-stone-100">
          <Image
            src={product.imagenUrl || '/images/arepas-1.jpg'}
            alt={product.nombre}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 ${
              isAvailable ? 'group-hover:scale-105' : ''
            }`}
          />

          {/* Badges superiores */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.destacado && isAvailable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                <Star className="h-3 w-3 fill-white" />
                Favorito
              </span>
            )}
            {hasOptions && isAvailable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                <SlidersHorizontal className="h-3 w-3" />
                Personalizable
              </span>
            )}
          </div>

          {/* Cartel Visual de AGOTADO */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider shadow-lg animate-pulse">
                <Ban className="h-4 w-4" />
                Agotado
              </span>
              <p className="text-[11px] text-stone-200 font-sans mt-1">Disponible próximamente</p>
            </div>
          )}
        </div>

        {/* Contenido de la Card */}
        <div className="flex flex-1 flex-col justify-between pt-4">
          <div>
            <h3
              className={`font-serif text-lg font-bold transition-colors line-clamp-1 ${
                isAvailable ? 'text-theme-text group-hover:text-primary' : 'text-stone-500'
              }`}
            >
              {product.nombre}
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm text-stone-500 font-sans line-clamp-2 leading-relaxed">
              {product.descripcion}
            </p>
          </div>

          {/* Precio y Botón 'Agregar al pedido' */}
          <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                {hasOptions ? 'Desde' : 'Precio'}
              </span>
              <span
                className={`font-serif text-lg sm:text-xl font-bold ${
                  isAvailable ? 'text-primary' : 'text-stone-400'
                }`}
              >
                {formatPrice(product.precio)}
              </span>
            </div>

            {/* Botón de Agregar al pedido / Deshabilitado si está Agotado */}
            <button
              onClick={handleAddClick}
              disabled={!isAvailable}
              className={`inline-flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                !isAvailable
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                  : justAdded
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30 shadow-md scale-95'
                  : 'bg-stone-900 text-white hover:bg-primary hover:shadow-md hover:shadow-primary/20 active:scale-95'
              }`}
              aria-label={
                isAvailable
                  ? hasOptions
                    ? `Elegir opciones de ${product.nombre}`
                    : `Agregar ${product.nombre} al pedido`
                  : `${product.nombre} agotado`
              }
            >
              {!isAvailable ? (
                <>
                  <Ban className="h-3.5 w-3.5" />
                  <span>Agotado</span>
                </>
              ) : justAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>¡Agregado!</span>
                </>
              ) : hasOptions ? (
                <>
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Elegir opciones</span>
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

      {/* Modal de selección de opciones / sabores */}
      {hasOptions && (
        <ProductOptionsModal
          product={product}
          isOpen={isOptionsModalOpen}
          onClose={() => setIsOptionsModalOpen(false)}
          onConfirm={handleConfirmOptions}
        />
      )}
    </>
  )
}
