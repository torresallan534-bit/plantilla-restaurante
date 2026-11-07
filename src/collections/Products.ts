import type { CollectionConfig } from 'payload'
import { anyoneCanRead, isStaff, hasAdminPanelAccess } from '../access/roles'

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
    create: isStaff, // SuperAdmin absoluto y Admin de la tienda
    update: isStaff, // SuperAdmin absoluto y Admin de la tienda
    delete: isStaff, // SuperAdmin absoluto y Admin de la tienda
    admin: hasAdminPanelAccess,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Plato o Bebida',
      required: true,
      admin: {
        placeholder: 'Ej. Arepa Paisa Suprema con Chicharrón',
      },
    },
    {
      name: 'precio',
      type: 'number',
      label: 'Precio ($)',
      required: true,
      min: 0,
      admin: {
        placeholder: 'Ej. 22000',
        description: 'Valor del producto en moneda local (ej. COP o USD).',
      },
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción Apetitosa',
      required: true,
      admin: {
        placeholder: 'Describe los ingredientes frescos y preparación artesanal...',
      },
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      label: 'Fotografía del Producto (Subir Archivo a Media)',
      required: false,
      admin: {
        description: 'Sube la foto del plato directamente a la biblioteca multimedia.',
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
      label: 'Disponible para Pedidos (Interruptor de Agotado)',
      defaultValue: true,
      admin: {
        description: 'Desmarcar para marcar automáticamente como Agotado en la web y deshabilitar compras.',
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
