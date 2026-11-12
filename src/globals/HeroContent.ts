import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isSuperAdmin } from '../access/roles'

export const HeroContent: GlobalConfig = {
  slug: 'hero-content',
  label: 'Hero (Cabecera Principal)',
  admin: {
    group: '📄 Contenido Editorial (Agencia)',
    hidden: ({ user }) => user?.role !== 'superadmin',
  },
  access: {
    read: anyoneCanRead,
    update: isSuperAdmin, // SOLO SuperAdmin puede editar la cabecera principal
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '📢 Titulares y Botón CTA',
          description: 'Textos de gran impacto y botón principal del Hero.',
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
              type: 'row',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  label: 'Insignia Superior (Badge)',
                  defaultValue: 'Auténtica Tradición & Sabor Artesanal',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'textoCTA',
                  type: 'text',
                  label: 'Texto del Botón Principal (CTA)',
                  required: true,
                  defaultValue: 'Ver Nuestro Menú',
                  admin: {
                    width: '50%',
                  },
                },
              ],
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
          ],
        },
        {
          label: '🔥 Tarjetas Flotantes & Social Proof',
          description: 'Plato insignia flotante, tiempo de entrega y calificación.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'platoInsigniaEtiqueta',
                  type: 'text',
                  label: 'Etiqueta Tarjeta Flotante',
                  defaultValue: 'Plato Insignia',
                  admin: {
                    width: '50%',
                    placeholder: 'Plato Insignia',
                  },
                },
                {
                  name: 'platoInsigniaTitulo',
                  type: 'text',
                  label: 'Nombre del Plato Insignia',
                  defaultValue: 'Arepa Paisa Suprema al Carbón',
                  admin: {
                    width: '50%',
                    placeholder: 'Arepa Paisa Suprema al Carbón',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'tiempoDespachoTexto',
                  type: 'text',
                  label: 'Texto de Despacho (Tarjeta Superior)',
                  defaultValue: 'Despacho en 35-45 min',
                  admin: {
                    width: '50%',
                    placeholder: 'Despacho en 35-45 min',
                  },
                },
                {
                  name: 'ratingText',
                  type: 'text',
                  label: 'Texto de Calificación / Social Proof',
                  defaultValue: '4.9 / 5 (más de 1.200 clientes felices)',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
