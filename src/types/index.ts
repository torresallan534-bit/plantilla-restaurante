export interface ThemeBranding {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  surfaceColor: string
  textColor: string
  logoUrl: string
  logo?: any
}

export interface ScheduleItem {
  id?: string
  dias: string
  horas: string
}

export interface SalesShipping {
  nombreRestaurante: string
  numeroWhatsApp: string
  mensajePredeterminado: string
  costoDomicilio: number
  direccionFisica: string
  horarios: ScheduleItem[]
}

export interface HeroContentData {
  tituloPrincipal: string
  subtitulo: string
  descripcion: string
  badge: string
  textoCTA: string
  imagenFondoUrl: string
  ratingText: string
  platoInsigniaEtiqueta?: string
  platoInsigniaTitulo?: string
  tiempoDespachoTexto?: string
}

export interface SocialNetwork {
  id?: string
  red: 'instagram' | 'facebook' | 'tiktok' | 'whatsapp'
  url: string
}

export interface FooterContentData {
  tituloSEO: string
  descripcionSEO: string
  creditos: string
  redesSociales: SocialNetwork[]
}

export interface StatItem {
  id?: string
  numero: string
  etiqueta: string
}

export interface AboutUsContentData {
  badge: string
  titulo: string
  parrafo1: string
  parrafo2: string
  stats: StatItem[]
  imagen1Url: string
  imagen2Url: string
  imagen3Url: string
}

export interface Category {
  id: string
  nombre: string
  slug: string
  icono?: string
  orden: number
}

export interface Product {
  id: string
  nombre: string
  precio: number
  descripcion: string
  imagenUrl?: string
  categoria: Category | string
  disponible: boolean
  destacado?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  notes?: string
}

export interface CheckoutFormData {
  nombre: string
  direccion: string
  notas?: string
}
