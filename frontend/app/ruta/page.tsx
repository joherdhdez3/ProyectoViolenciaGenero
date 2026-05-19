'use client'

// app/ruta/page.tsx  →  /ruta
// Ruta de denuncia cronológica. Cada paso puede marcarse como completado.

import { useState, useEffect} from 'react'
import Link from 'next/link'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { RUTA_PASOS } from '@/lib/constants'
import { useRelato } from '@/context/RelatoContext'
import { obtenerRutaInstitucional } from '@/lib/api'

export default function PaginaRuta() {
  // Extracción del casoId del estado global
  const { casoId } = useRelato()

  // Estados locales para controlar la carga y los datos
  const [cargando, setCargando] = useState(true)
  const [rutaData, setRutaData] = useState<any>(null)

  // Set de índices de pasos completados
  const [completados, setCompletados] = useState<Set<number>>(new Set())

  const togglePaso = (index: number) => {
    setCompletados((prev) => {
      const siguiente = new Set(prev)
      siguiente.has(index) ? siguiente.delete(index) : siguiente.add(index)
      return siguiente
    })
  }

  useEffect(() => {
        // Función interna asíncrona
    const cargarRuta = async () => {
      try {
        // Se llama a la API pasando el relato
        const data = await obtenerRutaInstitucional(casoId);
        // Si hay respuesta del backend
        if (data) {
          setRutaData(data);
        }
        setCargando(false)
      } catch (error) {
        console.error("Error al conectar con el backend:", error)
        setCargando(false)
      }
    }

    if (casoId) {
      cargarRuta()
    } else {
      setCargando(false)
    }
  }, [casoId])

  const pasosAMostrar = rutaData?.pasos || RUTA_PASOS

  const breadcrumbItems = [
    { label: 'Inicio',       href: '/'             },
    { label: 'Diagnóstico',  href: '/diagnostico'  },
    { label: 'Ruta institucional'                   },
  ]
  
  if (cargando) {
    return <div className="page"><p>Cargando tu ruta personalizada...</p></div>
  }

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
          Ruta personalizada — {pasosAMostrar.length} pasos
        </span>
        <span className="ruta-count">
          {completados.size} de {pasosAMostrar.length} completados
        </span>
      </div>

      <ol className="ruta-lista" aria-label="Pasos de la ruta de denuncia">
        {pasosAMostrar.map((paso, i) => {
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
