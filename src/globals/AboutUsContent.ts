import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isAdminOrSuperAdmin } from '../access/roles'

export const AboutUsContent: GlobalConfig = {
  slug: 'about-us-content',
  label: 'Sección Conócenos (Bento Grid)',
  admin: {
    group: 'Contenido Web',
  },
  access: {
    read: anyoneCanRead,
    update: isAdminOrSuperAdmin,
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
          label: 'Número o Métrica',
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
      name: 'imagen1Url',
      type: 'text',
      label: 'URL de Imagen Principal Bento',
      defaultValue: '/images/arepas-1.jpg',
    },
    {
      name: 'imagen2Url',
      type: 'text',
      label: 'URL de Imagen Secundaria Bento',
      defaultValue: '/images/arepas-2.jpg',
    },
    {
      name: 'imagen3Url',
      type: 'text',
      label: 'URL de Imagen Detalle Bento',
      defaultValue: '/images/arepas-3.jpg',
    },
  ],
}
