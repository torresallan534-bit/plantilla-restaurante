import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isSuperAdmin } from '../access/roles'

export const AboutUsContent: GlobalConfig = {
  slug: 'about-us-content',
  label: 'Sección Conócenos (Bento Grid)',
  admin: {
    group: 'Contenido Web',
    hidden: ({ user }) => user?.role !== 'superadmin',
  },
  access: {
    read: anyoneCanRead,
    update: isSuperAdmin, // SOLO SuperAdmin puede editar la historia y bento grid
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Insignia Superior (Badge)',
      defaultValue: 'Nuestra Historia & Pasión',
    },
    {
      name: 'titulo',
      type: 'text',
      label: 'Título de la Sección',
      defaultValue: 'Amor por el Maíz Peto y la Gastronomía Artesanal',
    },
    {
      name: 'parrafo1',
      type: 'textarea',
      label: 'Párrafo Principal',
      defaultValue:
        'Nacimos con una sola obsesión: rescatar el sabor auténtico del maíz peto molido en casa y combinarlo con rellenos generosos, carnes ahumadas al carbón y queso artesanal de campo.',
    },
    {
      name: 'parrafo2',
      type: 'textarea',
      label: 'Párrafo Secundario',
      defaultValue:
        'Cada arepa y plato que sale de nuestra cocina es amasado a mano en el momento. Creemos que la buena comida une a las personas y cada bocado debe despertar memorias de hogar.',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Métricas / Estadísticas Destacadas',
      defaultValue: [
        { numero: '10+', etiqueta: 'Años de Experiencia' },
        { numero: '100%', etiqueta: 'Maíz de Origen Local' },
        { numero: '4.9 ★', etiqueta: 'Satisfacción Clientes' },
        { numero: '15k+', etiqueta: 'Arepas Servidas' },
      ],
      fields: [
        {
          name: 'numero',
          type: 'text',
          label: 'Cifra o Número (ej. 10+, 4.9 ★)',
          required: true,
        },
        {
          name: 'etiqueta',
          type: 'text',
          label: 'Etiqueta Descriptiva',
          required: true,
        },
      ],
    },
    {
      name: 'imagen1',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Principal Grande (Vertical)',
      required: false,
    },
    {
      name: 'imagen2',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Secundaria Superior',
      required: false,
    },
    {
      name: 'imagen3',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Secundaria Inferior',
      required: false,
    },
  ],
}
