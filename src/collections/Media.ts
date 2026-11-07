import type { CollectionConfig } from 'payload'
import { anyoneCanRead, isStaff, hasAdminPanelAccess } from '../access/roles'
import cloudinary from '../lib/cloudinary'

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
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        // Si Cloudinary está configurado en las variables de entorno, sube el archivo a Cloudinary
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
          return data
        }

        if (req.file && req.file.data) {
          try {
            const buffer = req.file.data
            const uploadResult = await new Promise<any>((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                {
                  folder: 'restaurante-media',
                  resource_type: 'auto',
                },
                (error, result) => {
                  if (error) reject(error)
                  else resolve(result)
                }
              )
              stream.end(buffer)
            })

            if (uploadResult && uploadResult.secure_url) {
              // Reemplazar la URL por la URL segura y persistente de Cloudinary
              data.url = uploadResult.secure_url
              data.cloudinaryId = uploadResult.public_id
            }
          } catch (error) {
            console.error('Error al subir imagen a Cloudinary:', error)
          }
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Limpieza automática en Cloudinary al eliminar del panel
        if (doc?.cloudinaryId && process.env.CLOUDINARY_CLOUD_NAME) {
          try {
            await cloudinary.uploader.destroy(doc.cloudinaryId)
          } catch (e) {
            console.error('Error al eliminar de Cloudinary:', e)
          }
        }
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
        placeholder: 'Ej. Arepa Paisa Suprema con chicharrón crocante',
      },
    },
    {
      name: 'cloudinaryId',
      type: 'text',
      admin: {
        hidden: true, // Campo técnico interno
      },
    },
  ],
}
