import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isStaff } from '../access/roles'

export const SalesShipping: GlobalConfig = {
  slug: 'sales-shipping',
  label: 'Configuración de Ventas y Envíos',
  admin: {
    group: 'Operación del Restaurante',
  },
  access: {
    read: anyoneCanRead,
    update: isStaff, // SuperAdmin y Admin pueden editar precios de envío, formulario y WhatsApp
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
      name: 'tituloFormularioCheckout',
      type: 'text',
      label: 'Título del Formulario en el Carrito',
      defaultValue: 'Datos de Entrega Inmediata',
      admin: {
        description: 'Texto del encabezado que aparece sobre los campos de entrega en el carrito.',
      },
    },
    {
      name: 'habilitarMetodosPago',
      type: 'checkbox',
      label: 'Habilitar Selección de Método de Pago en el Carrito',
      defaultValue: true,
      admin: {
        description: 'Permite que el cliente seleccione cómo desea pagar antes de enviar el pedido a WhatsApp.',
      },
    },
    {
      name: 'metodosPago',
      type: 'array',
      label: 'Métodos de Pago Disponibles',
      defaultValue: [
        { nombre: 'Efectivo contra entrega' },
        { nombre: 'Transferencia Nequi / Daviplata' },
        { nombre: 'Datáfono / Tarjeta' },
      ],
      fields: [
        {
          name: 'nombre',
          type: 'text',
          label: 'Nombre del Método de Pago',
          required: true,
        },
      ],
    },
    {
      name: 'pieDePaginaCheckout',
      type: 'text',
      label: 'Texto al Pie del Carrito',
      defaultValue: 'Pedido directo sin intermediarios ni cargos de servicio.',
      admin: {
        description: 'Mensaje de confianza al pie del botón de WhatsApp.',
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
