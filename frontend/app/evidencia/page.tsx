"use client";

// app/evidencia/page.tsx  →  /evidencia
// Checklist interactivo de evidencia jurídica.

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Breadcrumb, AvisoLegal } from "@/components/ui/Breadcrumb";
import { useRelato } from "@/context/RelatoContext";
import { obtenerEvidencias } from "@/lib/api";

const breadcrumbItems = [
  { label: "Inicio", href: "/" },
  { label: "Diagnóstico", href: "/diagnostico" },
  { label: "Checklist de evidencia" },
];

interface EvidenciaItem {
  id_unico: string;
  categoria: string;
  descripcion: string;
  ejemplo: string;
  obligatorio: boolean;
}

interface CategoriaAgrupada {
  titulo: string;
  items: EvidenciaItem[];
}

interface CategoriaBackend {
  categoria: string;
  evidencias: string[];
}

export default function PaginaEvidencia() {
  const { casoId } = useRelato();
  const [evidencias, setEvidencias] = useState<EvidenciaItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [notas, setNotas] = useState<string[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarEvidencias = async () => {
      try {
        // Llama a la API usando el casoId global
        const data = await obtenerEvidencias(casoId);
        // Guardamos las evidencias reales del backend en nuestro estado
        if (data && data.categorias && Array.isArray(data.categorias)) {
          const listaAplanada: EvidenciaItem[] = [];
          let contadorGlobal = 0;

          //Categorías del backend
          data.categorias.forEach((catObj: CategoriaBackend) => {
            if (catObj.evidencias && Array.isArray(catObj.evidencias)) {
              catObj.evidencias.forEach((ev: string) => {
                const cleanId = `ev-${contadorGlobal}`;

                listaAplanada.push({
                  id_unico: cleanId,
                  categoria: catObj.categoria,
                  descripcion: ev,
                  ejemplo: "",
                  obligatorio: false,
                });

                contadorGlobal++;
              });
            }
          });

          setEvidencias(listaAplanada);
          setTotalItems(contadorGlobal);
        }

        if (
          data &&
          data.notas_importantes &&
          Array.isArray(data.notas_importantes)
        ) {
          setNotas(data.notas_importantes);
        }
      } catch (error) {
        console.error("Error al traer las evidencias:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarEvidencias();
  }, [casoId]);

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const cantidadTotal = evidencias.length;
  const countChecked = Object.values(checked).filter(Boolean).length;
  const progresoPct =
    cantidadTotal > 0 ? Math.round((countChecked / cantidadTotal) * 100) : 0;

  const categoriasAgrupadas = useMemo<CategoriaAgrupada[]>(() => {
  return Object.values(
    evidencias.reduce<Record<string, CategoriaAgrupada>>((acc, item) => {
      if (!acc[item.categoria]) {
        acc[item.categoria] = {
          titulo: item.categoria,
          items: [],
        };
      }

      acc[item.categoria].items.push(item);

      return acc;
    }, {})
  );
}, [evidencias]);

  if (cargando) {
    return (
      <div className="page">
        <div className="loading-box" role="status">
          <div className="spinner" />
          Cargando tus evidencias recomendadas...
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="page-title">Checklist de evidencia jurídica</h1>
      <p className="page-subtitle">
        Guía para reunir los elementos probatorios necesarios para tu queja
        formal. Marca los que ya tienes.
      </p>
      <hr className="div" />

      <div className="consejo-box" role="note">
        <span aria-hidden="true">💡</span>
        <span>
          <strong>Consejo jurídico</strong>: Entre más pruebas específicas y
          fechadas reúnas, más sólida será tu queja. No es necesario tener todos
          los elementos, pero sí los más relevantes según tu caso.
        </span>
      </div>

      {notas.length > 0 && (
        <div
          className="consejo-box"
          role="note"
          style={{ marginBottom: "25px" }}
        >
          <span aria-hidden="true">💡</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <strong>Recomendaciones clave del equipo legal:</strong>
            <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px" }}>
              {notas.map((nota, index) => (
                <li key={index}>{nota}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {totalItems === 0 ? (
        <p>No se encontraron evidencias específicas para este caso.</p>
      ) : (
        <div
          className="ev-lista-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          {categoriasAgrupadas.map((categoria) => (
            <div key={categoria.titulo}>
              <h3
                style={{
                  fontSize: "14px",
                  textTransform: "uppercase",
                  color: "var(--principal, #4f46e5)",
                  marginBottom: "10px",
                  marginTop: "20px",
                }}
              >
                {categoria.titulo}
              </h3>

              {categoria.items.map((item) => {
                const isChecked = !!checked[item.id_unico];

                return (
                  <div
                    className="ev-item"
                    key={item.id_unico}
                    onClick={() => toggle(item.id_unico)}
                    role="checkbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        toggle(item.id_unico);
                      }
                    }}
                    style={{
                      padding: "15px",
                      border: "1px solid var(--borde, #e2e8f0)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      backgroundColor: isChecked ? "#f8fafc" : "white",
                      marginBottom: "10px",
                    }}
                  >
                    <div className={`ev-cb ${isChecked ? "checked" : ""}`}>
                      {isChecked ? "✓" : ""}
                    </div>

                    <div style={{ flex: 1 }}>
                      {item.obligatorio && (
                        <div style={{ color: "#de350b", fontSize: "12px" }}>
                          * Requerido
                        </div>
                      )}

                      <div
                        style={{
                          fontSize: "15px",
                          textDecoration: isChecked ? "line-through" : "none",
                          color: isChecked ? '#64748b' : '#1e293b',
                          marginTop: '4px'
                        }}
                      >
                        {item.descripcion || 'SIN DESCRIPCIÓN'}
                      </div>

                      {item.ejemplo && (
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#64748b",
                            fontStyle: "italic",
                          }}
                        >
                          <strong>Ejemplo:</strong> {item.ejemplo}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── Barra de progreso ── */}
      <div>
        <strong style={{ fontSize: 13.5 }}>Progreso de evidencia:</strong>
        <div
          className="progreso-wrap"
          role="progressbar"
          aria-valuenow={progresoPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${countChecked} de ${totalItems} elementos recopilados`}
        >
          <div className="progreso-bar" style={{ width: `${progresoPct}%` }} />
        </div>
        <div className="progreso-label">
          {countChecked} de {totalItems} elementos ({progresoPct}%)
        </div>
      </div>

      <div className="nav-bottom">
        <Link href="/diagnostico" className="btn-back">
          ← Volver al diagnóstico
        </Link>
        <Link href="/relato" className="btn-next">
          Continuar: Redactar queja →
        </Link>
      </div>

      <AvisoLegal />
    </div>
  );
}
