'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Check, Plus } from 'lucide-react'
import { Product } from '../types'

interface ProductOptionsModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (selectedOptions: Record<string, string>) => void
}

export default function ProductOptionsModal({
  product,
  isOpen,
  onClose,
  onConfirm,
}: ProductOptionsModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  // Inicializar selección por defecto con la primera opción de cada grupo obligatorio
  useEffect(() => {
    if (product?.gruposOpciones && product.gruposOpciones.length > 0) {
      const defaults: Record<string, string> = {}
      for (const group of product.gruposOpciones) {
        if (group.opciones.length > 0) {
          defaults[group.titulo] = group.opciones[0].nombre
        }
      }
      setSelectedOptions(defaults)
    } else {
      setSelectedOptions({})
    }
  }, [product])

  if (!isOpen || !product) return null

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calcular precio total unitario con adicionales
  let unitPrice = product.precio
  if (product.gruposOpciones) {
    for (const group of product.gruposOpciones) {
      const selectedChoiceName = selectedOptions[group.titulo]
      if (selectedChoiceName) {
        const choice = group.opciones.find((o) => o.nombre === selectedChoiceName)
        if (choice?.precioExtra) {
          unitPrice += choice.precioExtra
        }
      }
    }
  }

  const handleSelect = (groupTitle: string, optionName: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupTitle]: optionName,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(selectedOptions)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-theme-surface shadow-2xl border border-stone-100 overflow-hidden z-10 my-8">
        {/* Header con imagen pequeña y botón de cierre */}
        <div className="relative p-6 pb-4 border-b border-stone-100 flex items-start justify-between gap-4 bg-stone-50/50">
          <div className="flex gap-4 items-center">
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden flex-shrink-0 border border-stone-200 bg-stone-100">
              <Image
                src={product.imagenUrl || '/images/arepas-1.jpg'}
                alt={product.nombre}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Personaliza tu plato
              </span>
              <h3 className="font-serif text-lg font-bold text-theme-text leading-tight">
                {product.nombre}
              </h3>
              <p className="text-xs font-semibold text-primary mt-0.5">
                {formatPrice(unitPrice)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition"
            aria-label="Cerrar modal de personalización"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulario de opciones */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {product.gruposOpciones?.map((group) => (
            <div key={group.titulo} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-serif text-sm font-bold text-theme-text">
                  {group.titulo}
                </label>
                {group.requerido && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    Obligatorio
                  </span>
                )}
              </div>

              {/* Lista de Opciones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.opciones.map((option) => {
                  const isSelected = selectedOptions[group.titulo] === option.nombre
                  return (
                    <button
                      key={option.nombre}
                      type="button"
                      onClick={() => handleSelect(group.titulo, option.nombre)}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-left text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-theme-text shadow-sm ring-1 ring-primary'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                            isSelected
                              ? 'border-primary bg-primary text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                        </div>
                        <span className="truncate">{option.nombre}</span>
                      </div>

                      {option.precioExtra ? (
                        <span className="text-[11px] font-bold text-primary flex-shrink-0 ml-2">
                          +{formatPrice(option.precioExtra)}
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </form>

        {/* Footer con Confirmación */}
        <div className="p-4 sm:p-6 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
              Total del ítem
            </span>
            <span className="font-serif text-xl font-bold text-primary">
              {formatPrice(unitPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-stone-200 px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary/90 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/20 transition active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Agregar al Pedido</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
