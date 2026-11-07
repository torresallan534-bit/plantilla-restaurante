import type { GlobalConfig } from 'payload'
import { anyoneCanRead, isSuperAdmin } from '../access/roles'

export const ThemeBranding: GlobalConfig = {
  slug: 'theme-branding',
  label: 'Branding y Tema (SuperAdmin)',
  admin: {
    group: 'Control Maestro',
    hidden: ({ user }) => user?.role !== 'superadmin',
  },
  access: {
    read: anyoneCanRead,
    update: isSuperAdmin,
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
        description: 'Color primario de la marca (botones principales, acentos destacados).',
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
        description: 'Color secundario (insignias, estrellas, detalles de contraste).',
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
        description: 'Fondo de la página (recomendado tono crema suave o neutro).',
      },
    },
    {
      name: 'surfaceColor',
      type: 'text',
      label: 'Color de Tarjetas y Superficies (Hex)',
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
      label: 'Logo Oficial (Subir archivo)',
    },
    {
      name: 'logoUrl',
      type: 'text',
      label: 'Ruta o URL del Logo (Fallback)',
      defaultValue: '/logo/logo.svg',
      admin: {
        description: 'Ruta local estática o URL del logo.',
      },
    },
  ],
}
