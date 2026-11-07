import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isAdminOrSuperAdmin } from '../access/roles'

export const HeroContent: GlobalConfig = {
  slug: 'hero-content',
  label: 'Hero (Cabecera Principal)',
  admin: {
    group: 'Contenido Web',
  },
  access: {
    read: anyoneCanRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'tituloPrincipal',
      type: 'text',
      label: 'Título Principal (Nombre / Gran Titular)',
      required: true,
      defaultValue: 'Panda Arepas & Grill',
    },
    {
      name: 'subtitulo',
      type: 'text',
      label: 'Subtítulo / Eslogan Destacado',
      required: true,
      defaultValue: 'El verdadero sabor del maíz artesanal y la brasa viva.',
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Párrafo Descriptivo',
      defaultValue: 'Masa de maíz peto recién molido, dorada al carbón de leña y rellena con carnes ahumadas lentamente y quesos frescos. Haz tu pedido y recíbelo caliente en tu puerta.',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Insignia Superior (Badge)',
      defaultValue: 'Auténtica Tradición & Sabor Artesanal',
    },
    {
      name: 'textoCTA',
      type: 'text',
      label: 'Texto del Botón Principal (CTA)',
      required: true,
      defaultValue: 'Ver Nuestro Menú',
    },
    {
      name: 'imagenFondo',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Principal de Impacto (Subir archivo)',
    },
    {
      name: 'imagenFondoUrl',
      type: 'text',
      label: 'URL o Ruta de Imagen (Fallback)',
      defaultValue: '/images/arepas-1.jpg',
    },
    {
      name: 'ratingText',
      type: 'text',
      label: 'Texto de Calificación / Social Proof',
      defaultValue: '4.9 / 5 (más de 1.200 clientes felices)',
    },
  ],
}
