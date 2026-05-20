'use client'

import { useState, useEffect } from 'react'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { BIBLIO_TABS } from '@/lib/constants'

const breadcrumbItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Biblioteca de derechos' },
]

interface BibliotecaItem {
  tipo: string
  anio: string
  titulo: string
  desc: string
}

export default function PaginaBiblioteca() {
  const [recursos, setRecursos] = useState<BibliotecaItem[]>([])
  const [tabActiva, setTabActiva] = useState('Todas')
  const [query, setQuery] = useState('')
  const [cargando, setCargando] = useState(true)

  // ── ESTADOS NUEVOS PARA EL MODAL DE IA ──
  const [recursoSeleccionado, setRecursoSeleccionado] = useState<BibliotecaItem | null>(null)
  const [explicacionIA, setExplicacionIA] = useState<string>('')
  const [cargandoIA, setCargandoIA] = useState<boolean>(false)

  // Cargar catálogo inicial
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/biblioteca/catalogo')
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con el servidor')
        return res.json()
      })
      .then((data) => {
        setRecursos(data.recursos || [])
        setCargando(false)
      })
      .catch((err) => {
        console.error("Error cargando la biblioteca:", err)
        setCargando(false)
      })
  }, [])

  // ── FUNCIÓN PARA LLAMAR A GROQ AL DAR CLIC EN "VER" ──
  const manejarVerRecurso = async (item: BibliotecaItem) => {
    setRecursoSeleccionado(item)
    setExplicacionIA('')
    setCargandoIA(true)

    try {
      const response = await fetch('http://localhost:8000/api/v1/biblioteca-ia/explicar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ titulo_ley: item.titulo })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Error al consultar la IA')
      }

      const data = await response.json()
      setExplicacionIA(data.explicacion_ia)
    } catch (error: any) {
      console.error("Error en la petición de IA:", error)
      setExplicacionIA(error.message || 'No se pudo cargar la explicación de la IA en este momento.')
    } finally {
      setCargandoIA(false)
    }
  }

const filtrados = recursos.filter((item) => {
  // 1. Filtro por Buscador (siempre se evalúa)
  const queryLower = query.toLowerCase();
  const tituloLower = item.titulo.toLowerCase();
  const coincideQuery = query === '' || tituloLower.includes(queryLower);

  // 2. Filtro por Pestañas
  // Si la pestaña es "Todas", no filtramos por tipo
  if (tabActiva === 'Todas') {
    return coincideQuery;
  }

  // 3. Lógica imperativa para las pestañas
  // Convertimos a minúsculas para comparar sin errores
  const tipo = item.tipo.toLowerCase();
  let coincideTab = false;

  if (tabActiva === 'Leyes') {
    coincideTab = tipo.includes('ley');
  } else if (tabActiva === 'Protocolos') {
    coincideTab = tipo.includes('protocolo');
  } else if (tabActiva === 'Sentencias') {
    coincideTab = tipo.includes('sentencia');
  } else if (tabActiva === 'Derechos') {
    coincideTab = tipo.includes('derecho');
  }

  // Retornamos si cumple ambas condiciones
  return coincideTab && coincideQuery;
});

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Biblioteca de derechos político-electorales</h1>
      <p className="page-subtitle">
        Normativa y recursos en lenguaje accesible para el fortalecimiento de tus derechos.
      </p>
      <hr className="div" />

      {/* Buscador */}
      <div className="biblio-search" role="search">
        <input
          id="busqueda"
          className="biblio-search-input"
          placeholder="Buscar leyes, protocolos, sentencias…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-buscar" type="button">Buscar</button>
      </div>

      {/* Tabs */}
      <div className="biblio-tabs" role="tablist">
        {BIBLIO_TABS.map((t) => (
          <button
            key={t}
            className={`btab ${tabActiva === t ? 'active' : ''}`}
            onClick={() => setTabActiva(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid de tarjetas */}
      {cargando ? (
        <p style={{ color: 'var(--gris)', padding: '20px 0' }}>Cargando catálogo digital...</p>
      ) : filtrados.length === 0 ? (
        <p style={{ color: 'var(--gris)', padding: '20px 0' }}>No se encontraron recursos.</p>
      ) : (
        <ul className="biblio-grid">
          {filtrados.map((item) => (
            <li className="biblio-card" key={item.titulo}>
              <div className="biblio-tipo">
                <span>{item.tipo}</span>
                <span className="biblio-anio">· {item.anio}</span>
              </div>
              <h2 className="biblio-titulo">{item.titulo}</h2>
              <p>{item.desc}</p>
              {/* CAMBIO: Ahora el botón ejecuta nuestra función al hacer clic */}
              <button
                className="biblio-ver"
                type="button"
                onClick={() => manejarVerRecurso(item)}
              >
                Ver →
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ── VENTANA FLOTANTE (MODAL INTERACTIVO DE IA) ── */}
      {recursoSeleccionado && (
        <div className="modal-overlay" onClick={() => setRecursoSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-badge">{recursoSeleccionado.tipo} ({recursoSeleccionado.anio})</span>
            <h2 className="modal-titulo">{recursoSeleccionado.titulo}</h2>
            <hr />

            
            <div className="modal-body">
              {cargandoIA ? (
                <div className="loading-ia">
                  <div className="spinner"></div>
                  <p>✨ <em>La IA de Esperanza está analizando este recurso legal...</em></p>
                </div>
              ) : (
                <div className="ia-response">
                  {explicacionIA.split('\n').map((linea, index) => {
                    const textoLimpio = linea.replace(/\*\*/g, '').replace(/\*/g, '').trim();
                    if (!textoLimpio) return <div key={index} style={{ height: '14px' }} />;

                    // 1. Detectar si es un encabezado principal (Secciones 1, 2 o 3)
                    if (linea.startsWith('📌') || linea.startsWith('🔍') || linea.startsWith('⚡') || linea.startsWith('1.') || linea.startsWith('2.') || linea.startsWith('3.')) {
                      return (
                        <h3 key={index} className="ia-section-title">
                          {textoLimpio}
                        </h3>
                      );
                    }

                    // 2. Detectar si es un ejemplo práctico (las viñetas/tarjetas)
                    // Buscamos líneas que empiecen con guión, asterisco o que estén dentro de la sección 2 y tengan un formato de lista
                    if (linea.trim().startsWith('-') || linea.trim().startsWith('*') || (linea.includes(':') && !linea.startsWith('En la CDMX'))) {
                      const [tituloCorto, ...resto] = textoLimpio.split(':');

                      // Si la línea tenía dos puntos, la estructuramos bonito adentro de la tarjeta
                      return (
                        <div key={index} className="ia-card-block">
                          <span className="ia-card-icon">⚖️</span>
                          <div className="ia-card-text">
                            {resto.length > 0 ? (
                              <><strong>{tituloCorto.replace(/^-\s*/, '')}:</strong> {resto.join(':')}</>
                            ) : (
                              textoLimpio.replace(/^-\s*/, '')
                            )}
                          </div>
                        </div>
                      );
                    }

                    // 3. Párrafos descriptivos normales (como la sección 1 o introducciones)
                    return <p key={index} className="ia-paragraph">{textoLimpio}</p>;
                  })}
                </div>
              )}
            </div>

            <button className="btn-cerrar-modal" onClick={() => setRecursoSeleccionado(null)}>
              Entendido
            </button>
          </div>
        </div>
      )}

      <AvisoLegal />

      {/* Estilos rápidos embebidos para el diseño del Modal */}
      <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 999;
        }
        .modal-content {
          background: #fff; padding: 30px; border-radius: 12px; max-width: 650px; width: 90%;
          max-height: 85vh; overflow-y: auto; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .modal-badge { background: #f3e8ff; color: #6b21a8; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: bold; }
        .modal-titulo { font-size: 20px; color: #2d3748; margin-top: 10px; }
        .modal-body { margin: 20px 0; font-size: 15px; line-height: 1.6; color: #4a5568; }
        .loading-ia { text-align: center; color: #6b21a8; padding: 20px 0; }
        .btn-cerrar-modal { background: #6b21a8; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; float: right; font-weight: bold;}
        .btn-cerrar-modal:hover { background: #581c87; }

        .loading-ia {
          text-align: center;
          color: #6b21a8;
          padding: 40px 0;
        }
        .spinner {
          border: 4px solid rgba(107, 33, 168, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #6b21a8;
          animation: spin 1s linear infinite;
          margin: 0 auto 15px auto;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .ia-response {
          color: #2d3748;
          font-size: 15.5px;
          line-height: 1.7;
        }
        .ia-section-title {
          color: #5b21b6;
          font-size: 16.5px;
          font-weight: 700;
          margin-top: 24px;
          margin-bottom: 10px;
          border-left: 4px solid #8b5cf6;
          padding-left: 10px;
        }
        .ia-paragraph {
          margin-bottom: 12px;
          text-align: justify;
        }
        .ia-bullet-point {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
          background: #f9fafb;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #f3f4f6;
        }
        .ia-bullet-icon {
          margin-top: 2px;
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}