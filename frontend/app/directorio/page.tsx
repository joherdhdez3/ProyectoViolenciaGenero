'use client'

// app/directorio/page.tsx  →  /directorio
// Directorio institucional con filtros por ámbito y tipo.

import { useState } from 'react'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { DIRECTORIO, AMBITOS_DIRECTORIO, TIPOS_INSTITUCION } from '@/lib/constants'

const breadcrumbItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Directorio institucional' },
]

export default function PaginaDirectorio() {
  const [ambito, setAmbito] = useState('Todos')
  const [tipo, setTipo]     = useState('Todas')

  const filtrados = DIRECTORIO.filter((inst) => {
    const coincideAmbito = ambito === 'Todos' || inst.ambito === ambito
    const coincideTipo   = tipo   === 'Todas' || inst.tipo   === tipo
    return coincideAmbito && coincideTipo
  })

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Directorio institucional</h1>
      <p className="page-subtitle">
        Instituciones competentes para atender violencia política en razón de género
        en la Ciudad de México y a nivel nacional. Contactos actualizados.
      </p>
      <hr className="div" />

      {/* ── Filtros ── */}
      <div className="filtros-row" role="group" aria-label="Filtros del directorio">
        <div className="filtro-group">
          <label htmlFor="ambito">Ámbito:</label>
          <select
            id="ambito"
            className="filtro-select"
            value={ambito}
            onChange={(e) => setAmbito(e.target.value)}
          >
            {AMBITOS_DIRECTORIO.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="filtro-group">
          <label htmlFor="tipo">Tipo de institución:</label>
          <select
            id="tipo"
            className="filtro-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            {TIPOS_INSTITUCION.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Lista de instituciones ── */}
      {filtrados.length === 0 ? (
        <p style={{ color: 'var(--gris)', fontSize: 13, padding: '20px 0' }}>
          No se encontraron instituciones con esos filtros.
        </p>
      ) : (
        <ul className="dir-lista" aria-label="Instituciones">
          {filtrados.map((inst) => (
            <li className="dir-item" key={inst.nombre}>
              <div>
                <div className="dir-nombre">{inst.nombre}</div>
                <div className="dir-meta">
                  <span>{inst.area}</span>
                  <span className="dir-sep" aria-hidden="true">|</span>
                  <span>{inst.ambito}</span>
                  <span className="dir-sep" aria-hidden="true">|</span>
                  <span>{inst.tipo}</span>
                </div>
                <div className="dir-desc">{inst.desc}</div>
              </div>
              <div className="dir-contacto">
                <a href={`tel:${inst.tel.replace(/\s/g, '')}`} className="dir-tel">
                  {inst.tel}
                </a>
                <a href={`mailto:${inst.email}`} className="dir-email">
                  {inst.email}
                </a>
                <button className="dir-ver" type="button">Ver más →</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AvisoLegal />
    </div>
  )
}
