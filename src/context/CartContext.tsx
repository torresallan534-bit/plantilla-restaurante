'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, Product } from '../types'

export function generateCartItemId(productId: string, selectedOptions?: Record<string, string>): string {
  if (!selectedOptions || Object.keys(selectedOptions).length === 0) {
    return productId
  }
  const serialized = Object.entries(selectedOptions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|')
  return `${productId}::${serialized}`
}

export function getItemUnitPrice(item: CartItem): number {
  let price = item.product.precio
  if (item.selectedOptions && item.product.gruposOpciones) {
    for (const group of item.product.gruposOpciones) {
      const selectedChoiceName = item.selectedOptions[group.titulo]
      if (selectedChoiceName) {
        const found = group.opciones.find((opt) => opt.nombre === selectedChoiceName)
        if (found && typeof found.precioExtra === 'number') {
          price += found.precioExtra
        }
      }
    }
  }
  return price
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number, selectedOptions?: Record<string, string>) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  lastAddedProduct: Product | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'panda_restaurant_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    setIsMounted(true)
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        // Asegurar que cada ítem tenga su cartItemId para compatibilidad
        const normalized = parsed.map((item: any) => ({
          ...item,
          cartItemId: item.cartItemId || item.product?.id || Math.random().toString(),
        }))
        setItems(normalized)
      }
    } catch (e) {
      console.warn('Error loading cart from storage', e)
    }
  }, [])

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    if (!isMounted) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.warn('Error saving cart to storage', e)
    }
  }, [items, isMounted])

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedOptions?: Record<string, string>
  ) => {
    const cartItemId = generateCartItemId(product.id, selectedOptions)

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => (item.cartItemId || item.product.id) === cartItemId
      )
      if (existingIndex > -1) {
        const nextItems = [...prevItems]
        nextItems[existingIndex] = {
          ...nextItems[existingIndex],
          quantity: nextItems[existingIndex].quantity + quantity,
        }
        return nextItems
      } else {
        return [...prevItems, { cartItemId, product, quantity, selectedOptions }]
      }
    })

    // Feedback visual del botón flotante
    setLastAddedProduct(product)
    setTimeout(() => {
      setLastAddedProduct(null)
    }, 2500)
  }

  const removeFromCart = (cartItemId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => (item.cartItemId || item.product.id) !== cartItemId)
    )
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        (item.cartItemId || item.product.id) === cartItemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch (e) {
      console.warn('Error clearing cart storage', e)
    }
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * getItemUnitPrice(item),
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        lastAddedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
