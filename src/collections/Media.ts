import type { CollectionConfig } from 'payload'
import { anyoneCanRead, isStaff, hasAdminPanelAccess } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Imagen / Archivo Multimedia',
    plural: 'Biblioteca Multimedia',
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'filesize', 'createdAt'],
    group: '🖼️ Multimedia',
  },
  upload: {
    // Deshabilita almacenamiento en disco local para evitar errores EROFS en Vercel Serverless
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  access: {
    read: anyoneCanRead,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
    admin: hasAdminPanelAccess,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto Alternativo (Descripción para SEO y Accesibilidad)',
      required: false,
      admin: {
        placeholder: 'Ej. Foto del plato o logo',
      },
    },
  ],
}
