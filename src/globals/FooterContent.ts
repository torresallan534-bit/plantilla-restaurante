import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isSuperAdmin } from '../access/roles'

export const FooterContent: GlobalConfig = {
  slug: 'footer-content',
  label: 'Footer (Pie de Página & Redes)',
  admin: {
    group: 'Contenido Web',
    hidden: ({ user }) => user?.role !== 'superadmin',
  },
  access: {
    read: anyoneCanRead,
    update: isSuperAdmin, // SOLO SuperAdmin puede editar créditos y redes
  },
  fields: [
    {
      name: 'tituloSEO',
      type: 'text',
      label: 'Título del Footer',
      required: true,
      defaultValue: 'Panda Arepas & Grill - Maestros del Carbón',
    },
    {
      name: 'descripcionSEO',
      type: 'textarea',
      label: 'Descripción / Párrafo del Footer',
      required: true,
      defaultValue:
        'Auténtico maíz peto procesado artesanalmente día a día. Rellenos generosos y el mejor toque ahumado al carbón.',
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
          label: 'Enlace / URL del Perfil',
          required: true,
        },
      ],
    },
  ],
}
