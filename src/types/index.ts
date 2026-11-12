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

export interface PaymentMethodItem {
  id?: string
  nombre: string
}

export interface SalesShipping {
  nombreRestaurante: string
  tituloSitioWeb?: string
  descripcionSitioWeb?: string
  numeroWhatsApp: string
  mensajePredeterminado: string
  tipoDomicilio?: 'fijo' | 'a_convenir'
  costoDomicilio: number
  textoDomicilioPersonalizado?: string
  direccionFisica: string
  horarios: ScheduleItem[]
  tituloFormularioCheckout?: string
  habilitarMetodosPago?: boolean
  metodosPago?: PaymentMethodItem[]
  pieDePaginaCheckout?: string
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

export interface ProductOptionChoice {
  id?: string
  nombre: string
  precioExtra?: number
}

export interface ProductOptionGroup {
  id?: string
  titulo: string
  tipoSeleccion?: 'unica' | 'multiple'
  limiteSeleccion?: number
  requerido?: boolean
  opciones: ProductOptionChoice[]
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
  gruposOpciones?: ProductOptionGroup[]
}

export interface CartItem {
  cartItemId: string
  product: Product
  quantity: number
  selectedOptions?: Record<string, string>
  notes?: string
}

export interface CheckoutFormData {
  nombre: string
  direccion: string
  metodoPago?: string
  notas?: string
}
