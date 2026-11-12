'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Check, Plus, Minus, AlertCircle } from 'lucide-react'
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
  // Estado para selecciones únicas: { [groupTitle]: optionName }
  const [singleSelections, setSingleSelections] = useState<Record<string, string>>({})

  // Estado para selecciones múltiples de combos: { [groupTitle]: { [optionName]: count } }
  const [multiSelections, setMultiSelections] = useState<
    Record<string, Record<string, number>>
  >({})

  const [validationError, setValidationError] = useState<string | null>(null)

  // Inicializar selecciones al abrir el modal
  useEffect(() => {
    if (product?.gruposOpciones && product.gruposOpciones.length > 0) {
      const initialSingle: Record<string, string> = {}
      const initialMulti: Record<string, Record<string, number>> = {}

      for (const group of product.gruposOpciones) {
        const isMultiple =
          group.tipoSeleccion === 'multiple' && (group.limiteSeleccion ?? 1) > 1

        if (isMultiple) {
          initialMulti[group.titulo] = {}
          for (const opt of group.opciones) {
            initialMulti[group.titulo][opt.nombre] = 0
          }
        } else {
          // Si es único, preseleccionar la primera opción por defecto
          if (group.opciones.length > 0) {
            initialSingle[group.titulo] = group.opciones[0].nombre
          }
        }
      }

      setSingleSelections(initialSingle)
      setMultiSelections(initialMulti)
      setValidationError(null)
    } else {
      setSingleSelections({})
      setMultiSelections({})
      setValidationError(null)
    }
  }, [product, isOpen])

  if (!isOpen || !product) return null

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calcular precio total unitario con adicionales de opciones
  let unitPrice = product.precio
  if (product.gruposOpciones) {
    for (const group of product.gruposOpciones) {
      const isMultiple =
        group.tipoSeleccion === 'multiple' && (group.limiteSeleccion ?? 1) > 1

      if (isMultiple) {
        const groupCounts = multiSelections[group.titulo] || {}
        for (const opt of group.opciones) {
          const count = groupCounts[opt.nombre] || 0
          if (count > 0 && opt.precioExtra) {
            unitPrice += count * opt.precioExtra
          }
        }
      } else {
        const selectedChoiceName = singleSelections[group.titulo]
        if (selectedChoiceName) {
          const choice = group.opciones.find((o) => o.nombre === selectedChoiceName)
          if (choice?.precioExtra) {
            unitPrice += choice.precioExtra
          }
        }
      }
    }
  }

  // Manejar cambio en selección única
  const handleSingleSelect = (groupTitle: string, optionName: string) => {
    setSingleSelections((prev) => ({
      ...prev,
      [groupTitle]: optionName,
    }))
    setValidationError(null)
  }

  // Manejar aumento o disminución en selección múltiple
  const handleMultiChange = (
    groupTitle: string,
    optionName: string,
    delta: number,
    limit: number
  ) => {
    const currentGroup = { ...(multiSelections[groupTitle] || {}) }
    const currentCount = currentGroup[optionName] || 0
    const totalSelected = Object.values(currentGroup).reduce((sum, val) => sum + val, 0)

    if (delta > 0 && totalSelected >= limit) {
      return // Límite alcanzado
    }
    if (delta < 0 && currentCount <= 0) {
      return // No se puede bajar de cero
    }

    const nextCount = Math.max(0, currentCount + delta)
    currentGroup[optionName] = nextCount

    setMultiSelections((prev) => ({
      ...prev,
      [groupTitle]: currentGroup,
    }))
    setValidationError(null)
  }

  // Validación y confirmación del pedido
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar grupos obligatorios
    if (product.gruposOpciones) {
      for (const group of product.gruposOpciones) {
        const isMultiple =
          group.tipoSeleccion === 'multiple' && (group.limiteSeleccion ?? 1) > 1

        if (isMultiple) {
          const groupCounts = multiSelections[group.titulo] || {}
          const totalSelected = Object.values(groupCounts).reduce((sum, val) => sum + val, 0)
          const limit = group.limiteSeleccion ?? 1

          if (group.requerido && totalSelected < limit) {
            setValidationError(
              `Por favor completa la selección de "${group.titulo}" (${totalSelected} de ${limit} elegidas).`
            )
            return
          }
        } else {
          if (group.requerido && !singleSelections[group.titulo]) {
            setValidationError(`Por favor elige una opción para "${group.titulo}".`)
            return
          }
        }
      }
    }

    // Armar opciones finales serializadas
    const finalOptions: Record<string, string> = {}

    if (product.gruposOpciones) {
      for (const group of product.gruposOpciones) {
        const isMultiple =
          group.tipoSeleccion === 'multiple' && (group.limiteSeleccion ?? 1) > 1

        if (isMultiple) {
          const groupCounts = multiSelections[group.titulo] || {}
          const parts = Object.entries(groupCounts)
            .filter(([_, count]) => count > 0)
            .map(([name, count]) => `${count}x ${name}`)

          if (parts.length > 0) {
            finalOptions[group.titulo] = parts.join(', ')
          }
        } else {
          const choice = singleSelections[group.titulo]
          if (choice) {
            finalOptions[group.titulo] = choice
          }
        }
      }
    }

    onConfirm(finalOptions)
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
        {/* Header con imagen y botón de cierre */}
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
          {validationError && (
            <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-3.5 border border-red-200 text-xs font-medium text-red-700 animate-fade-in">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
              <span>{validationError}</span>
            </div>
          )}

          {product.gruposOpciones?.map((group) => {
            const isMultiple =
              group.tipoSeleccion === 'multiple' && (group.limiteSeleccion ?? 1) > 1
            const limit = group.limiteSeleccion ?? 1
            const groupCounts = multiSelections[group.titulo] || {}
            const totalSelected = Object.values(groupCounts).reduce(
              (sum, val) => sum + val,
              0
            )

            return (
              <div key={group.titulo} className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <label className="font-serif text-sm font-bold text-theme-text block">
                      {group.titulo}
                    </label>
                    {isMultiple && (
                      <span className="text-[11px] text-stone-500 font-sans">
                        Elige hasta {limit} unidades (Llevas{' '}
                        <strong
                          className={
                            totalSelected === limit
                              ? 'text-emerald-600'
                              : 'text-primary'
                          }
                        >
                          {totalSelected}
                        </strong>{' '}
                        de {limit})
                      </span>
                    )}
                  </div>

                  {group.requerido && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isMultiple && totalSelected === limit
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {isMultiple
                        ? totalSelected === limit
                          ? 'Completado ✓'
                          : `Faltan ${limit - totalSelected}`
                        : 'Obligatorio'}
                    </span>
                  )}
                </div>

                {/* Vista para Opción Múltiple (Contadores +/- por cada ítem del combo) */}
                {isMultiple ? (
                  <div className="space-y-2">
                    {group.opciones.map((option) => {
                      const count = groupCounts[option.nombre] || 0
                      const canAddMore = totalSelected < limit

                      return (
                        <div
                          key={option.nombre}
                          className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                            count > 0
                              ? 'border-primary bg-primary/5 ring-1 ring-primary/40'
                              : 'border-stone-200 bg-white'
                          }`}
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <p className="text-xs font-semibold text-theme-text truncate">
                              {option.nombre}
                            </p>
                            {option.precioExtra ? (
                              <p className="text-[11px] font-bold text-primary">
                                +{formatPrice(option.precioExtra)} c/u
                              </p>
                            ) : null}
                          </div>

                          {/* Control de Cantidad */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                handleMultiChange(group.titulo, option.nombre, -1, limit)
                              }
                              disabled={count === 0}
                              className={`flex h-8 w-8 items-center justify-center rounded-xl border transition ${
                                count > 0
                                  ? 'border-stone-300 bg-white text-stone-800 hover:bg-stone-100'
                                  : 'border-stone-200 bg-stone-50 text-stone-300 cursor-not-allowed'
                              }`}
                              aria-label={`Disminuir ${option.nombre}`}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>

                            <span className="w-6 text-center text-xs font-bold text-theme-text">
                              {count}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                handleMultiChange(group.titulo, option.nombre, 1, limit)
                              }
                              disabled={!canAddMore}
                              className={`flex h-8 w-8 items-center justify-center rounded-xl border transition ${
                                canAddMore
                                  ? 'border-primary bg-primary text-white hover:bg-primary/90'
                                  : 'border-stone-200 bg-stone-100 text-stone-300 cursor-not-allowed'
                              }`}
                              aria-label={`Aumentar ${option.nombre}`}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  /* Vista para Opción Única (Pills de Selección Directa) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {group.opciones.map((option) => {
                      const isSelected = singleSelections[group.titulo] === option.nombre
                      return (
                        <button
                          key={option.nombre}
                          type="button"
                          onClick={() => handleSingleSelect(group.titulo, option.nombre)}
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
                )}
              </div>
            )
          })}
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
