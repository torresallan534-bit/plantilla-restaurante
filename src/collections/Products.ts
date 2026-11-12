import type { CollectionConfig } from 'payload'
import { anyoneCanRead, isStaff, hasAdminPanelAccess } from '../access/roles'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Producto / Plato',
    plural: 'Productos / Menú',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'precio', 'categoria', 'disponible', 'destacado'],
    group: '🍽️ Menú y Carta',
  },
  access: {
    read: anyoneCanRead,
    create: isStaff, // SuperAdmin y Admin de la tienda
    update: isStaff, // SuperAdmin y Admin de la tienda
    delete: isStaff, // SuperAdmin y Admin de la tienda
    admin: hasAdminPanelAccess,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ====================================================================
        // PESTAÑA 1: INFORMACIÓN BÁSICA DEL PLATO
        // ====================================================================
        {
          label: '🍽️ Información del Plato',
          description: 'Nombre, precio base, categoría, foto y disponibilidad.',
          fields: [
            {
              name: 'nombre',
              type: 'text',
              label: 'Nombre del Plato o Bebida',
              required: true,
              admin: {
                placeholder: 'Ej. Arepa Paisa Suprema con Chicharrón',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'precio',
                  type: 'number',
                  label: 'Precio Base ($)',
                  required: true,
                  min: 0,
                  admin: {
                    width: '50%',
                    placeholder: 'Ej. 22000',
                    description: 'Valor base en moneda local.',
                  },
                },
                {
                  name: 'categoria',
                  type: 'relationship',
                  relationTo: 'categories',
                  label: 'Categoría del Menú',
                  required: true,
                  hasMany: false,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'descripcion',
              type: 'textarea',
              label: 'Descripción Apetitosa',
              required: true,
              admin: {
                placeholder: 'Describe los ingredientes frescos y preparación artesanal...',
              },
            },
            {
              name: 'imagen',
              type: 'upload',
              relationTo: 'media',
              label: 'Fotografía del Producto (Subir Archivo a Media)',
              required: false,
              admin: {
                description: 'Sube la foto del plato directamente a la biblioteca multimedia.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'disponible',
                  type: 'checkbox',
                  label: 'Disponible para Pedidos (Interruptor de Agotado)',
                  defaultValue: true,
                  admin: {
                    width: '50%',
                    description: 'Desmarcar para mostrar cartel de "Agotado" y bloquear compras.',
                  },
                },
                {
                  name: 'destacado',
                  type: 'checkbox',
                  label: 'Plato Estrella / Destacado',
                  defaultValue: false,
                  admin: {
                    width: '50%',
                    description: 'Muestra una insignia dorada "Favorito" en el menú.',
                  },
                },
              ],
            },
          ],
        },

        // ====================================================================
        // PESTAÑA 2: SABORES, OPCIONES Y COMBOS
        // ====================================================================
        {
          label: '✨ Sabores y Combos (Opciones)',
          description: 'Configura si el cliente puede elegir sabores, acompañamientos o armar un combo con un límite de unidades.',
          fields: [
            {
              name: 'gruposOpciones',
              type: 'array',
              label: 'Grupos de Opciones / Sabores / Variantes',
              admin: {
                description:
                  'Añade uno o más grupos de elección (ej. "Elige el Sabor", "Bebida del Combo", "Elige tus 4 empanadas").',
              },
              fields: [
                {
                  name: 'titulo',
                  type: 'text',
                  label: 'Título del Grupo (ej. Elige tus 4 empanadas, Sabor de jugo)',
                  required: true,
                  admin: {
                    placeholder: 'Ej. Elige tus 4 empanadas',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'tipoSeleccion',
                      type: 'select',
                      label: 'Tipo de Selección',
                      defaultValue: 'unica',
                      required: true,
                      options: [
                        {
                          label: 'Opción Única (1 sola elección, ej. Sabor de jugo o término)',
                          value: 'unica',
                        },
                        {
                          label: 'Opción Múltiple / Cantidades de Combo (ej. Elige 4 empanadas)',
                          value: 'multiple',
                        },
                      ],
                      admin: {
                        width: '50%',
                        description: 'Define si el cliente elige 1 opción o reparte varias unidades.',
                      },
                    },
                    {
                      name: 'limiteSeleccion',
                      type: 'number',
                      label: 'Cantidad Máxima a Elegir',
                      defaultValue: 1,
                      min: 1,
                      admin: {
                        width: '50%',
                        condition: (data, siblingData) => siblingData?.tipoSeleccion === 'multiple',
                        placeholder: '4',
                        description: 'Límite de unidades que el cliente puede sumar en este combo.',
                      },
                    },
                  ],
                },
                {
                  name: 'requerido',
                  type: 'checkbox',
                  label: 'Selección Obligatoria para Comprar',
                  defaultValue: true,
                },
                {
                  name: 'opciones',
                  type: 'array',
                  label: 'Opciones / Sabores Disponibles',
                  required: true,
                  fields: [
                    {
                      name: 'nombre',
                      type: 'text',
                      label: 'Nombre de la Opción o Sabor',
                      required: true,
                      admin: {
                        placeholder: 'Ej. Empanada de Pollo, Maracuyá, Coca-Cola',
                      },
                    },
                    {
                      name: 'precioExtra',
                      type: 'number',
                      label: 'Costo Adicional (Opcional, $)',
                      defaultValue: 0,
                      min: 0,
                      admin: {
                        placeholder: '0 si no tiene recargo adicional',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
