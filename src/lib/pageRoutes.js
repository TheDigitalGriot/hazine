/** Shared base-aware route resolution; pure so repository-base refreshes are testable. */
export const componentRoutes = ['workbench', 'design-system', 'specification']
export function resolvePage(pathname, base = '/') {
  const prefix = `/${base.replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '')
  const path = pathname.replace(/\/+$/, '')
  for (const route of componentRoutes) {
    const target = `${prefix}/${route}`
    if (path === target || path.startsWith(`${target}/`)) return route
  }
  return 'landing'
}
