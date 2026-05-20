'use client'

// app/relato/page.tsx  →  /relato
// Generador de relato de hechos jurídico (F05 / F06).
// Reemplaza alert() por mensajes inline. Mejor UX para descarga de PDF.

import { useState } from 'react'
import Link from 'next/link'
import { useRelato } from '@/context/RelatoContext'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { ALCALDIAS_CDMX, CARGOS_POLITICOS } from '@/lib/constants'
import type { FormRelato } from '@/types'
import { enviarRelatoFormal } from '@/lib/api'

const HOY = new Date().toISOString().split('T')[0]

const FORM_INICIAL: FormRelato = {
  cargo:       '',
  alcaldia:    '',
  autoridad:   '',
  fechaInicio: '',
  fechaFin:    '',
}

const breadcrumbItems = [
  { label: 'Inicio',             href: '/'             },
  { label: 'Diagnóstico',        href: '/diagnostico'  },
  { label: 'Ruta institucional', href: '/ruta'         },
  { label: 'Relato de hechos'                          },
]

type EstadoMensaje = { tipo: 'exito' | 'error'; texto: string } | null

export default function PaginaRelato() {
  const { relato, casoId } = useRelato()
  const [form, setForm]     = useState<FormRelato>(FORM_INICIAL)
  const [cargando, setCargando] = useState(false)
  const [datosIa, setDatosIa]   = useState<any>(null)
  const [pdfUrl, setPdfUrl]     = useState<string>('')
  const [mensaje, setMensaje]   = useState<EstadoMensaje>(null)

  const setField = <K extends keyof FormRelato>(key: K, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const camposObligatoriosCompletos =
    form.cargo.trim() !== '' &&
    form.alcaldia.trim() !== '' &&
    form.fechaInicio.trim() !== ''

  const procesarRelatoFormal = async () => {
    if (!casoId) {
      setMensaje({
        tipo:  'error',
        texto: 'No se encontró un folio de caso activo. Por favor regresa al inicio e ingresa tu relato.',
      })
      return
    }
    if (!camposObligatoriosCompletos) {
      setMensaje({
        tipo:  'error',
        texto: 'Completa los campos obligatorios: cargo, alcaldía y fecha de inicio de los hechos.',
      })
      return
    }

    setMensaje(null)
    setCargando(true)
    try {
      const datosQuejosaFormateados = {
        nombre_completo:      'Suscrita afectada',   // anonimato preservado
        cargo_funcion:        form.cargo,
        municipio_alcaldia:   form.alcaldia,
        autoridad_denunciada: form.autoridad || 'No especificada',
      }

      const respuesta = await enviarRelatoFormal({
        caso_id:       casoId,
        datos_quejosa: datosQuejosaFormateados,
      })

      setDatosIa(respuesta)
      setPdfUrl(respuesta.url_pdf)
      setMensaje({
        tipo:  'exito',
        texto: 'Relato estructurado correctamente. Ya puedes descargar el documento PDF.',
      })
    } catch (error) {
      console.error('Error al generar el relato formal:', error)
      setMensaje({
        tipo:  'error',
        texto: 'Hubo un error al conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.',
      })
    } finally {
      setCargando(false)
    }
  }

  const descargarPdf = () => {
    if (!pdfUrl) {
      setMensaje({
        tipo:  'error',
        texto: "Primero haz clic en 'Estructurar con IA' para generar el documento.",
      })
      return
    }
    const urlCompleta = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${pdfUrl}`
    window.open(urlCompleta, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="page" style={{ paddingBottom: 100 }}>
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Generador de Relato de Hechos</h1>
      <p className="page-subtitle">
        La IA reorganiza tu relato de forma cronológica y con lenguaje jurídico formal,
        listo para integrarse a una queja oficial.
      </p>
      <hr className="div" />

      <div className="aviso-anonimato">
        <span aria-hidden="true">🔒</span>
        <span>
          Este formulario es anónimo. El cargo y la alcaldía se usan únicamente para
          estructurar el documento jurídico — no se asocian a ningún dato personal identificable.
        </span>
      </div>

      {/* ── Mensaje de estado (éxito / error) ── */}
      {mensaje && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            padding:         '14px 18px',
            borderRadius:    '8px',
            backgroundColor: mensaje.tipo === 'exito' ? '#f0fdf4' : '#fdf2f2',
            borderLeft:      `5px solid ${mensaje.tipo === 'exito' ? '#16a34a' : '#dc2626'}`,
            color:           mensaje.tipo === 'exito' ? '#14532d' : '#7f1d1d',
            marginBottom:    '20px',
            fontSize:        '14px',
          }}
        >
          {mensaje.tipo === 'exito' ? '✅ ' : '⚠️ '}
          {mensaje.texto}
        </div>
      )}

      {/* ── Datos del caso ── */}
      <div className="section-label">Datos del caso</div>

      <div className="form-grid-3">
        <div className="form-group">
          <label htmlFor="cargo">
            Cargo o función que desempeña <span className="req">*</span>
          </label>
          <select
            id="cargo"
            value={form.cargo}
            onChange={(e) => setField('cargo', e.target.value)}
            aria-required="true"
          >
            <option value="">— Selecciona —</option>
            {CARGOS_POLITICOS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="alcaldia">
            Alcaldía donde ocurrieron los hechos <span className="req">*</span>
          </label>
          <select
            id="alcaldia"
            value={form.alcaldia}
            onChange={(e) => setField('alcaldia', e.target.value)}
            aria-required="true"
          >
            <option value="">— Selecciona alcaldía —</option>
            {ALCALDIAS_CDMX.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="autoridad">Autoridad denunciada</label>
          <input
            id="autoridad"
            type="text"
            className="form-input"
            placeholder="Ej. Alcalde(sa) / Concejal / Titular de área"
            value={form.autoridad}
            onChange={(e) => setField('autoridad', e.target.value)}
          />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="fechaInicio">
            Fecha de inicio de los hechos <span className="req">*</span>
          </label>
          <input
            id="fechaInicio"
            type="date"
            max={HOY}
            value={form.fechaInicio}
            onChange={(e) => setField('fechaInicio', e.target.value)}
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaFin">
            Fecha del último hecho{' '}
            <span className="req-opt">(si aplica)</span>
          </label>
          <input
            id="fechaFin"
            type="date"
            max={HOY}
            min={form.fechaInicio || undefined}
            value={form.fechaFin}
            onChange={(e) => setField('fechaFin', e.target.value)}
          />
        </div>
      </div>

      {/* ── Vista previa / Relato generado por IA ── */}
      <div className="section-label">
        Relato reorganizado por IA
        {datosIa && <span className="gen-badge">✓ Generado automáticamente</span>}
      </div>

      <div className="relato-generado" aria-label="Relato generado" aria-live="polite">
        {datosIa ? (
          <>
            <div className="rb-sec">I. PROEMIO</div>
            <p className="texto-ia">{datosIa.proemio}</p>

            <div className="rb-sec">II. ANTECEDENTES</div>
            <p className="texto-ia">{datosIa.antecedentes}</p>

            <div className="rb-sec">III. HECHOS ORDENADOS CRONOLÓGICAMENTE</div>
            <p className="texto-ia">{datosIa.hechos_ordenados}</p>
          </>
        ) : (
          <>
            <div className="rb-sec">I. ANTECEDENTES</div>
            Con fecha{' '}
            <span className="relato-a">{form.fechaInicio || 'fecha de inicio'}</span>, la
            suscrita se desempeñaba como{' '}
            <span className="relato-a">{form.cargo || 'cargo'}</span> en la{' '}
            <span className="relato-a">
              {form.alcaldia ? `Alcaldía ${form.alcaldia}, Ciudad de México` : 'alcaldía / institución'}
            </span>.

            <div className="rb-sec">II. HECHOS</div>
            1. Con fecha{' '}
            <span className="relato-a">{form.fechaInicio || 'fecha de inicio'}</span>,{' '}
            <span className="relato-a">descripción cronológica del primer acto denunciado</span>.
            <br />
            2. Con fecha{' '}
            <span className="relato-a">{form.fechaFin || 'fecha del último hecho'}</span>,{' '}
            <span className="relato-a">descripción del segundo acto de obstaculización</span>.
            <br />
            3. Autoridad responsable:{' '}
            <span className="relato-a">{form.autoridad || 'autoridad denunciada'}</span>.

            <div className="rb-sec">III. DERECHOS VULNERADOS</div>
            <span className="relato-a">
              Se generará automáticamente con base en el análisis de tu caso.
            </span>

            <div className="rb-sec">IV. PRUEBAS OFRECIDAS</div>
            <span className="relato-a">
              Se integrará desde el Checklist de Evidencia.
            </span>
          </>
        )}
      </div>

      {/* ── Descripción de versión final ── */}
      <div className="section-label" style={{ color: 'var(--morado)' }}>
        Documento final para queja oficial{' '}
        <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--gris)', textTransform: 'none', letterSpacing: 0 }}>
          (versión lista para descargar en PDF)
        </span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--gris)', lineHeight: 1.7 }}>
        Una vez que presiones <em>Estructurar con IA</em>, el documento se generará en formato PDF
        con encabezado institucional, folio de caso anónimo y estructura jurídica formal, listo
        para presentar ante la institución competente.
      </p>

      <AvisoLegal />

      {/* ── Barra de acciones fija al fondo ── */}
      <div className="bottom-bar">
        <Link href="/ruta" className="btn-back">← Volver</Link>
        <div className="bottom-bar-btns">
          <button
            className="btn-primary-sm"
            onClick={procesarRelatoFormal}
            disabled={cargando || !camposObligatoriosCompletos}
            aria-busy={cargando}
            title={!camposObligatoriosCompletos ? 'Completa los campos obligatorios primero' : undefined}
          >
            {cargando ? 'Generando…' : 'Estructurar con IA'}
          </button>

          <button
            className="btn-outline"
            onClick={descargarPdf}
            disabled={!pdfUrl}
            aria-disabled={!pdfUrl}
            title={!pdfUrl ? 'Genera el relato primero' : 'Descargar PDF del relato formal'}
          >
            {pdfUrl ? '⬇ Descargar PDF' : 'Descargar PDF'}
          </button>

          <Link href="/directorio" className="btn-primary-sm">
            Finalizar queja →
          </Link>
        </div>
      </div>
    </div>
  )
}
