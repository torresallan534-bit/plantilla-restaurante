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
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Plato o Bebida',
      required: true,
      admin: {
        placeholder: 'Ej. Arepa Paisa Suprema con Chicharrón',
      },
    },
    {
      name: 'precio',
      type: 'number',
      label: 'Precio Base ($)',
      required: true,
      min: 0,
      admin: {
        placeholder: 'Ej. 22000',
        description: 'Valor base del producto en moneda local (ej. COP o USD).',
      },
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
      name: 'categoria',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categoría del Menú',
      required: true,
      hasMany: false,
    },
    {
      name: 'disponible',
      type: 'checkbox',
      label: 'Disponible para Pedidos (Interruptor de Agotado)',
      defaultValue: true,
      admin: {
        description: 'Desmarcar para marcar automáticamente como Agotado en la web y deshabilitar compras.',
      },
    },
    {
      name: 'destacado',
      type: 'checkbox',
      label: 'Plato Estrella / Destacado',
      defaultValue: false,
      admin: {
        description: 'Muestra una insignia dorada "Favorito" en el menú.',
      },
    },
    {
      name: 'gruposOpciones',
      type: 'array',
      label: 'Grupos de Opciones / Sabores / Variantes',
      admin: {
        description:
          'Configura opciones para que el cliente elija (ej. Sabores de jugo, Bebida del combo, Término de carne, Salsas, o Combos de N piezas).',
      },
      fields: [
        {
          name: 'titulo',
          type: 'text',
          label: 'Título del Grupo (ej. Elige el Sabor, Elige tus 4 empanadas, Salsa)',
          required: true,
          admin: {
            placeholder: 'Ej. Elige tus 4 empanadas',
          },
        },
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
            description:
              'Define si el cliente elige solo 1 opción o si es un combo con una cantidad específica de unidades repartidas.',
          },
        },
        {
          name: 'limiteSeleccion',
          type: 'number',
          label: 'Límite / Cantidad a Elegir',
          defaultValue: 1,
          min: 1,
          admin: {
            condition: (data, siblingData) => siblingData?.tipoSeleccion === 'multiple',
            placeholder: '4',
            description:
              'Cantidad máxima de unidades que el cliente puede repartir entre las opciones del combo (ej. 4 empanadas).',
          },
        },
        {
          name: 'requerido',
          type: 'checkbox',
          label: 'Selección Obligatoria',
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
}
