import type { CollectionConfig } from 'payload'
import { isSuperAdmin, isStaff, hasAdminPanelAccess } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        // Garantizar que el primer usuario registrado en la base de datos sea siempre SUPERADMIN
        if (operation === 'create') {
          try {
            const count = await req.payload.count({ collection: 'users' })
            if (count.totalDocs === 0) {
              data.role = 'superadmin'
            }
          } catch (e) {
            data.role = 'superadmin'
          }
        }
        return data
      },
    ],
  },
  access: {
    // Si no hay usuarios aún (pantalla de bienvenida), se permite la creación del primer SuperAdmin
    create: async ({ req }) => {
      if (req.user?.role === 'superadmin') return true
      try {
        const count = await req.payload.count({ collection: 'users' })
        return count.totalDocs === 0
      } catch (e) {
        return true
      }
    },
    read: isStaff,
    update: ({ req: { user }, id }) => {
      if (user?.role === 'superadmin') return true
      return user?.id === id
    },
    delete: isSuperAdmin, // Solo SuperAdmin puede eliminar usuarios
    admin: hasAdminPanelAccess,
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
      defaultValue: 'superadmin',
      options: [
        {
          label: 'Super Admin (Control Absoluto del Sistema)',
          value: 'superadmin',
        },
        {
          label: 'Admin (Cliente / Gestión de Menú y Contenido)',
          value: 'admin',
        },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'superadmin',
      },
    },
  ],
}
