'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Send,
  MapPin,
  User,
  FileText,
  ArrowRight,
  Truck,
  CreditCard,
} from 'lucide-react'
import { useCart, getItemUnitPrice } from '../context/CartContext'
import { SalesShipping } from '../types'

interface CartDrawerProps {
  salesShipping: SalesShipping
}

export default function CartDrawer({ salesShipping }: CartDrawerProps) {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
  } = useCart()

  const defaultPaymentMethods = [
    'Efectivo contra entrega',
    'Transferencia Nequi / Daviplata',
    'Datáfono / Tarjeta a domicilio',
  ]
  const paymentMethods =
    salesShipping.metodosPago && salesShipping.metodosPago.length > 0
      ? salesShipping.metodosPago.map((m) => m.nombre)
      : defaultPaymentMethods

  const [nombreCliente, setNombreCliente] = useState('')
  const [direccion, setDireccion] = useState('')
  const [metodoPago, setMetodoPago] = useState<string>(paymentMethods[0] || 'Efectivo contra entrega')
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

  // Cálculos de Subtotal dinámico con adicionales de opciones
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * getItemUnitPrice(item),
    0
  )

  const isDomicilioAConvenir = salesShipping.tipoDomicilio === 'a_convenir'
  const textoDomicilio =
    salesShipping.textoDomicilioPersonalizado || 'El precio se determina con el domiciliario'
  const costoDomicilio = isDomicilioAConvenir ? 0 : (salesShipping.costoDomicilio ?? 5000)
  const total = subtotal + (items.length > 0 ? costoDomicilio : 0)

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

    const restaurante = salesShipping.nombreRestaurante || 'Panda Arepas & Grill'
    const cleanPhone = (salesShipping.numeroWhatsApp || '573001234567').replace(/\D/g, '')

    // Formatear líneas de productos con opciones/sabores seleccionados:
    // [Cant]x [Producto] (Opciones) - $[Precio]
    const productLines = items
      .map((item) => {
        const unitPrice = getItemUnitPrice(item)
        let optionsText = ''
        if (item.selectedOptions && Object.keys(item.selectedOptions).length > 0) {
          const parts = Object.entries(item.selectedOptions).map(
            ([group, choice]) => `${group}: ${choice}`
          )
          optionsText = ` (${parts.join(', ')})`
        }
        return `${item.quantity}x ${item.product.nombre}${optionsText} - ${formatPrice(
          unitPrice * item.quantity
        )}`
      })
      .join('\n')

    // Estructura completa enviada a WhatsApp
    const domicilioWhatsApp = isDomicilioAConvenir
      ? `Domicilio: ${textoDomicilio}`
      : `Domicilio: ${formatPrice(costoDomicilio)}`

    const totalWhatsApp = isDomicilioAConvenir
      ? `Total productos: ${formatPrice(subtotal)} (+ valor de domicilio por definir)`
      : `Total a pagar: ${formatPrice(total)}`

    let message = `Hola ${restaurante}, soy ${nombreCliente.trim()}, para pedir:\n\n${productLines}\n\nSubtotal: ${formatPrice(
      subtotal
    )}\n${domicilioWhatsApp}\n${totalWhatsApp}`

    if (salesShipping.habilitarMetodosPago !== false && metodoPago) {
      message += `\nMétodo de pago: ${metodoPago}`
    }

    message += `\nDirección: ${direccion.trim()}`

    if (notas.trim()) {
      message += `\nNotas: ${notas.trim()}`
    }

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`

    // 1. Redirigir a WhatsApp
    window.open(whatsappUrl, '_blank')

    // 2. REQUISITO: Borrar el carrito en la página al enviar el pedido
    clearCart()
    closeCart()
    setNombreCliente('')
    setDireccion('')
    setNotas('')
    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-theme-text">Tu Pedido</h3>
                <p className="text-xs text-stone-500 font-sans">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en la orden
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100 transition"
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
                <h3 className="font-serif text-xl font-semibold text-theme-text">
                  El carrito está vacío
                </h3>
                <p className="mt-2 text-sm text-stone-500 max-w-xs font-sans">
                  Agrega tus arepas, combos y bebidas favoritas de nuestro menú para pedirlos directamente por
                  WhatsApp.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary transition shadow-sm"
                >
                  Explorar Menú <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Lista de Productos con Opciones / Sabores */}
                <div className="divide-y divide-stone-100">
                  {items.map((item) => {
                    const itemKey = item.cartItemId || item.product.id
                    const unitPrice = getItemUnitPrice(item)

                    return (
                      <div key={itemKey} className="py-4 flex gap-4 items-center">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                          <Image
                            src={item.product.imagenUrl || '/images/arepas-1.jpg'}
                            alt={item.product.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-sm text-theme-text truncate">
                            {item.product.nombre}
                          </h4>

                          {/* Variantes y Sabores Seleccionados */}
                          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {Object.entries(item.selectedOptions).map(([groupTitle, optionVal]) => (
                                <span
                                  key={groupTitle}
                                  className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-700 border border-stone-200/60"
                                >
                                  <span className="text-stone-400 mr-1">{groupTitle}:</span>
                                  <span className="font-semibold text-primary">{optionVal}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="text-xs font-semibold text-primary mt-1">
                            {formatPrice(unitPrice)} c/u
                          </p>

                          <div className="flex items-center gap-3 mt-2">
                            <div className="inline-flex items-center rounded-lg border border-stone-200 bg-stone-50">
                              <button
                                onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                                className="p-1 text-stone-600 hover:text-stone-900 transition"
                                aria-label="Disminuir cantidad"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-theme-text">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                                className="p-1 text-stone-600 hover:text-stone-900 transition"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-stone-700">
                              {formatPrice(unitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(itemKey)}
                          className="p-2 text-stone-300 hover:text-red-500 transition"
                          title="Eliminar plato"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Formulario de Entrega 100% Configurable desde Payload CMS */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-2">
                  <div className="rounded-2xl bg-stone-50 p-4 border border-stone-100 space-y-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {salesShipping.tituloFormularioCheckout || 'Datos de Entrega Inmediata'}
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
                          className={`w-full rounded-xl border bg-white py-2 pl-9 pr-3 text-xs text-theme-text placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary ${
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
                          className={`w-full rounded-xl border bg-white py-2 pl-9 pr-3 text-xs text-theme-text placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.direccion ? 'border-red-400' : 'border-stone-200'
                          }`}
                        />
                      </div>
                      {errors.direccion && (
                        <p className="mt-1 text-[11px] text-red-500">{errors.direccion}</p>
                      )}
                    </div>

                    {/* Método de Pago (Configurable desde Payload) */}
                    {salesShipping.habilitarMetodosPago !== false && paymentMethods.length > 0 && (
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                          <CreditCard className="h-3.5 w-3.5 text-stone-500" />
                          <span>Método de Pago *</span>
                        </label>
                        <div className="space-y-1.5">
                          {paymentMethods.map((metodo) => {
                            const isSelected = metodoPago === metodo
                            return (
                              <button
                                key={metodo}
                                type="button"
                                onClick={() => setMetodoPago(metodo)}
                                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                                  isSelected
                                    ? 'border-primary bg-primary/10 text-theme-text ring-1 ring-primary'
                                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition ${
                                      isSelected
                                        ? 'border-primary bg-primary'
                                        : 'border-stone-300 bg-white'
                                    }`}
                                  >
                                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                                  </div>
                                  <span>{metodo}</span>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Notas */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Notas opcionales (salsas aparte, cubiertos, etc.)
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                          <FileText className="h-4 w-4" />
                        </div>
                        <input
                          type="text"
                          value={notas}
                          onChange={(e) => setNotas(e.target.value)}
                          placeholder="Ej. Salsa de ajo aparte, timbre averiado"
                          className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-9 pr-3 text-xs text-theme-text placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer del Carrito con Resumen: Subtotal + Domicilio + Total */}
          {items.length > 0 && (
            <div className="border-t border-stone-100 bg-stone-50/70 p-6 space-y-4">
              <div className="space-y-2 text-xs text-stone-600 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-theme-text">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                    Costo de Domicilio
                  </span>
                  {isDomicilioAConvenir ? (
                    <span className="text-[11px] font-semibold text-primary text-right max-w-[200px] leading-tight">
                      {textoDomicilio}
                    </span>
                  ) : (
                    <span className="font-semibold text-theme-text">
                      {formatPrice(costoDomicilio)}
                    </span>
                  )}
                </div>
                <div className="flex justify-between border-t border-stone-200/80 pt-2 text-base font-bold text-theme-text font-serif">
                  <span>Total a pagar:</span>
                  <span className="text-primary font-bold">
                    {isDomicilioAConvenir
                      ? `${formatPrice(subtotal)} (+ Domicilio)`
                      : formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.99] transition"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Enviando a WhatsApp...' : 'Enviar Pedido por WhatsApp'}
              </button>

              <p className="text-center text-[11px] text-stone-400 font-sans">
                {salesShipping.pieDePaginaCheckout || 'Pedido directo sin intermediarios ni cargos de servicio.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
