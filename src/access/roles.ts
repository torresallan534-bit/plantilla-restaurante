import type { Access } from 'payload'

export type UserRole = 'superadmin' | 'admin'

export const isSuperAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'superadmin')
}

export const isAdminOrSuperAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'superadmin' || user.role === 'admin'
}

export const anyoneCanRead: Access = () => true
