import {
  ThemeBranding,
  SalesShipping,
  HeroContentData,
  FooterContentData,
  AboutUsContentData,
  Category,
  Product,
} from '../types'
import {
  mockThemeBranding,
  mockSalesShipping,
  mockHeroContent,
  mockFooterContent,
  mockAboutUsContent,
  mockCategories,
  mockProducts,
} from './mockData'

async function getPayloadInstance() {
  if (!process.env.MONGODB_URI) return null
  try {
    const { getPayload } = await import('payload')
    const config = await import('@payload-config')
    return await getPayload({ config: config.default })
  } catch (error) {
    return null
  }
}

export async function getThemeBranding(): Promise<ThemeBranding> {
  const payload = await getPayloadInstance()
  if (!payload) return mockThemeBranding

  try {
    const data = await payload.findGlobal({ slug: 'theme-branding', depth: 1 })
    if (!data) return mockThemeBranding

    let logoUrl = mockThemeBranding.logoUrl
    if (data.logo && typeof data.logo === 'object' && 'url' in data.logo && data.logo.url) {
      logoUrl = data.logo.url as string
    }

    return {
      primaryColor: data.primaryColor || mockThemeBranding.primaryColor,
      secondaryColor: data.secondaryColor || mockThemeBranding.secondaryColor,
      backgroundColor: data.backgroundColor || mockThemeBranding.backgroundColor,
      surfaceColor: data.surfaceColor || mockThemeBranding.surfaceColor,
      textColor: data.textColor || mockThemeBranding.textColor,
      logoUrl,
    }
  } catch (e) {
    return mockThemeBranding
  }
}

export async function getSalesShipping(): Promise<SalesShipping> {
  const payload = await getPayloadInstance()
  if (!payload) return mockSalesShipping

  try {
    const data = await payload.findGlobal({ slug: 'sales-shipping' })
    if (!data) return mockSalesShipping

    return {
      nombreRestaurante: data.nombreRestaurante || mockSalesShipping.nombreRestaurante,
      numeroWhatsApp: data.numeroWhatsApp || mockSalesShipping.numeroWhatsApp,
      mensajePredeterminado:
        data.mensajePredeterminado || mockSalesShipping.mensajePredeterminado,
      costoDomicilio:
        typeof data.costoDomicilio === 'number'
          ? data.costoDomicilio
          : mockSalesShipping.costoDomicilio,
      direccionFisica: data.direccionFisica || mockSalesShipping.direccionFisica,
      horarios:
        data.horarios && data.horarios.length > 0
          ? (data.horarios as any)
          : mockSalesShipping.horarios,
    }
  } catch (e) {
    return mockSalesShipping
  }
}

export async function getHeroContent(): Promise<HeroContentData> {
  const payload = await getPayloadInstance()
  if (!payload) return mockHeroContent

  try {
    const data = await payload.findGlobal({ slug: 'hero-content', depth: 1 })
    if (!data) return mockHeroContent

    let imagenFondoUrl = mockHeroContent.imagenFondoUrl
    if (data.imagenFondo && typeof data.imagenFondo === 'object' && 'url' in data.imagenFondo && data.imagenFondo.url) {
      imagenFondoUrl = data.imagenFondo.url as string
    }

    return {
      tituloPrincipal: data.tituloPrincipal || mockHeroContent.tituloPrincipal,
      subtitulo: data.subtitulo || mockHeroContent.subtitulo,
      descripcion: data.descripcion || mockHeroContent.descripcion,
      badge: data.badge || mockHeroContent.badge,
      textoCTA: data.textoCTA || mockHeroContent.textoCTA,
      imagenFondoUrl,
      ratingText: data.ratingText || mockHeroContent.ratingText,
      platoInsigniaEtiqueta: (data.platoInsigniaEtiqueta as string) || mockHeroContent.platoInsigniaEtiqueta,
      platoInsigniaTitulo: (data.platoInsigniaTitulo as string) || mockHeroContent.platoInsigniaTitulo,
      tiempoDespachoTexto: (data.tiempoDespachoTexto as string) || mockHeroContent.tiempoDespachoTexto,
    }
  } catch (e) {
    return mockHeroContent
  }
}

export async function getFooterContent(): Promise<FooterContentData> {
  const payload = await getPayloadInstance()
  if (!payload) return mockFooterContent

  try {
    const data = await payload.findGlobal({ slug: 'footer-content' })
    if (!data) return mockFooterContent

    return {
      tituloSEO: data.tituloSEO || mockFooterContent.tituloSEO,
      descripcionSEO: data.descripcionSEO || mockFooterContent.descripcionSEO,
      creditos: data.creditos || mockFooterContent.creditos,
      redesSociales:
        data.redesSociales && data.redesSociales.length > 0
          ? (data.redesSociales as any)
          : mockFooterContent.redesSociales,
    }
  } catch (e) {
    return mockFooterContent
  }
}

export async function getAboutUsContent(): Promise<AboutUsContentData> {
  const payload = await getPayloadInstance()
  if (!payload) return mockAboutUsContent

  try {
    const data = await payload.findGlobal({ slug: 'about-us-content', depth: 1 })
    if (!data) return mockAboutUsContent

    let imagen1Url = mockAboutUsContent.imagen1Url
    let imagen2Url = mockAboutUsContent.imagen2Url
    let imagen3Url = mockAboutUsContent.imagen3Url

    if (data.imagen1 && typeof data.imagen1 === 'object' && 'url' in data.imagen1 && data.imagen1.url) {
      imagen1Url = data.imagen1.url as string
    }
    if (data.imagen2 && typeof data.imagen2 === 'object' && 'url' in data.imagen2 && data.imagen2.url) {
      imagen2Url = data.imagen2.url as string
    }
    if (data.imagen3 && typeof data.imagen3 === 'object' && 'url' in data.imagen3 && data.imagen3.url) {
      imagen3Url = data.imagen3.url as string
    }

    return {
      badge: data.badge || mockAboutUsContent.badge,
      titulo: data.titulo || mockAboutUsContent.titulo,
      parrafo1: data.parrafo1 || mockAboutUsContent.parrafo1,
      parrafo2: data.parrafo2 || mockAboutUsContent.parrafo2,
      stats:
        data.stats && data.stats.length > 0 ? (data.stats as any) : mockAboutUsContent.stats,
      imagen1Url,
      imagen2Url,
      imagen3Url,
    }
  } catch (e) {
    return mockAboutUsContent
  }
}

export async function getCategories(): Promise<Category[]> {
  const payload = await getPayloadInstance()
  if (!payload) return mockCategories

  try {
    const result = await payload.find({
      collection: 'categories',
      sort: 'orden',
      limit: 100,
    })

    if (!result.docs || result.docs.length === 0) return mockCategories

    return result.docs.map((doc: any) => ({
      id: doc.id,
      nombre: doc.nombre,
      slug: doc.slug,
      icono: doc.icono,
      orden: doc.orden ?? 0,
    }))
  } catch (e) {
    return mockCategories
  }
}

export async function getProducts(): Promise<Product[]> {
  const payload = await getPayloadInstance()
  if (!payload) return mockProducts

  try {
    const result = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 1,
    })

    if (!result.docs || result.docs.length === 0) return mockProducts

    return result.docs.map((doc: any) => {
      let imageSrc = '/images/arepas-1.jpg'
      if (doc.imagen && typeof doc.imagen === 'object' && 'url' in doc.imagen && doc.imagen.url) {
        imageSrc = doc.imagen.url as string
      }

      const catSlug =
        typeof doc.categoria === 'object' && doc.categoria?.slug
          ? doc.categoria.slug
          : typeof doc.categoria === 'string'
          ? doc.categoria
          : 'arepas-especiales'

      return {
        id: doc.id,
        nombre: doc.nombre,
        precio: doc.precio,
        descripcion: doc.descripcion,
        imagenUrl: imageSrc,
        categoria: catSlug,
        disponible: doc.disponible ?? true,
        destacado: doc.destacado ?? false,
      }
    })
  } catch (e) {
    return mockProducts
  }
}
