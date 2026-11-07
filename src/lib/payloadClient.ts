import { BusinessConfig, Category, Product } from '../types'
import { mockBusinessConfig, mockCategories, mockProducts } from './mockData'

export async function getBusinessSettings(): Promise<BusinessConfig> {
  if (!process.env.MONGODB_URI) {
    return mockBusinessConfig
  }

  try {
    const { getPayload } = await import('payload')
    const config = await import('@payload-config')
    const payload = await getPayload({ config: config.default })

    const settings = await payload.findGlobal({
      slug: 'business-settings',
    })

    if (!settings || !settings.nombreRestaurante) {
      return mockBusinessConfig
    }

    return {
      nombreRestaurante: settings.nombreRestaurante || mockBusinessConfig.nombreRestaurante,
      eslogan: settings.eslogan || mockBusinessConfig.eslogan,
      numeroWhatsApp: settings.numeroWhatsApp || mockBusinessConfig.numeroWhatsApp,
      mensajePredeterminadoWhatsApp:
        settings.mensajePredeterminadoWhatsApp || mockBusinessConfig.mensajePredeterminadoWhatsApp,
      logoUrl:
        typeof settings.logo === 'object' && settings.logo && 'url' in settings.logo
          ? (settings.logo.url as string)
          : settings.logoUrl || mockBusinessConfig.logoUrl,
      direccionFisica: settings.direccionFisica || mockBusinessConfig.direccionFisica,
      horarios:
        settings.horarios && settings.horarios.length > 0
          ? (settings.horarios as any)
          : mockBusinessConfig.horarios,
      conocenosBadge: settings.conocenosBadge || mockBusinessConfig.conocenosBadge,
      conocenosTitulo: settings.conocenosTitulo || mockBusinessConfig.conocenosTitulo,
      conocenosParrafo1: settings.conocenosParrafo1 || mockBusinessConfig.conocenosParrafo1,
      conocenosParrafo2: settings.conocenosParrafo2 || mockBusinessConfig.conocenosParrafo2,
      stats:
        settings.stats && settings.stats.length > 0
          ? (settings.stats as any)
          : mockBusinessConfig.stats,
    }
  } catch (error) {
    console.warn('Payload CMS no conectado o inicializando, utilizando fallback de diseño:', error)
    return mockBusinessConfig
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!process.env.MONGODB_URI) {
    return mockCategories
  }

  try {
    const { getPayload } = await import('payload')
    const config = await import('@payload-config')
    const payload = await getPayload({ config: config.default })

    const result = await payload.find({
      collection: 'categories',
      sort: 'orden',
      limit: 100,
    })

    if (!result.docs || result.docs.length === 0) {
      return mockCategories
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      nombre: doc.nombre,
      slug: doc.slug,
      icono: doc.icono,
      orden: doc.orden ?? 0,
    }))
  } catch (error) {
    return mockCategories
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!process.env.MONGODB_URI) {
    return mockProducts
  }

  try {
    const { getPayload } = await import('payload')
    const config = await import('@payload-config')
    const payload = await getPayload({ config: config.default })

    const result = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 1,
    })

    if (!result.docs || result.docs.length === 0) {
      return mockProducts
    }

    return result.docs.map((doc: any) => {
      let imageSrc = doc.imagenUrl || '/images/arepas-1.jpg'
      if (doc.imagen && typeof doc.imagen === 'object' && doc.imagen.url) {
        imageSrc = doc.imagen.url
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
  } catch (error) {
    return mockProducts
  }
}
