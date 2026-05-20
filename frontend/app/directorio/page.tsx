'use client'
import { useState, useEffect } from 'react'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'

interface Institucion {
  institucion: string
  direccion: string
  telefono: string
  horario: string
  alcaldia?: string
}

export default function PaginaDirectorio() {
  const [instituciones, setInstituciones] = useState<Institucion[]>([])
  const [alcaldias, setAlcaldias] = useState<string[]>([])
  const [filtro, setFiltro] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/directorio/')
      .then(res => res.json())
      .then(data => {
        if (typeof data === 'object' && !Array.isArray(data)) {
          const lista: Institucion[] = []
          const nombresAlcaldias: string[] = []

          Object.entries(data).forEach(([alcaldia, insts]) => {
            nombresAlcaldias.push(alcaldia)
            ;(insts as Institucion[]).forEach(inst =>
              lista.push({ ...inst, alcaldia })
            )
          })

          setAlcaldias(nombresAlcaldias)
          setInstituciones(lista)
        }
      })
      .catch(err => console.error('Error al cargar directorio:', err))
  }, [])

  const filtradas = instituciones.filter(inst => {
    const coincideAlcaldia = filtro === 'Todas' || inst.alcaldia === filtro
    const coincideBusqueda =
      busqueda === '' ||
      inst.institucion.toLowerCase().includes(busqueda.toLowerCase()) ||
      inst.alcaldia?.toLowerCase().includes(busqueda.toLowerCase())
    return coincideAlcaldia && coincideBusqueda
  })

  return (
    <div className="page">
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Directorio' }]} />
      <h1 className="page-title">Directorio institucional</h1>
      <p className="page-subtitle">
        Encuentra las instituciones de apoyo disponibles en tu alcaldía
      </p>

      <hr className="div" />

      {/* Filtros */}
      <div className="filtros-row">
        <div className="filtro-group">
          <span>🔍</span>
          <input
            className="filtro-select"
            type="text"
            placeholder="Buscar institución o alcaldía..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{ minWidth: '240px' }}
          />
        </div>
        <div className="filtro-group">
          <span>📍 Alcaldía:</span>
          <select
            className="filtro-select"
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          >
            <option value="Todas">Todas</option>
            {alcaldias.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <span className="page-subtitle" style={{ marginBottom: 0, alignSelf: 'center' }}>
          {filtradas.length} institución{filtradas.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {/* Lista */}
      <ul className="dir-lista">
        {filtradas.length === 0 ? (
          <li style={{ textAlign: 'center', padding: '40px', color: 'var(--gris)' }}>
            No se encontraron instituciones con ese criterio.
          </li>
        ) : (
          filtradas.map((inst, index) => (
            <li key={index} className="dir-item">
              <div>
                <div className="dir-nombre">{inst.institucion}</div>
                <div className="dir-meta">
                  📍 {inst.direccion}
                  <span className="dir-sep">·</span>
                  🏙️ {inst.alcaldia}
                </div>
                <div className="dir-desc">🕐 {inst.horario}</div>
              </div>
              <div className="dir-contacto">
                <a className="dir-tel" href={`tel:${inst.telefono}`}>
                  📞 {inst.telefono}
                </a>
              </div>
            </li>
          ))
        )}
      </ul>

      <AvisoLegal />
    </div>
  )
}