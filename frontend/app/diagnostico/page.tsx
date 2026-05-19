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
import { enviarRelato } from '@/lib/api'

const ACCIONES_SIDEBAR = [
  { label: '→ Ver mi ruta de denuncia',     href: '/ruta'       },
  { label: '→ Redactar queja formal',       href: '/relato'     },
  { label: '→ Ver checklist de evidencia',  href: '/evidencia'  },
  { label: '→ Ir a Biblioteca de derechos', href: '/biblioteca' },
]

export default function PaginaDiagnostico() {
  const { relato, casoId, setCasoId } = useRelato()
  const [listo, setListo] = useState(false)
  const [respuesta, setRespuesta] = useState('')
  const [nivelRiesgo, setNivelRiesgo] = useState('')

  // useEffect para simular latencia de la API de IA.
  // El array vacío garantiza que corre solo al montar el componente.
  useEffect(() => {
    // Función interna asíncrona
  const realizarDiagnostico = async () => {
    try {
      // Se llama a la API pasando el relato
      const data = await enviarRelato({ relato_usuario:relato })
      // Si hay respuesta del backend
      if (data.caso_id) {
        setCasoId(data.caso_id);
      }

      if (data.resumen_orientacion) {
        setRespuesta(data.resumen_orientacion);
      }

      if (data.nivel_vpmrg) {
        setNivelRiesgo(data.nivel_vpmrg);
      }
      setListo(true);
    } catch (error) {
      console.error("Error al conectar con el backend:", error)
      setListo(true);
    }
  };

  // Si hay relato, se ejecuta la función
  if (relato) {
    realizarDiagnostico();
  } else {
    setListo(true);
  }
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

          {nivelRiesgo && (
            <div className="alerta-riesgo" style={{
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: 'var(--rojo-claro, #fdf2f2)',
              borderLeft: '5px solid var(--rojo, #de350b)',
              marginBottom: '20px'
            }}>
            <strong>Nivel de riesgo identificado:</strong> {nivelRiesgo}
          </div>
        )}

          <div className="section-label">Análisis de la IA</div>
          <div className="respuesta-box">
            {respuesta || "No se recibió respuesta del análisis."}
          </div>

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
              <span aria-hidden="true"></span>
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
