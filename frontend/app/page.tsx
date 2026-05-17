'use client'

// app/page.tsx  →  /
// Pantalla de inicio con textarea de relato libre y grid de módulos.
// Es Client Component porque gestiona estado local (textarea) y
// usa el contexto global de relato.

import type { Metadata } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRelato } from '@/context/RelatoContext'
import { AvisoLegal } from '@/components/ui/Breadcrumb'

// Nota: metadata no puede exportarse desde un 'use client'.
// Si necesitas SEO aquí, mueve el metadata a un layout específico
// o usa generateMetadata en un Server Component envolvente.

const MODULOS = [
  {
    n:     '01',
    titulo: 'Diagnóstico Inicial IA',
    desc:   'Identifica si lo que vives es violencia política en razón de género.',
    link:   'Ir a diagnóstico →',
    href:   '/diagnostico',
  },
  {
    n:     '02',
    titulo: 'Ruta Institucional',
    desc:   'Acciones cronológicas y guía para iniciar tu proceso de denuncia.',
    link:   'Ver ruta →',
    href:   '/ruta',
  },
  {
    n:     '03',
    titulo: 'Generador de Relato de Hechos',
    desc:   'Reorganiza tu relato de forma cronológica y formal bajo estructura jurídica.',
    link:   'Redactar relato →',
    href:   '/relato',
  },
  {
    n:     '04',
    titulo: 'Checklist de Evidencia',
    desc:   'Guía jurídica básica para reunir y organizar tus pruebas.',
    link:   'Ver checklist →',
    href:   '/evidencia',
  },
  {
    n:     '05',
    titulo: 'Biblioteca y Directorio',
    desc:   'Normativa en lenguaje sencillo, directorio institucional actualizado.',
    link:   'Explorar →',
    href:   '/biblioteca',
  },
]

const MAX_CHARS = 2000

export default function PaginaInicio() {
  const router               = useRouter()
  const { setRelato }        = useRelato()
  const [texto, setTexto]    = useState('')

  const handleAnalizar = () => {
    setRelato(texto)
    router.push('/diagnostico')
  }

  return (
    <div className="page">
      <div className="inicio-hero">
        <h1>
          Orientación jurídica para mujeres en violencia política en razón de género
        </h1>
        <p>
          Cuéntanos lo que está pasando. La IA te orientará de forma accesible y
          confidencial.{' '}
          <strong>No necesitas proporcionar tu nombre.</strong>
        </p>

        <div className="aviso-anonimato">
          <span>🔒</span>
          <span>
            Esta plataforma es completamente anónima. No recopilamos datos personales
            identificables.
          </span>
        </div>

        <textarea
          className="inicio-textarea"
          placeholder="Escribe aquí con tus propias palabras lo que has vivido…"
          value={texto}
          maxLength={MAX_CHARS}
          onChange={(e) => setTexto(e.target.value)}
          aria-label="Relato de los hechos"
        />
        <div className="char-count">
          {texto.length} / {MAX_CHARS}
        </div>

        <button
          className="btn-analizar"
          onClick={handleAnalizar}
          disabled={texto.trim().length < 10}
        >
          Analizar mi situación →
        </button>
      </div>

      <section className="que-puedo" aria-label="Módulos de la plataforma">
        <h2>¿Qué puedo hacer en esta plataforma?</h2>
        <div className="modulos-grid">
          {MODULOS.map((m) => (
            <article className="modulo-col" key={m.n}>
              <div className="modulo-num">{m.n}</div>
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
