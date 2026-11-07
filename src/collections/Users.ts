import type { CollectionConfig } from 'payload'
import { isSuperAdmin, isAdminOrSuperAdmin } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    create: isSuperAdmin,
    read: isAdminOrSuperAdmin,
    update: ({ req: { user }, id }) => {
      if (user?.role === 'superadmin') return true
      return user?.id === id
    },
    delete: isSuperAdmin,
    admin: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'superadmin' || user.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre Completo',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol de Usuario',
      required: true,
      defaultValue: 'admin',
      options: [
        {
          label: 'Super Admin (Control Total)',
          value: 'superadmin',
        },
        {
          label: 'Admin (Gestión de Menú y Contenido)',
          value: 'admin',
        },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'superadmin',
      },
    },
  ],
}
