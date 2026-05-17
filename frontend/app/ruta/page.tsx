'use client'

// app/ruta/page.tsx  →  /ruta
// Ruta de denuncia cronológica. Cada paso puede marcarse como completado.

import { useState } from 'react'
import Link from 'next/link'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { RUTA_PASOS } from '@/lib/constants'

export default function PaginaRuta() {
  // Set de índices de pasos completados
  const [completados, setCompletados] = useState<Set<number>>(new Set())

  const togglePaso = (index: number) => {
    setCompletados((prev) => {
      const siguiente = new Set(prev)
      siguiente.has(index) ? siguiente.delete(index) : siguiente.add(index)
      return siguiente
    })
  }

  const breadcrumbItems = [
    { label: 'Inicio',       href: '/'             },
    { label: 'Diagnóstico',  href: '/diagnostico'  },
    { label: 'Ruta institucional'                   },
  ]

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Tu ruta de denuncia (F04)</h1>
      <p className="page-subtitle">
        Acciones cronológicas que debes tomar para iniciar tu proceso de denuncia.
        Haz clic en el número de cada paso para marcarlo como completado.
      </p>
      <hr className="div" />

      <div className="ruta-meta">
        <span className="ruta-label">
          Ruta personalizada — {RUTA_PASOS.length} pasos
        </span>
        <span className="ruta-count">
          {completados.size} de {RUTA_PASOS.length} completados
        </span>
      </div>

      <ol className="ruta-lista" aria-label="Pasos de la ruta de denuncia">
        {RUTA_PASOS.map((paso, i) => {
          const esCompletado = completados.has(i)
          return (
            <li className="ruta-step" key={i}>
              <button
                className={`step-num ${esCompletado ? 'completado' : ''}`}
                onClick={() => togglePaso(i)}
                aria-label={
                  esCompletado
                    ? `Desmarcar paso ${i + 1}`
                    : `Marcar paso ${i + 1} como completado`
                }
                title={esCompletado ? 'Marcar como pendiente' : 'Marcar como completado'}
              >
                {esCompletado ? '✓' : i + 1}
              </button>
              <div>
                <div className={`step-titulo ${esCompletado ? 'completado' : ''}`}>
                  {paso.titulo}
                </div>
                <div className="step-desc">{paso.desc}</div>
                {paso.linkLabel && paso.linkTo && (
                  <Link href={paso.linkTo} className="step-link">
                    {paso.linkLabel}
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="nav-bottom">
        <Link href="/diagnostico" className="btn-back">
          ← Volver al diagnóstico
        </Link>
        <Link href="/relato" className="btn-next">
          Redactar queja formal →
        </Link>
      </div>

      <AvisoLegal />
    </div>
  )
}
