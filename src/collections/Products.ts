import type { CollectionConfig } from 'payload'
import { anyoneCanRead, isAdminOrSuperAdmin } from '../access/roles'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Producto / Plato',
    plural: 'Productos / Menú',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'precio', 'categoria', 'disponible', 'destacado'],
  },
  access: {
    read: anyoneCanRead,
    create: isAdminOrSuperAdmin,
    update: isAdminOrSuperAdmin,
    delete: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Plato o Bebida',
      required: true,
      admin: {
        placeholder: 'Ej. Arepa Reina Pepiada Suprema',
      },
    },
    {
      name: 'precio',
      type: 'number',
      label: 'Precio ($)',
      required: true,
      min: 0,
      admin: {
        placeholder: 'Ej. 18000',
        description: 'Valor numérico del producto en moneda local (ej. COP o USD).',
      },
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción Apetitosa',
      required: true,
      admin: {
        placeholder: 'Describe los ingredientes frescos, preparación artesanal o acompañamientos...',
      },
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Fotografía del Producto',
      required: false,
    },
    {
      name: 'imagenUrl',
      type: 'text',
      label: 'URL o Ruta Local de Imagen (Fallback)',
      admin: {
        description: 'Ruta local directa como /images/arepas-1.jpg o URL externa si no subes archivo a Media.',
      },
    },
    {
      name: 'categoria',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categoría del Menú',
      required: true,
      hasMany: false,
    },
    {
      name: 'disponible',
      type: 'checkbox',
      label: 'Disponible para Pedidos',
      defaultValue: true,
      admin: {
        description: 'Desmarcar si el producto se ha agotado en el día.',
      },
    },
    {
      name: 'destacado',
      type: 'checkbox',
      label: 'Plato Estrella / Destacado',
      defaultValue: false,
      admin: {
        description: 'Muestra una insignia dorada "Favorito" en el menú.',
      },
    },
  ],
}
