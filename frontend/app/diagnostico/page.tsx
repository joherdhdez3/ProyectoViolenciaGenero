'use client'

// app/diagnostico/page.tsx  →  /diagnostico
// Muestra el análisis IA del relato de la usuaria.
// Las conductas y derechos provienen del backend (no son datos hardcoded).

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRelato } from '@/context/RelatoContext'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { INSTITUCIONES_DIAGNOSTICO } from '@/lib/constants'
import { enviarRelato } from '@/lib/api'

const ACCIONES_SIDEBAR = [
  { label: '→ Ver mi ruta de denuncia',     href: '/ruta'       },
  { label: '→ Redactar queja formal',       href: '/relato'     },
  { label: '→ Ver checklist de evidencia',  href: '/evidencia'  },
  { label: '→ Ir a Biblioteca de derechos', href: '/biblioteca' },
]

const NIVEL_CONFIG: Record<string, { etiqueta: string; fondo: string; borde: string; texto: string }> = {
  alto: {
    etiqueta: 'Riesgo ALTO',
    fondo:    '#fdf2f2',
    borde:    '#dc2626',
    texto:    '#7f1d1d',
  },
  medio: {
    etiqueta: 'Riesgo MEDIO',
    fondo:    '#fffbeb',
    borde:    '#d97706',
    texto:    '#78350f',
  },
  bajo: {
    etiqueta: 'Riesgo BAJO',
    fondo:    '#f0fdf4',
    borde:    '#16a34a',
    texto:    '#14532d',
  },
  no_identificado: {
    etiqueta: 'No identificado',
    fondo:    '#f8fafc',
    borde:    '#94a3b8',
    texto:    '#475569',
  },
}

export default function PaginaDiagnostico() {
  const { relato, casoId, setCasoId } = useRelato()
  const [listo, setListo]             = useState(false)
  const [error, setError]             = useState(false)
  const [respuesta, setRespuesta]     = useState('')
  const [nivelRiesgo, setNivelRiesgo] = useState('')
  // Conductas y derechos vienen de la IA, no de constantes fijas
  const [conductas, setConductas]     = useState<string[]>([])
  const [derechos, setDerechos]       = useState<string[]>([])

  useEffect(() => {
    const realizarDiagnostico = async () => {
      if (!relato) {
        setListo(true)
        return
      }
      try {
        const data = await enviarRelato({ relato_usuario: relato })
        if (data.caso_id)            setCasoId(data.caso_id)
        if (data.resumen_orientacion) setRespuesta(data.resumen_orientacion)
        if (data.nivel_vpmrg)        setNivelRiesgo(data.nivel_vpmrg)
        if (Array.isArray(data.conductas))          setConductas(data.conductas)
        if (Array.isArray(data.derechos_vulnerados)) setDerechos(data.derechos_vulnerados)
      } catch (err) {
        console.error('Error al conectar con el backend:', err)
        setError(true)
      } finally {
        setListo(true)
      }
    }
    realizarDiagnostico()
  }, [relato, setCasoId])

  const breadcrumbItems = [
    { label: 'Inicio',       href: '/'     },
    { label: 'Diagnóstico IA'              },
  ]

  if (!listo) {
    return (
      <div className="page">
        <div className="loading-box" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          Analizando tu relato con IA… esto puede tardar unos segundos.
        </div>
      </div>
    )
  }

  const nivelCfg = NIVEL_CONFIG[(nivelRiesgo || '').toLowerCase()] ?? NIVEL_CONFIG['no_identificado']

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Resultado del análisis de tu situación</h1>
      <p className="page-subtitle">
        Basado en el relato que compartiste, la IA identificó lo siguiente:
      </p>
      <hr className="div" />

      {/* Alerta de error de conexión */}
      {error && (
        <div role="alert" style={{
          padding: '14px 18px',
          borderRadius: '8px',
          backgroundColor: '#fffbeb',
          borderLeft: '5px solid #d97706',
          marginBottom: '20px',
          fontSize: '14px',
          color: '#78350f',
        }}>
          <strong>⚠️ Sin conexión con el servidor.</strong> Se muestra una vista parcial.
          Verifica que el backend esté activo y vuelve a intentarlo.
        </div>
      )}

      <div className="diag-layout">
        {/* ── Columna principal ── */}
        <div>
          {/* Relato */}
          {relato && (
            <>
              <div className="section-label">Tu relato</div>
              <blockquote className="relato-box">
                &ldquo;{relato}&rdquo;
              </blockquote>
            </>
          )}

          {/* Nivel de riesgo */}
          {nivelRiesgo && (
            <div style={{
              padding: '14px 18px',
              borderRadius: '8px',
              backgroundColor: nivelCfg.fondo,
              borderLeft: `5px solid ${nivelCfg.borde}`,
              marginBottom: '20px',
              color: nivelCfg.texto,
            }}>
              <strong>Nivel de riesgo identificado: {nivelCfg.etiqueta}</strong>
            </div>
          )}

          {/* Análisis narrativo */}
          {respuesta && (
            <>
              <div className="section-label">Análisis de la IA</div>
              <div className="respuesta-box">{respuesta}</div>
            </>
          )}

          {/* Conductas — vienen de la IA */}
          {conductas.length > 0 && (
            <>
              <div className="section-label">Conductas identificadas</div>
              <ul className="conductas-grid" aria-label="Conductas identificadas">
                {conductas.map((c) => (
                  <li key={c} className="conducta-chip">{c}</li>
                ))}
              </ul>
            </>
          )}

          {/* Derechos — vienen de la IA */}
          {derechos.length > 0 && (
            <>
              <div className="section-label">Derechos vulnerados</div>
              <ul className="derechos-list">
                {derechos.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </>
          )}

          {/* Mensaje si no hubo relato */}
          {!relato && !error && (
            <div style={{ padding: '20px', color: 'var(--gris)', textAlign: 'center' }}>
              <p>No se encontró un relato activo.</p>
              <Link href="/" className="btn-back" style={{ marginTop: 12, display: 'inline-block' }}>
                ← Volver al inicio para ingresar tu relato
              </Link>
            </div>
          )}

          <div className="section-label">Instituciones competentes</div>
          {INSTITUCIONES_DIAGNOSTICO.map((inst) => (
            <div className="inst-item" key={inst.nombre}>
              <div>
                <div className="inst-nombre">{inst.nombre}</div>
                <div className="inst-desc">{inst.desc}</div>
              </div>
              <Link href="/directorio" className="link-ver">Ver →</Link>
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
              <span aria-hidden="true">⚖️</span>
              <span>Esta orientación es inicial y no sustituye la asesoría jurídica profesional.</span>
            </div>
          </div>
        </aside>
      </div>

      <AvisoLegal />
      <div style={{ marginTop: 20 }}>
        <Link href="/" className="btn-back">← Volver al inicio</Link>
      </div>
    </div>
  )
}
