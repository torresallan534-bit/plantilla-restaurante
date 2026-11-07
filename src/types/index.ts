export interface Category {
  id: string
  nombre: string
  slug: string
  icono?: string
  orden: number
}

export interface MediaItem {
  id: string
  url?: string
  alt?: string
}

export interface Product {
  id: string
  nombre: string
  precio: number
  descripcion: string
  imagen?: MediaItem | string | null
  imagenUrl?: string
  categoria: Category | string
  disponible: boolean
  destacado?: boolean
}

export interface ScheduleItem {
  id?: string
  dias: string
  horas: string
}

export interface StatItem {
  id?: string
  numero: string
  etiqueta: string
}

export interface BusinessConfig {
  nombreRestaurante: string
  eslogan: string
  numeroWhatsApp: string
  mensajePredeterminadoWhatsApp: string
  logo?: MediaItem | string | null
  logoUrl?: string
  direccionFisica: string
  horarios: ScheduleItem[]
  conocenosBadge: string
  conocenosTitulo: string
  conocenosParrafo1: string
  conocenosParrafo2: string
  stats: StatItem[]
}

export interface CartItem {
  product: Product
  quantity: number
  notes?: string
}

export interface CheckoutFormData {
  nombreCliente: string
  direccion: string
  notas?: string
}
