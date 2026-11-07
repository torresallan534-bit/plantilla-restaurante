import type { Access } from 'payload'

export type UserRole = 'superadmin' | 'admin'

/**
 * REGLA 1: SuperAdmin Absoluto
 * Si el usuario autenticado tiene rol 'superadmin', tiene acceso total (TRUE)
 * a Create, Read, Update y Delete en TODAS las colecciones y Globals sin excepción.
 */
export const isSuperAdmin: Access = ({ req: { user } }) => {
  if (user?.role === 'superadmin') return true
  return false
}

/**
 * REGLA 2: Acceso para Staff (SuperAdmin o Admin)
 * Superadmin: Acceso absoluto (true)
 * Admin (Cliente): Acceso permitido a la gestión operativa del restaurante (true)
 */
export const isStaff: Access = ({ req: { user } }) => {
  if (user?.role === 'superadmin') return true
  if (user?.role === 'admin') return true
  return false
}

/**
 * REGLA 3: Lectura Pública y de Staff
 * Permite lectura tanto a la web pública de Next.js como a los usuarios del CMS.
 */
export const anyoneCanRead: Access = () => true

/**
 * REGLA 4: Control de Acceso al Panel de Administración (/admin)
 */
export const hasAdminPanelAccess = ({ req: { user } }: { req: { user?: any } }): boolean => {
  if (user?.role === 'superadmin') return true
  if (user?.role === 'admin') return true
  return false
}
