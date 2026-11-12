import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isSuperAdmin } from '../access/roles'

export const HeroContent: GlobalConfig = {
  slug: 'hero-content',
  label: 'Hero (Cabecera Principal)',
  admin: {
    group: 'Contenido Web',
    hidden: ({ user }) => user?.role !== 'superadmin',
  },
  access: {
    read: anyoneCanRead,
    update: isSuperAdmin, // SOLO SuperAdmin puede editar la cabecera principal
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
      defaultValue:
        'Masa de maíz peto recién molido, dorada al carbón de leña y rellena con carnes ahumadas lentamente y quesos frescos. Haz tu pedido y recíbelo caliente en tu puerta.',
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
      label: 'Imagen Principal de Impacto (Subir Archivo a Media)',
      required: false,
      admin: {
        description: 'Sube la imagen destacada que se mostrará en la cabecera principal.',
      },
    },
    {
      name: 'ratingText',
      type: 'text',
      label: 'Texto de Calificación / Social Proof',
      defaultValue: '4.9 / 5 (más de 1.200 clientes felices)',
    },
    {
      name: 'platoInsigniaEtiqueta',
      type: 'text',
      label: 'Etiqueta Tarjeta Flotante (ej. Plato Insignia)',
      defaultValue: 'Plato Insignia',
      admin: {
        description: 'Texto pequeño en mayúsculas de la tarjeta flotante inferior del Hero.',
        placeholder: 'Plato Insignia',
      },
    },
    {
      name: 'platoInsigniaTitulo',
      type: 'text',
      label: 'Nombre del Plato Insignia',
      defaultValue: 'Arepa Paisa Suprema al Carbón',
      admin: {
        description: 'Nombre del plato insignia que se muestra en la tarjeta flotante del Hero.',
        placeholder: 'Arepa Paisa Suprema al Carbón',
      },
    },
    {
      name: 'tiempoDespachoTexto',
      type: 'text',
      label: 'Texto de Despacho (Tarjeta Flotante Superior)',
      defaultValue: 'Despacho en 35-45 min',
      admin: {
        description: 'Texto mostrado en la tarjeta flotante superior derecha con punto verde.',
        placeholder: 'Despacho en 35-45 min',
      },
    },
  ],
}
