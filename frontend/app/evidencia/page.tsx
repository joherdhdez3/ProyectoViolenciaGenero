'use client'

// app/evidencia/page.tsx  →  /evidencia
// Checklist interactivo de evidencia jurídica.

import { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { EVIDENCIA_SECCIONES } from '@/lib/constants'

const TOTAL_ITEMS = EVIDENCIA_SECCIONES.reduce((sum, sec) => sum + sec.items.length, 0)

const breadcrumbItems = [
  { label: 'Inicio',      href: '/'            },
  { label: 'Diagnóstico', href: '/diagnostico' },
  { label: 'Checklist de evidencia'            },
]

export default function PaginaEvidencia() {
  // { "seccionIndex-itemIndex": boolean }
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

  const countChecked  = Object.values(checked).filter(Boolean).length
  const progresoPct   = Math.round((countChecked / TOTAL_ITEMS) * 100)

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Checklist de evidencia jurídica</h1>
      <p className="page-subtitle">
        Guía para reunir los elementos probatorios necesarios para tu queja formal.
        Marca los que ya tienes.
      </p>
      <hr className="div" />

      <div className="consejo-box" role="note">
        <span aria-hidden="true">💡</span>
        <span>
          Consejo jurídico: Entre más pruebas específicas y fechadas reúnas, más
          sólida será tu queja. No es necesario tener todos los elementos, pero sí los
          más relevantes según tu caso.
        </span>
      </div>

      {EVIDENCIA_SECCIONES.map((sec, si) => (
        <section className="ev-sec" key={si} aria-label={sec.titulo}>
          <div className="ev-sec-title">{sec.titulo}</div>
          {sec.items.map((item, ii) => {
            const key       = `${si}-${ii}`
            const isChecked = !!checked[key]
            return (
              <div
                className="ev-item"
                key={key}
                onClick={() => toggle(key)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => e.key === ' ' && toggle(key)}
              >
                <div className={`ev-cb ${isChecked ? 'checked' : ''}`} aria-hidden="true">
                  {isChecked ? '✓' : ''}
                </div>
                <span
                  style={{
                    textDecoration: isChecked ? 'line-through' : 'none',
                    color:          isChecked ? 'var(--gris)'   : undefined,
                  }}
                >
                  {item}
                </span>
              </div>
            )
          })}
        </section>
      ))}

      {/* ── Barra de progreso ── */}
      <div>
        <strong style={{ fontSize: 13.5 }}>Progreso de evidencia:</strong>
        <div
          className="progreso-wrap"
          role="progressbar"
          aria-valuenow={progresoPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${countChecked} de ${TOTAL_ITEMS} elementos recopilados`}
        >
          <div className="progreso-bar" style={{ width: `${progresoPct}%` }} />
        </div>
        <div className="progreso-label">
          {countChecked} de {TOTAL_ITEMS} elementos
        </div>
      </div>

      <div className="nav-bottom">
        <Link href="/diagnostico" className="btn-back">
          ← Volver al diagnóstico
        </Link>
        <Link href="/relato" className="btn-next">
          Continuar: Redactar queja →
        </Link>
      </div>

      <AvisoLegal />
    </div>
  )
}
