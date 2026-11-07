'use client'

import React, { useState, useMemo } from 'react'
import { Search, Flame, Utensils, Coffee, Sparkles, Heart } from 'lucide-react'
import { Category, Product } from '../types'
import ProductCard from './ProductCard'

interface MenuSectionProps {
  categories: Category[]
  products: Product[]
}

export default function MenuSection({ categories, products }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Map icon names to Lucide icons
  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'flame':
        return <Flame className="h-4 w-4" />
      case 'coffee':
        return <Coffee className="h-4 w-4" />
      case 'sparkles':
        return <Sparkles className="h-4 w-4" />
      case 'heart':
        return <Heart className="h-4 w-4" />
      default:
        return <Utensils className="h-4 w-4" />
    }
  }

  // Filtrado de productos por categoría y búsqueda
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.categoria === selectedCategory ||
        (typeof product.categoria === 'object' && (product.categoria as any)?.slug === selectedCategory)

      const matchesSearch =
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchQuery])

  return (
    <section id="menu" className="py-24 bg-theme-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la Sección */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Flame className="h-3.5 w-3.5 text-primary" />
            <span>Nuestra Carta Digital</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-theme-text">
            El Menú de la Casa
          </h2>

          <p className="text-stone-600 font-sans text-base sm:text-lg">
            Selecciona tu categoría preferida o busca tu plato favorito. Agrega al pedido con un clic y
            finaliza directamente por WhatsApp.
          </p>
        </div>

        {/* Barra de Filtros: Categorías + Buscador */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Pills de Categorías con scroll horizontal en mobile */}
          <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-theme-surface border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Todos los Platos</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
                  selectedCategory === 'all' ? 'bg-primary/90 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {products.length}
              </span>
            </button>

            {categories.map((cat) => {
              const count = products.filter(
                (p) =>
                  p.categoria === cat.slug ||
                  (typeof p.categoria === 'object' && (p.categoria as any)?.slug === cat.slug)
              ).length

              const isSelected = selectedCategory === cat.slug

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'bg-theme-surface border border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {getCategoryIcon(cat.icono)}
                  <span>{cat.nombre}</span>
                  <span
                    className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
                      isSelected ? 'bg-primary/90 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Buscador Rápido */}
          <div className="relative w-full md:w-72">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por ingrediente o nombre..."
              className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-xs font-sans text-theme-text placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
        </div>

        {/* Grilla de Productos */}
        <div className="mt-10">
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white/70 py-16 text-center">
              <p className="font-serif text-lg font-bold text-stone-700">No encontramos resultados</p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                No hay platos que coincidan con &quot;{searchQuery}&quot; en esta categoría. Intenta con
                otro término o restablece los filtros.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="mt-4 inline-flex rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-primary transition"
              >
                Ver todos los platos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
