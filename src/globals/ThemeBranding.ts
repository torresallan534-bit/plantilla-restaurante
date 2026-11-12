import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isSuperAdmin } from '../access/roles'

export const ThemeBranding: GlobalConfig = {
  slug: 'theme-branding',
  label: 'Branding y Tema (SuperAdmin)',
  admin: {
    group: '🎨 Identidad Visual (Agencia)',
    // Oculto completamente del menú si el usuario NO es superadmin
    hidden: ({ user }) => user?.role !== 'superadmin',
  },
  access: {
    read: anyoneCanRead, // Lectura pública para inyectar CSS variables en Next.js
    update: isSuperAdmin, // Solo SuperAdmin puede modificar colores o marca
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🖼️ Logotipo Oficial',
          description: 'Sube el archivo de logo principal de la marca.',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo Oficial (Subir Archivo a Media)',
              required: false,
              admin: {
                description: 'Sube tu archivo de logo (.svg, .webp o .png).',
              },
            },
          ],
        },
        {
          label: '🎨 Paleta de Colores',
          description: 'Colores hexadecimales inyectados en vivo en Tailwind CSS.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryColor',
                  type: 'text',
                  label: 'Color Principal (Hex)',
                  required: true,
                  defaultValue: '#C2410C',
                  admin: {
                    width: '50%',
                    placeholder: '#C2410C',
                    description: 'Color primario (botones de compra, navegación, acentos).',
                  },
                },
                {
                  name: 'secondaryColor',
                  type: 'text',
                  label: 'Color Secundario / Acento (Hex)',
                  required: true,
                  defaultValue: '#D97706',
                  admin: {
                    width: '50%',
                    placeholder: '#D97706',
                    description: 'Color secundario (insignias doradas, calificaciones).',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'backgroundColor',
                  type: 'text',
                  label: 'Color de Fondo General (Hex)',
                  required: true,
                  defaultValue: '#FAF8F5',
                  admin: {
                    width: '33%',
                    placeholder: '#FAF8F5',
                    description: 'Color de fondo del sitio web.',
                  },
                },
                {
                  name: 'surfaceColor',
                  type: 'text',
                  label: 'Color de Superficie / Cards (Hex)',
                  required: true,
                  defaultValue: '#FFFFFF',
                  admin: {
                    width: '33%',
                    placeholder: '#FFFFFF',
                    description: 'Fondo de tarjetas y modales.',
                  },
                },
                {
                  name: 'textColor',
                  type: 'text',
                  label: 'Color de Texto Principal (Hex)',
                  required: true,
                  defaultValue: '#1C1917',
                  admin: {
                    width: '34%',
                    placeholder: '#1C1917',
                    description: 'Color tipográfico de títulos y textos.',
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
