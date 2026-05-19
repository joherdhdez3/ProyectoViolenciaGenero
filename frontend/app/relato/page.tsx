'use client'

// app/relato/page.tsx  →  /relato
// Generador de relato de hechos jurídico (F05 / F06).
// Lee el relato libre desde el contexto global; permite enriquecer
// con datos estructurados (cargo, alcaldía, autoridad, fechas).

import { useState } from 'react'
import Link from 'next/link'
import { useRelato } from '@/context/RelatoContext'
import { Breadcrumb, AvisoLegal } from '@/components/ui/Breadcrumb'
import { ALCALDIAS_CDMX, CARGOS_POLITICOS } from '@/lib/constants'
import type { FormRelato } from '@/types'
import { enviarRelatoFormal } from '@/lib/api'

// Fecha máxima: hoy (no se pueden registrar hechos futuros)
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

export default function PaginaRelato() {
  const { relato, casoId } = useRelato()
  const [form, setForm] = useState<FormRelato>(FORM_INICIAL)

  const [cargando, setCargando] = useState(false)
  const [datosIa, setDatosIa] = useState<any>(null)
  const [pdfUrl, setPdfUrl] = useState<string>('')
  

  const setField = <K extends keyof FormRelato>(key: K, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const periodoTexto =
    form.fechaInicio && form.fechaFin
      ? `${form.fechaInicio} al ${form.fechaFin}`
      : form.fechaInicio
      ? `${form.fechaInicio} en adelante`
      : 'fecha de los hechos'
  
  const procesarRelatoFormal = async () => {
    if (!casoId) {
      alert("No se encontró un folio de caso activo. Por favor regresa al inicio.");
      return;
    }

    setCargando(true)
    try {
      // Traducción FormRelato al formato 'DatosQuejosa' que pide el backend
      const datosQuejosaFormateados = {
        nombre_completo: "Suscrita afectada", // Manteniendo el anonimato
        cargo_funcion: form.cargo,
        municipio_alcaldia: form.alcaldia,
        autoridad_denunciada: form.autoridad || "No especificada"
      }

      // Envío del paquete oficial unificado a la API
      const respuesta = await enviarRelatoFormal({
        caso_id: casoId,
        datos_quejosa: datosQuejosaFormateados
      })

      // Resguardo de los textos y la URL del PDF que nos devuelve FastAPI
      setDatosIa(respuesta)
      setPdfUrl(respuesta.url_pdf) 
      
      alert("¡Relato estructurado por IA con éxito!")
    } catch (error) {
      console.error("Error al generar el relato formal:", error)
      alert("Hubo un error al conectar con el servidor.")
    } finally {
      setCargando(false)
    }
  }
  return (
    <div className="page" style={{ paddingBottom: 100 }}>
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Generador de Relato de Hechos</h1>
      <p className="page-subtitle">
        La IA reorganiza tu relato de forma cronológica y formal bajo estructura
        jurídica para la queja.
      </p>
      <hr className="div" />

      <div className="aviso-anonimato">
        <span aria-hidden="true">🔒</span>
        <span>
          Este formulario es anónimo. El cargo y la alcaldía se usan solo para
          estructurar el documento jurídico — no se asocian a ningún dato personal
          identificable.
        </span>
      </div>

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
            placeholder="Ej. Alcalde(sa) / Concejal / Titular de la Dependencia"
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

      {/* ── F05: Relato reorganizado por IA ── */}
      <div className="section-label">
        Relato reorganizado por IA
        <span className="gen-badge">✓ Generado automáticamente</span>
      </div>
      <div className="relato-generado" aria-label="Relato generado">
        {datosIa ? (
          // Solo si la IA ya ha respondido
          <>
            <div className="rb-sec">I. PROEMIO</div>
            <p className="texto-ia">{datosIa.proemio}</p>

            <div className="rb-sec">II. ANTECEDENTES</div>
            <p className="texto-ia">{datosIa.antecedentes}</p>

            <div className="rb-sec">III. HECHOS ORDENADOS</div>
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
          Generado automáticamente desde F07 — Derecho al cargo, paridad, no discriminación
        </span>

        <div className="rb-sec">IV. PRUEBAS OFRECIDAS</div>
        <span className="relato-a">Generado desde Checklist de Evidencia</span>
      </>
    )}      
  </div>

      {/* ── F06: Relato final estructurado ── */}
      <div className="section-label" style={{ color: 'var(--morado)' }}>
        Relato de hechos estructurado{' '}
        <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--gris)', textTransform: 'none', letterSpacing: 0 }}>
          (versión final para queja)
        </span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--gris)', lineHeight: 1.7 }}>
        Versión final formal lista para integrar a la queja oficial ante la institución
        competente.
        <br />
        Esta versión puede editarse antes de descargar o enviar. Incluye todos los
        campos completados y la estructura generada por IA.
      </p>

      <AvisoLegal />

      {/* ── Barra de acciones fija al fondo ── */}
      <div className="bottom-bar">
        <Link href="/ruta" className="btn-back">
          ← Volver
        </Link>
        <div className="bottom-bar-btns">
          <button 
            className="btn-primary-sm" 
            onClick={procesarRelatoFormal}
            disabled={cargando}
          >
            {cargando ? 'Procesando...' : 'Estructurar con IA'}
          </button>

          {/* Botón de descarga: se activa solo cuando tenemos la urlPdf */}
          <button 
            className="btn-outline"
            onClick={() => {
            if (pdfUrl) {
              window.open(pdfUrl, '_blank') // 📄 Abre el PDF en una pestaña nueva para imprimir/descargar
            } else {
              alert("Primero debes hacer clic en 'Estructurar con IA' para generar el documento.")
            }
          }}
        >
    Descargar PDF
  </button>
          <Link href="/directorio" className="btn-primary-sm">
            Finalizar queja →
          </Link>
        </div>
      </div>
    </div>
  )
}
