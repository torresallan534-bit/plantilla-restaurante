'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, Trash2, ShoppingBag, Send, MapPin, User, FileText, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { BusinessConfig } from '../types'

interface CartDrawerProps {
  business: BusinessConfig
}

export default function CartDrawer({ business }: CartDrawerProps) {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart()

  const [nombreCliente, setNombreCliente] = useState('')
  const [direccion, setDireccion] = useState('')
  const [notas, setNotas] = useState('')
  const [errors, setErrors] = useState<{ nombre?: string; direccion?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isCartOpen) return null

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const validateForm = () => {
    const newErrors: { nombre?: string; direccion?: string } = {}
    if (!nombreCliente.trim()) {
      newErrors.nombre = 'Por favor ingresa tu nombre'
    }
    if (!direccion.trim()) {
      newErrors.direccion = 'Por favor ingresa tu dirección de entrega'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) return
    if (!validateForm()) return

    setIsSubmitting(true)

    const nombreRestaurante = business.nombreRestaurante || 'Panda Arepas & Grill'
    const cleanPhone = (business.numeroWhatsApp || '573001234567').replace(/\D/g, '')

    // Formatear items exactamente con la estructura exigida:
    // [Cantidad]x [Producto]
    const productLines = items
      .map((item) => `${item.quantity}x ${item.product.nombre}`)
      .join('\n\n')

    // Estructura exacta requerida:
    // "Hola [NombreRestaurante], soy [NombreCliente], para pedir lo siguiente:
    //
    // [Cantidad]x [Producto]
    //
    // [Cantidad]x [Producto]
    // Para esta dirección: [Dirección del cliente]"
    let message = `Hola ${nombreRestaurante}, soy ${nombreCliente.trim()}, para pedir lo siguiente:\n\n${productLines}\nPara esta dirección: ${direccion.trim()}`

    if (notas.trim()) {
      message += `\nNotas adicionales: ${notas.trim()}`
    }

    message += `\nTotal: ${formatPrice(totalPrice)}`

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`

    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank')

    setTimeout(() => {
      setIsSubmitting(false)
      clearCart()
      closeCart()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop con desenfoque suave */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-2xl transition ease-in-out duration-300 animate-slide-in flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 px-6 py-5 bg-stone-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900">Tu Pedido</h2>
                <p className="text-xs text-stone-500 font-sans">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'} seleccionado
                  {totalItems === 1 ? '' : 's'}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
              aria-label="Cerrar carrito"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-400 mb-4">
                  <ShoppingBag className="h-10 w-10 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-stone-800">
                  El carrito está vacío
                </h3>
                <p className="mt-2 text-sm text-stone-500 max-w-xs font-sans">
                  Agrega tus arepas y platos favoritos de nuestro menú para pedirlos directamente por
                  WhatsApp.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition shadow-sm"
                >
                  Explorar Menú <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Lista de Productos */}
                <div className="divide-y divide-stone-100">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 items-center">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                        <Image
                          src={item.product.imagenUrl || '/images/arepas-1.jpg'}
                          alt={item.product.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-stone-900 truncate">
                          {item.product.nombre}
                        </h4>
                        <p className="text-xs font-semibold text-orange-600 mt-0.5">
                          {formatPrice(item.product.precio)} c/u
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="inline-flex items-center rounded-lg border border-stone-200 bg-stone-50">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-stone-600 hover:text-stone-900 transition"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-stone-600 hover:text-stone-900 transition"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-stone-700">
                            {formatPrice(item.product.precio * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-stone-300 hover:text-red-500 transition"
                        title="Eliminar plato"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Formulario de Entrega */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-2">
                  <div className="rounded-2xl bg-stone-50 p-4 border border-stone-100 space-y-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Datos de Entrega Inmediata
                    </h4>

                    {/* Nombre */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Tu Nombre Completo *
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                          <User className="h-4 w-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={nombreCliente}
                          onChange={(e) => {
                            setNombreCliente(e.target.value)
                            if (errors.nombre) setErrors({ ...errors, nombre: undefined })
                          }}
                          placeholder="Ej. Juan Pérez"
                          className={`w-full rounded-xl border bg-white py-2 pl-9 pr-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            errors.nombre ? 'border-red-400' : 'border-stone-200'
                          }`}
                        />
                      </div>
                      {errors.nombre && (
                        <p className="mt-1 text-[11px] text-red-500">{errors.nombre}</p>
                      )}
                    </div>

                    {/* Dirección */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Dirección de Entrega *
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={direccion}
                          onChange={(e) => {
                            setDireccion(e.target.value)
                            if (errors.direccion) setErrors({ ...errors, direccion: undefined })
                          }}
                          placeholder="Ej. Cra 15 # 85-30 Apto 402"
                          className={`w-full rounded-xl border bg-white py-2 pl-9 pr-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            errors.direccion ? 'border-red-400' : 'border-stone-200'
                          }`}
                        />
                      </div>
                      {errors.direccion && (
                        <p className="mt-1 text-[11px] text-red-500">{errors.direccion}</p>
                      )}
                    </div>

                    {/* Notas */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Notas opcionales (salsas, sin cebolla, etc.)
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                          <FileText className="h-4 w-4" />
                        </div>
                        <input
                          type="text"
                          value={notas}
                          onChange={(e) => setNotas(e.target.value)}
                          placeholder="Ej. Salsa picante aparte, portería"
                          className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-9 pr-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer del Carrito con Checkout de WhatsApp */}
          {items.length > 0 && (
            <div className="border-t border-stone-100 bg-stone-50/70 p-6 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-500 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Costo de Envío</span>
                  <span className="italic">Por coordinar con el repartidor</span>
                </div>
                <div className="flex justify-between border-t border-stone-200/80 pt-2 text-base font-bold text-stone-900 font-serif">
                  <span>Total estimado:</span>
                  <span className="text-orange-600 font-bold">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.99] transition"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Enviando a WhatsApp...' : 'Completar Pedido por WhatsApp'}
              </button>
              <p className="text-center text-[11px] text-stone-400 font-sans">
                Atención rápida y directa sin comisiones ocultas de apps de terceros.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
