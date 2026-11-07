import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isSuperAdmin } from '../access/roles'

export const ThemeBranding: GlobalConfig = {
  slug: 'theme-branding',
  label: 'Branding y Tema (SuperAdmin)',
  admin: {
    group: 'Control Maestro',
    // Oculto completamente del menú si el usuario NO es superadmin
    hidden: ({ user }) => user?.role !== 'superadmin',
  },
  access: {
    read: anyoneCanRead, // Lectura pública para inyectar CSS variables en Next.js
    update: isSuperAdmin, // Solo SuperAdmin puede modificar colores o marca
  },
  fields: [
    {
      name: 'primaryColor',
      type: 'text',
      label: 'Color Principal (Hex)',
      required: true,
      defaultValue: '#C2410C',
      admin: {
        placeholder: '#C2410C',
        description: 'Color primario de la marca (botones de compra, navegación, acentos).',
      },
    },
    {
      name: 'secondaryColor',
      type: 'text',
      label: 'Color Secundario / Acento (Hex)',
      required: true,
      defaultValue: '#D97706',
      admin: {
        placeholder: '#D97706',
        description: 'Color secundario (insignias, calificaciones, badges dorados).',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Color de Fondo General (Hex)',
      required: true,
      defaultValue: '#FAF8F5',
      admin: {
        placeholder: '#FAF8F5',
        description: 'Color de fondo general de la página web (ej. crema cálido o blanco).',
      },
    },
    {
      name: 'surfaceColor',
      type: 'text',
      label: 'Color de Superficie / Cards (Hex)',
      required: true,
      defaultValue: '#FFFFFF',
      admin: {
        placeholder: '#FFFFFF',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Color de Texto Principal (Hex)',
      required: true,
      defaultValue: '#1C1917',
      admin: {
        placeholder: '#1C1917',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Oficial (Subir Archivo a Media)',
      required: false,
      admin: {
        description: 'Sube tu archivo de logo (.svg, .webp o .png) usando el botón nativo de carga.',
      },
    },
  ],
}
