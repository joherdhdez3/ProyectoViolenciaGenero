'use client'

// app/biblioteca/page.tsx  →  /biblioteca
// Biblioteca digital de normativa y recursos.

import { useState } from 'react'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { BIBLIOTECA, BIBLIO_TABS } from '@/lib/constants'

const breadcrumbItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Biblioteca de derechos' },
]

export default function PaginaBiblioteca() {
  const [tabActiva, setTabActiva] = useState('Todas')
  const [query, setQuery]         = useState('')

  const filtrados = BIBLIOTECA.filter((item) => {
    const coincideTab =
      tabActiva === 'Todas' ||
      item.tipo.toLowerCase().includes(tabActiva.toLowerCase().slice(0, -1))
    const coincideQuery =
      query === '' ||
      item.titulo.toLowerCase().includes(query.toLowerCase())
    return coincideTab && coincideQuery
  })

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Biblioteca de derechos político-electorales</h1>
      <p className="page-subtitle">
        Normativa y recursos en lenguaje accesible para el fortalecimiento de tus derechos.
      </p>
      <hr className="div" />

      {/* ── Buscador ── */}
      <div className="biblio-search" role="search">
        <label htmlFor="busqueda" className="sr-only">
          Buscar en la biblioteca
        </label>
        <input
          id="busqueda"
          className="biblio-search-input"
          placeholder="Buscar leyes, protocolos, sentencias…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-buscar" type="button">Buscar</button>
      </div>

      {/* ── Tabs ── */}
      <div className="biblio-tabs" role="tablist" aria-label="Filtrar por tipo">
        {BIBLIO_TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tabActiva === t}
            className={`btab ${tabActiva === t ? 'active' : ''}`}
            onClick={() => setTabActiva(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Grid de tarjetas ── */}
      {filtrados.length === 0 ? (
        <p style={{ color: 'var(--gris)', padding: '20px 0' }}>
          No se encontraron recursos con esos criterios.
        </p>
      ) : (
        <ul className="biblio-grid" aria-label="Resultados">
          {filtrados.map((item) => (
            <li className="biblio-card" key={item.titulo}>
              <div className="biblio-tipo">
                <span>{item.tipo}</span>
                <span className="biblio-anio">· {item.anio}</span>
              </div>
              <h2 className="biblio-titulo">{item.titulo}</h2>
              <p>{item.desc}</p>
              <button className="biblio-ver" type="button">Ver →</button>
            </li>
          ))}
        </ul>
      )}

      <AvisoLegal />
    </div>
  )
}
