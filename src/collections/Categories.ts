import type { CollectionConfig } from 'payload'
import { anyoneCanRead, isStaff, hasAdminPanelAccess } from '../access/roles'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'slug', 'orden'],
  },
  access: {
    read: anyoneCanRead,
    create: isStaff, // SuperAdmin y Admin
    update: isStaff, // SuperAdmin y Admin
    delete: isStaff, // SuperAdmin y Admin
    admin: hasAdminPanelAccess,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre de la Categoría',
      required: true,
      admin: {
        placeholder: 'Ej. Platos Fuertes, Arepas Especiales, Bebidas',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug Identificador (URL)',
      required: true,
      unique: true,
      admin: {
        placeholder: 'ej. arepas-especiales, bebidas',
        description: 'Texto identificador en minúsculas y sin espacios.',
      },
    },
    {
      name: 'icono',
      type: 'select',
      label: 'Ícono Representativo',
      defaultValue: 'utensils',
      options: [
        { label: 'Cubiertos / General (Utensils)', value: 'utensils' },
        { label: 'Fuego / Parrilla (Flame)', value: 'flame' },
        { label: 'Bebidas (Coffee / Cup)', value: 'coffee' },
        { label: 'Estrella / Especial (Sparkles)', value: 'sparkles' },
        { label: 'Corazón / Saludable (Heart)', value: 'heart' },
      ],
    },
    {
      name: 'orden',
      type: 'number',
      label: 'Orden de Aparición',
      defaultValue: 0,
      admin: {
        description: 'Número menor aparece primero en la barra de categorías.',
      },
    },
  ],
}
