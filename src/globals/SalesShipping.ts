import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isStaff } from '../access/roles'

export const SalesShipping: GlobalConfig = {
  slug: 'sales-shipping',
  label: 'Configuración de Ventas, Envíos y Carrito',
  admin: {
    group: '🛵 Pedidos y Despachos',
  },
  access: {
    read: anyoneCanRead,
    update: isStaff, // SuperAdmin y Admin (Cliente) pueden editar
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ====================================================================
        // PESTAÑA 1: IDENTIDAD DEL RESTAURANTE & WHATSAPP
        // ====================================================================
        {
          label: '🌐 Sitio Web & WhatsApp',
          description: 'Configura el nombre del restaurante, título para el navegador y número de pedidos.',
          fields: [
            {
              name: 'nombreRestaurante',
              type: 'text',
              label: 'Nombre Comercial del Restaurante',
              required: true,
              defaultValue: 'Panda Arepas & Grill',
              admin: {
                placeholder: 'Ej. Panda Arepas & Grill',
              },
            },
            {
              name: 'tituloSitioWeb',
              type: 'text',
              label: 'Título de la Página Web (Pestaña del Navegador / SEO)',
              defaultValue: 'Panda Arepas & Grill | Menú Digital & Pedidos por WhatsApp',
              admin: {
                description: 'Nombre visible en la pestaña del navegador de tus clientes y en Google.',
                placeholder: 'Ej. Mi Restaurante | Menú Digital & Domicilios',
              },
            },
            {
              name: 'descripcionSitioWeb',
              type: 'textarea',
              label: 'Descripción de la Página Web (SEO / Google)',
              defaultValue:
                'Sabor auténtico y artesanal. Pide tu domicilio directamente a nuestro WhatsApp oficial.',
              admin: {
                description: 'Resumen descriptivo que aparecerá en buscadores y enlaces compartidos.',
              },
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
          ],
        },

        // ====================================================================
        // PESTAÑA 2: MODALIDAD DE DOMICILIOS
        // ====================================================================
        {
          label: '🛵 Domicilios y Envíos',
          description: 'Define si el envío tiene un costo fijo o se acuerda con el repartidor.',
          fields: [
            {
              name: 'tipoDomicilio',
              type: 'select',
              label: 'Modalidad de Costo de Domicilio',
              defaultValue: 'fijo',
              required: true,
              options: [
                {
                  label: 'Tarifa Fija de Envío (Se suma numéricamente al total)',
                  value: 'fijo',
                },
                {
                  label: 'A convenir con el domiciliario (Texto informativo en el carrito)',
                  value: 'a_convenir',
                },
              ],
              admin: {
                description:
                  'Elige si cobras un valor fijo estándar o si el costo se define directamente con el repartidor.',
              },
            },
            {
              name: 'costoDomicilio',
              type: 'number',
              label: 'Costo Fijo de Domicilio ($)',
              min: 0,
              defaultValue: 5000,
              admin: {
                condition: (data) => data?.tipoDomicilio !== 'a_convenir',
                placeholder: '5000',
                description: 'Valor del envío sumado automáticamente al subtotal en el carrito y WhatsApp.',
              },
            },
            {
              name: 'textoDomicilioPersonalizado',
              type: 'text',
              label: 'Mensaje de Domicilio a Convenir',
              defaultValue: 'El precio se determina con el domiciliario',
              admin: {
                condition: (data) => data?.tipoDomicilio === 'a_convenir',
                placeholder: 'Ej. El precio se determina con el domiciliario',
                description: 'Texto que se mostrará en lugar del valor numérico en el carrito y WhatsApp.',
              },
            },
          ],
        },

        // ====================================================================
        // PESTAÑA 3: FORMULARIO DEL CARRITO (CHECKOUT 100% EDITABLE)
        // ====================================================================
        {
          label: '📋 Formulario del Carrito',
          description: 'Personaliza los textos, etiquetas y campos del formulario de pedidos antes de enviar a WhatsApp.',
          fields: [
            {
              name: 'tituloFormularioCheckout',
              type: 'text',
              label: 'Título del Formulario en el Carrito',
              defaultValue: 'Datos de Entrega Inmediata',
              admin: {
                description: 'Texto del encabezado que aparece sobre los campos de entrega.',
              },
            },
            // Campo Nombre
            {
              type: 'row',
              fields: [
                {
                  name: 'labelNombre',
                  type: 'text',
                  label: 'Etiqueta del Campo Nombre',
                  defaultValue: 'Tu Nombre Completo *',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'placeholderNombre',
                  type: 'text',
                  label: 'Ejemplo / Placeholder Nombre',
                  defaultValue: 'Ej. Juan Pérez',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            // Campo Teléfono
            {
              name: 'pedirTelefonoCliente',
              type: 'checkbox',
              label: 'Solicitar Teléfono del Cliente en el Carrito',
              defaultValue: true,
              admin: {
                description: 'Habilita un campo para que el cliente ingrese su número de contacto en el pedido.',
              },
            },
            {
              type: 'row',
              admin: {
                condition: (data) => Boolean(data?.pedirTelefonoCliente !== false),
              },
              fields: [
                {
                  name: 'labelTelefono',
                  type: 'text',
                  label: 'Etiqueta del Campo Teléfono',
                  defaultValue: 'Teléfono / WhatsApp de Contacto *',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'placeholderTelefono',
                  type: 'text',
                  label: 'Ejemplo / Placeholder Teléfono',
                  defaultValue: 'Ej. 300 123 4567',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            // Campo Dirección
            {
              type: 'row',
              fields: [
                {
                  name: 'labelDireccion',
                  type: 'text',
                  label: 'Etiqueta del Campo Dirección',
                  defaultValue: 'Dirección de Entrega *',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'placeholderDireccion',
                  type: 'text',
                  label: 'Ejemplo / Placeholder Dirección',
                  defaultValue: 'Ej. Cra 15 # 85-30 Apto 402',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            // Campo Notas
            {
              name: 'pedirNotas',
              type: 'checkbox',
              label: 'Habilitar Campo de Notas / Instrucciones Especiales',
              defaultValue: true,
            },
            {
              type: 'row',
              admin: {
                condition: (data) => Boolean(data?.pedirNotas !== false),
              },
              fields: [
                {
                  name: 'labelNotas',
                  type: 'text',
                  label: 'Etiqueta del Campo Notas',
                  defaultValue: 'Notas opcionales (salsas aparte, cubiertos, etc.)',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'placeholderNotas',
                  type: 'text',
                  label: 'Ejemplo / Placeholder Notas',
                  defaultValue: 'Ej. Salsa de ajo aparte, timbre averiado',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            // Métodos de Pago
            {
              name: 'habilitarMetodosPago',
              type: 'checkbox',
              label: 'Habilitar Selección de Método de Pago en el Carrito',
              defaultValue: true,
            },
            {
              name: 'labelMetodosPago',
              type: 'text',
              label: 'Etiqueta para Métodos de Pago',
              defaultValue: 'Método de Pago *',
              admin: {
                condition: (data) => Boolean(data?.habilitarMetodosPago !== false),
              },
            },
            {
              name: 'metodosPago',
              type: 'array',
              label: 'Métodos de Pago Disponibles',
              defaultValue: [
                { nombre: 'Efectivo contra entrega' },
                { nombre: 'Transferencia Nequi / Daviplata' },
                { nombre: 'Datáfono / Tarjeta a domicilio' },
              ],
              admin: {
                condition: (data) => Boolean(data?.habilitarMetodosPago !== false),
              },
              fields: [
                {
                  name: 'nombre',
                  type: 'text',
                  label: 'Nombre del Método de Pago',
                  required: true,
                },
              ],
            },
            // Botón y Pie
            {
              name: 'textoBotonCheckout',
              type: 'text',
              label: 'Texto del Botón de Envío',
              defaultValue: 'Enviar Pedido por WhatsApp',
            },
            {
              name: 'pieDePaginaCheckout',
              type: 'text',
              label: 'Texto al Pie del Carrito (Mensaje de Confianza)',
              defaultValue: 'Pedido directo sin intermediarios ni cargos de servicio.',
            },
          ],
        },

        // ====================================================================
        // PESTAÑA 4: SEDE FÍSICA Y HORARIOS
        // ====================================================================
        {
          label: '📍 Sede y Horarios',
          description: 'Ubicación física y horarios de atención al público.',
          fields: [
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
        },
      ],
    },
  ],
}
