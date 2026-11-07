import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isAdminOrSuperAdmin } from '../access/roles'

export const SalesShipping: GlobalConfig = {
  slug: 'sales-shipping',
  label: 'Configuración de Ventas y Envíos',
  admin: {
    group: 'Operación del Restaurante',
  },
  access: {
    read: anyoneCanRead,
    update: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'nombreRestaurante',
      type: 'text',
      label: 'Nombre del Restaurante',
      required: true,
      defaultValue: 'Panda Arepas & Grill',
    },
    {
      name: 'numeroWhatsApp',
      type: 'text',
      label: 'Número de WhatsApp para Pedidos (con indicativo internacional sin +)',
      required: true,
      defaultValue: '573001234567',
      admin: {
        placeholder: 'Ej. 573001234567',
        description: 'Ingresa solo números, sin espacios ni el signo más (+).',
      },
    },
    {
      name: 'mensajePredeterminado',
      type: 'textarea',
      label: 'Encabezado del Mensaje de WhatsApp',
      defaultValue: 'Hola {restaurante}, soy {nombre}, para pedir:',
      admin: {
        description: 'Texto introductorio antes del listado de platos.',
      },
    },
    {
      name: 'costoDomicilio',
      type: 'number',
      label: 'Costo de Domicilio ($)',
      required: true,
      min: 0,
      defaultValue: 5000,
      admin: {
        placeholder: '5000',
        description: 'Valor del envío a domicilio sumado automáticamente en el carrito y WhatsApp.',
      },
    },
    {
      name: 'direccionFisica',
      type: 'text',
      label: 'Dirección del Local / Sede',
      defaultValue: 'Carrera 7 # 68-12, Zona Gourmet',
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
          label: 'Horario',
          required: true,
        },
      ],
    },
  ],
}
