'use client'

// app/diagnostico/page.tsx  →  /diagnostico
// Muestra el análisis IA del relato de la usuaria.
// Lee el relato desde el contexto global (RelatoContext).
// Simula carga con IA; en producción consumiría el endpoint de FastAPI.

import type { Metadata } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRelato } from '@/context/RelatoContext'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import {
  CONDUCTAS,
  DERECHOS,
  INSTITUCIONES_DIAGNOSTICO,
} from '@/lib/constants'

const ACCIONES_SIDEBAR = [
  { label: '→ Ver mi ruta de denuncia',     href: '/ruta'       },
  { label: '→ Redactar queja formal',       href: '/relato'     },
  { label: '→ Ver checklist de evidencia',  href: '/evidencia'  },
  { label: '→ Ir a Biblioteca de derechos', href: '/biblioteca' },
]

export default function PaginaDiagnostico() {
  const { relato }      = useRelato()
  const [listo, setListo] = useState(false)

  // useEffect para simular latencia de la API de IA.
  // El array vacío garantiza que corre solo al montar el componente.
  useEffect(() => {
    const timer = setTimeout(() => setListo(true), 1600)
    return () => clearTimeout(timer)
  }, [])

  const breadcrumbItems = [
    { label: 'Inicio',       href: '/'     },
    { label: 'Diagnóstico IA'              },
  ]

  if (!listo) {
    return (
      <div className="page">
        <div className="loading-box" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          Analizando tu relato con IA…
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Resultado del análisis de tu situación</h1>
      <p className="page-subtitle">
        Basado en el relato que compartiste, la IA identificó lo siguiente:
      </p>
      <hr className="div" />

      <div className="diag-layout">
        {/* ── Columna principal ── */}
        <div>
          <div className="section-label">Tu relato</div>
          <blockquote className="relato-box">
            &ldquo;{relato || 'Cuéntame lo que pasó… — texto ingresado por la usuaria.'}&rdquo;
          </blockquote>

          <div className="section-label">Conductas identificadas</div>
          <ul className="conductas-grid" aria-label="Conductas identificadas">
            {CONDUCTAS.map((c) => (
              <li key={c} className="conducta-chip">{c}</li>
            ))}
          </ul>

          <div className="section-label">Derechos vulnerados</div>
          <ul className="derechos-list">
            {DERECHOS.map((d) => <li key={d}>{d}</li>)}
          </ul>

          <div className="section-label">Instituciones competentes</div>
          {INSTITUCIONES_DIAGNOSTICO.map((inst) => (
            <div className="inst-item" key={inst.nombre}>
              <div>
                <div className="inst-nombre">{inst.nombre}</div>
                <div className="inst-desc">{inst.desc}</div>
              </div>
              <Link href="/directorio" className="link-ver">
                Ver →
              </Link>
            </div>
          ))}
        </div>

        {/* ── Sidebar de acciones ── */}
        <aside>
          <div className="sidebar-box">
            <h2 className="sidebar-h2">Próximos pasos</h2>
            <p>Selecciona la acción que deseas tomar a continuación:</p>
            <hr className="div" />
            <nav className="sidebar-actions" aria-label="Acciones disponibles">
              {ACCIONES_SIDEBAR.map((a) => (
                <Link key={a.href} href={a.href} className="btn-sidebar">
                  {a.label}
                </Link>
              ))}
            </nav>
            <div className="aviso-small">
              <span aria-hidden="true">⚠️</span>
              <span>Esta orientación es inicial y no sustituye la asesoría jurídica.</span>
            </div>
          </div>
        </aside>
      </div>

      <AvisoLegal />
      <div style={{ marginTop: 20 }}>
        <Link href="/" className="btn-back">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  )
}
