import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isAdminOrSuperAdmin } from '../access/roles'

export const FooterContent: GlobalConfig = {
  slug: 'footer-content',
  label: 'Footer (Pie de Página & SEO)',
  admin: {
    group: 'Contenido Web',
  },
  access: {
    read: anyoneCanRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'tituloSEO',
      type: 'text',
      label: 'Título SEO del Restaurante',
      required: true,
      defaultValue: 'Panda Arepas & Grill - Maestros del Carbón',
    },
    {
      name: 'descripcionSEO',
      type: 'textarea',
      label: 'Descripción SEO / Párrafo del Footer',
      required: true,
      defaultValue: 'Auténtico maíz peto procesado artesanalmente día a día. Rellenos generosos y el mejor toque ahumado al carbón.',
    },
    {
      name: 'creditos',
      type: 'text',
      label: 'Texto de Créditos / Autoría',
      defaultValue: 'Desarrollado con pasión por Panda Haus Agencia Web',
    },
    {
      name: 'redesSociales',
      type: 'array',
      label: 'Enlaces a Redes Sociales',
      defaultValue: [
        { red: 'instagram', url: 'https://instagram.com' },
        { red: 'facebook', url: 'https://facebook.com' },
        { red: 'tiktok', url: 'https://tiktok.com' },
      ],
      fields: [
        {
          name: 'red',
          type: 'select',
          label: 'Red Social',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL del Perfil',
          required: true,
        },
      ],
    },
  ],
}
