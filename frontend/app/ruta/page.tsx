'use client'

// app/ruta/page.tsx  →  /ruta
// Ruta de denuncia cronológica. Cada paso puede marcarse como completado.
// Mejora: spinner de carga real + mensaje si no hay casoId.

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { RUTA_PASOS } from '@/lib/constants'
import { useRelato } from '@/context/RelatoContext'
import { obtenerRutaInstitucional } from '@/lib/api'

export default function PaginaRuta() {
  const { casoId } = useRelato()
  const [cargando, setCargando]   = useState(true)
  const [rutaData, setRutaData]   = useState<any>(null)
  const [completados, setCompletados] = useState<Set<number>>(new Set())

  const togglePaso = (index: number) => {
    setCompletados((prev) => {
      const siguiente = new Set(prev)
      siguiente.has(index) ? siguiente.delete(index) : siguiente.add(index)
      return siguiente
    })
  }

  useEffect(() => {
    const cargarRuta = async () => {
      if (!casoId) {
        setCargando(false)
        return
      }
      try {
        const data = await obtenerRutaInstitucional(casoId)
        if (data) setRutaData(data)
      } catch (error) {
        console.error('Error al conectar con el backend:', error)
      } finally {
        setCargando(false)
      }
    }
    cargarRuta()
  }, [casoId])

  const pasosAMostrar = rutaData?.pasos || RUTA_PASOS

  const breadcrumbItems = [
    { label: 'Inicio',       href: '/'             },
    { label: 'Diagnóstico',  href: '/diagnostico'  },
    { label: 'Ruta institucional'                   },
  ]

  if (cargando) {
    return (
      <div className="page">
        <div className="loading-box" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          Generando tu ruta personalizada…
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Tu ruta de denuncia</h1>
      <p className="page-subtitle">
        Pasos en orden cronológico para iniciar tu proceso de queja formal.
        Marca cada paso conforme avances.
      </p>
      <hr className="div" />

      {!casoId && (
        <div role="note" style={{
          padding:         '14px 18px',
          borderRadius:    '8px',
          backgroundColor: '#fffbeb',
          borderLeft:      '5px solid #d97706',
          marginBottom:    '20px',
          fontSize:        '14px',
          color:           '#78350f',
        }}>
          <strong>⚠️ Estás viendo la ruta general.</strong> Para obtener una ruta
          personalizada según tu caso, regresa al inicio e ingresa tu relato.
          <Link href="/" style={{ marginLeft: 8, textDecoration: 'underline' }}>Ir al inicio →</Link>
        </div>
      )}

      <div className="ruta-meta">
        <span className="ruta-label">
          {casoId ? 'Ruta personalizada' : 'Ruta general'} — {pasosAMostrar.length} pasos
        </span>
        <span className="ruta-count">
          {completados.size} de {pasosAMostrar.length} completados
        </span>
      </div>

      <ol className="ruta-lista" aria-label="Pasos de la ruta de denuncia">
        {pasosAMostrar.map((paso: any, i: number) => {
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
                  {paso.institucion || paso.titulo}
                </div>
                <div className="step-desc">
                  <strong>Acción:</strong> {paso.accion || paso.desc}
                </div>
                {paso.plazo && (
                  <div className="step-time" style={{ fontSize: '0.85rem', color: 'var(--gris-oscuro)', marginTop: '4px' }}>
                    <strong>Plazo estimado:</strong> {paso.plazo}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="nav-bottom">
        <Link href="/diagnostico" className="btn-back">← Volver al diagnóstico</Link>
        <Link href="/relato" className="btn-next">Redactar queja formal →</Link>
      </div>

      <AvisoLegal />
    </div>
  )
}
