'use client'

// app/page.tsx  →  /
// Pantalla de inicio con textarea de relato libre y grid de módulos.

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRelato } from '@/context/RelatoContext'
import { AvisoLegal } from '@/components/ui/Breadcrumb'

const MODULOS = [
  {
    n:     '01',
    titulo: 'Diagnóstico Inicial IA',
    desc:   'La IA analiza tu relato e identifica si lo que describes constituye violencia política en razón de género, con base en la legislación electoral vigente.',
    link:   'Ir a diagnóstico →',
    href:   '/diagnostico',
  },
  {
    n:     '02',
    titulo: 'Ruta Institucional',
    desc:   'Guía paso a paso con las acciones concretas y las instituciones ante las cuales puedes presentar tu queja, en el orden recomendado.',
    link:   'Ver ruta →',
    href:   '/ruta',
  },
  {
    n:     '03',
    titulo: 'Generador de Relato de Hechos',
    desc:   'La IA reorganiza tu relato en lenguaje jurídico formal, listo para integrarse a una queja oficial.',
    link:   'Redactar relato →',
    href:   '/relato',
  },
  {
    n:     '04',
    titulo: 'Checklist de Evidencia',
    desc:   'Lista personalizada de los elementos probatorios que deberás reunir para fortalecer tu queja.',
    link:   'Ver checklist →',
    href:   '/evidencia',
  },
  {
    n:     '05',
    titulo: 'Biblioteca y Directorio',
    desc:   'Normativa en lenguaje accesible y directorio de instituciones de apoyo en tu alcaldía.',
    link:   'Explorar →',
    href:   '/biblioteca',
  },
]

// 5 000 caracteres (~700 palabras): suficiente para relatos detallados
// sin imponer una limitación que ponga en riesgo la calidad del análisis.
const MAX_CHARS = 5000
const MIN_CHARS = 30

export default function PaginaInicio() {
  const router            = useRouter()
  const { setRelato }     = useRelato()
  const [texto, setTexto] = useState('')

  const handleAnalizar = () => {
    setRelato(texto)
    router.push('/diagnostico')
  }

  const pct = Math.round((texto.length / MAX_CHARS) * 100)

  return (
    <div className="page">
      <div className="inicio-hero">
        <h1>
          Orientación jurídica para mujeres en situación de violencia política en razón de género
        </h1>
        <p>
          Cuéntanos con tus propias palabras lo que has vivido. La IA analizará tu relato
          de forma accesible y confidencial.{' '}
          <strong>No necesitas proporcionar tu nombre ni ningún dato personal.</strong>
        </p>

        <div className="aviso-anonimato">
          <span aria-hidden="true">🔒</span>
          <span>
            Esta plataforma es completamente anónima. No recopilamos datos personales
            identificables. Puedes escribir con total libertad.
          </span>
        </div>

        <textarea
          className="inicio-textarea"
          placeholder="Escribe aquí lo que has vivido. Puedes mencionar fechas, lugares, personas (por cargo o función, no necesariamente por nombre) y cómo te han afectado estos hechos…"
          value={texto}
          maxLength={MAX_CHARS}
          onChange={(e) => setTexto(e.target.value)}
          aria-label="Relato de los hechos"
          rows={8}
        />

        <div className="char-count" aria-live="polite">
          <span style={{ color: pct > 90 ? 'var(--rojo, #dc2626)' : undefined }}>
            {texto.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} caracteres
          </span>
          {texto.length > 0 && texto.length < MIN_CHARS && (
            <span style={{ color: 'var(--rojo, #dc2626)', marginLeft: 8 }}>
              Escribe al menos {MIN_CHARS} caracteres para continuar.
            </span>
          )}
        </div>

        <button
          className="btn-analizar"
          onClick={handleAnalizar}
          disabled={texto.trim().length < MIN_CHARS}
          aria-disabled={texto.trim().length < MIN_CHARS}
        >
          Analizar mi situación →
        </button>
      </div>

      <section className="que-puedo" aria-label="Módulos de la plataforma">
        <h2>¿Qué puedo hacer en esta plataforma?</h2>
        <div className="modulos-grid">
          {MODULOS.map((m) => (
            <article className="modulo-col" key={m.n}>
              <div className="modulo-num" aria-hidden="true">{m.n}</div>
              <h3>{m.titulo}</h3>
              <p>{m.desc}</p>
              <Link href={m.href} className="modulo-link">
                {m.link}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <AvisoLegal />
    </div>
  )
}
