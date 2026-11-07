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
  },
  upload: {
    staticDir: 'public/media',
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
    create: isStaff, // SuperAdmin y Admin pueden subir archivos multimedia
    update: isStaff, // SuperAdmin y Admin pueden actualizar archivos
    delete: isStaff, // SuperAdmin y Admin pueden eliminar archivos
    admin: hasAdminPanelAccess,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto Alternativo (Descripción para SEO y Accesibilidad)',
      required: false,
      admin: {
        placeholder: 'Ej. Arepa Paisa Suprema con chicharrón crocante',
      },
    },
  ],
}
