'use client'

// components/ui/Breadcrumb.tsx
import Link from 'next/link'
import { AVISO_LEGAL } from '@/lib/constants'
import type { BreadcrumbItem } from '@/types'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación" className="breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="bc-item">
          {i > 0 && <span className="bc-sep" aria-hidden="true">›</span>}
          {item.href ? (
            <Link href={item.href} className="bc-link">
              {item.label}
            </Link>
          ) : (
            <span className="bc-active" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}

export function AvisoLegal() {
  return (
    <aside className="aviso" role="note" aria-label="Aviso legal">
      <span aria-hidden="true">⚠️</span>
      <span>{AVISO_LEGAL}</span>
    </aside>
  )
}
