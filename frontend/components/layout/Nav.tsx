'use client'

// components/layout/Nav.tsx
// Client Component: necesita usePathname para marcar el enlace activo.
// El resto del layout (RootLayout) es Server Component.

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, DIAGNOSTICO_GRUPO } from '@/lib/constants'

export default function Nav() {
  const pathname = usePathname()

  const isActivo = (href: string): boolean => {
    if (href === '/') return pathname === '/'
    // Diagnóstico agrupa también /ruta y /relato
    if (href === '/diagnostico') {
      return DIAGNOSTICO_GRUPO.some((ruta) => pathname.startsWith(ruta))
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="nav">
      <Link href="/" className="nav-brand">
        Plataforma VPMRG
      </Link>
      <nav aria-label="Navegación principal" className="nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`nav-link ${isActivo(item.href) ? 'active' : ''}`}
            aria-current={isActivo(item.href) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
