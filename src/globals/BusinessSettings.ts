import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isAdminOrSuperAdmin } from '../access/roles'

export const BusinessSettings: GlobalConfig = {
  slug: 'business-settings',
  label: 'Configuración del Negocio',
  access: {
    read: anyoneCanRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Datos Generales & WhatsApp',
          fields: [
            {
              name: 'nombreRestaurante',
              type: 'text',
              label: 'Nombre del Restaurante',
              required: true,
              defaultValue: 'Panda Haus Grill & Arepas',
            },
            {
              name: 'eslogan',
              type: 'text',
              label: 'Eslogan Principal (Hero)',
              defaultValue: 'Tradición artesanal, sabor inolvidable hecho al carbón.',
            },
            {
              name: 'numeroWhatsApp',
              type: 'text',
              label: 'Número de WhatsApp para Pedidos (con indicativo internacional sin +)',
              required: true,
              defaultValue: '573001234567',
              admin: {
                placeholder: 'Ej. 573001234567 (57 para Colombia)',
                description: 'Ingresa solo números, sin espacios ni el signo más (+).',
              },
            },
            {
              name: 'mensajePredeterminadoWhatsApp',
              type: 'textarea',
              label: 'Mensaje de Saludo Predeterminado',
              defaultValue: 'Hola {restaurante}, soy {cliente}, para pedir lo siguiente:',
              admin: {
                description: 'Estructura base utilizada por el carrito para despachar pedidos.',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo Oficial (Subir archivo)',
            },
            {
              name: 'logoUrl',
              type: 'text',
              label: 'Ruta Local de Logo (Fallback)',
              defaultValue: '/logo/logo.svg',
              admin: {
                description: 'Ruta local directa como /logo/logo.svg o /logo/Logo.webp',
              },
            },
          ],
        },
        {
          label: 'Horarios & Ubicación',
          fields: [
            {
              name: 'direccionFisica',
              type: 'text',
              label: 'Dirección del Local / Sede Principal',
              defaultValue: 'Calle Gourmet 45 # 12-34, Zona Gastronómica',
            },
            {
              name: 'horarios',
              type: 'array',
              label: 'Horarios de Atención',
              defaultValue: [
                { dias: 'Lunes a Jueves', horas: '11:30 AM - 9:30 PM' },
                { dias: 'Viernes y Sábados', horas: '11:30 AM - 11:00 PM' },
                { dias: 'Domingos y Festivos', horas: '12:00 PM - 9:00 PM' },
              ],
              fields: [
                {
                  name: 'dias',
                  type: 'text',
                  label: 'Días',
                  required: true,
                },
                {
                  name: 'horas',
                  type: 'text',
                  label: 'Horas de Servicio',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Sección "Conócenos"',
          fields: [
            {
              name: 'conocenosBadge',
              type: 'text',
              label: 'Insignia Superior (Badge)',
              defaultValue: 'Nuestra Historia & Pasión',
            },
            {
              name: 'conocenosTitulo',
              type: 'text',
              label: 'Título de la Sección',
              defaultValue: 'El Auténtico Arte de la Masa Maestra y el Fuego Lento',
            },
            {
              name: 'conocenosParrafo1',
              type: 'textarea',
              label: 'Párrafo Principal',
              defaultValue: 'Nacimos con una sola obsesión: rescatar el sabor auténtico del maíz peto molido en casa y combinarlo con rellenos generosos, carnes ahumadas al carbón y queso artesanal de campo.',
            },
            {
              name: 'conocenosParrafo2',
              type: 'textarea',
              label: 'Párrafo Secundario',
              defaultValue: 'Cada arepa y plato que sale de nuestra cocina es amasado a mano en el momento. Creemos que la buena comida une a las personas y cada bocado debe despertar memorias de hogar.',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Métricas / Estadísticas Destacadas',
              defaultValue: [
                { numero: '10+', etiqueta: 'Años de Tradición' },
                { numero: '100%', etiqueta: 'Maíz Artesanal' },
                { numero: '4.9★', etiqueta: 'Calificación Clientes' },
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
          ],
        },
      ],
    },
  ],
}
