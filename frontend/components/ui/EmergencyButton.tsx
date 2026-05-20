"use client";

/**
 * EmergencyButton.tsx
 * Botón flotante de emergencia — estilos inline para máxima compatibilidad.
 * Coloca este componente en app/layout.tsx dentro de <body>.
 */

import { useState, useCallback, useRef, useEffect } from "react";

const EMERGENCY_NUMBER_DISPLAY = "55 5658 1111";
const EMERGENCY_NUMBER_TEL     = "5556581111";
const EMERGENCY_HREF           = `tel:${EMERGENCY_NUMBER_TEL}`;
const CLICK_COOLDOWN_MS        = 2000;

// ─── Icono teléfono ───────────────────────────────────────────────────────────
function PhoneIcon({ size = 18, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => cancelBtnRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    /* Overlay fijo que cubre toda la pantalla */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="em-title"
      aria-describedby="em-desc"
      onClick={onCancel}
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          9999,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         "16px",
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter:  "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      {/* Tarjeta del modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position:      "relative",
          width:         "100%",
          maxWidth:      "320px",
          borderRadius:  "16px",
          backgroundColor: "#ffffff",
          boxShadow:     "0 20px 60px rgba(0,0,0,0.25)",
          overflow:      "hidden",
          animation:     "emgSlideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Franja roja superior */}
        <div style={{ height: "6px", backgroundColor: "#dc2626" }} />

        <div style={{ padding: "20px" }}>
          {/* Ícono */}
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            backgroundColor: "#fee2e2", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 12px",
          }}>
            <PhoneIcon size={22} color="#dc2626" />
          </div>

          {/* Título */}
          <p id="em-title" style={{
            margin: "0 0 4px", textAlign: "center",
            fontSize: "16px", fontWeight: 700, color: "#111827",
          }}>
            Línea de Emergencia
          </p>

          {/* Descripción */}
          <p id="em-desc" style={{
            margin: "0 0 4px", textAlign: "center",
            fontSize: "13px", color: "#6b7280",
          }}>
            ¿Deseas llamar inmediatamente?
          </p>

          {/* Número */}
          <p style={{
            margin: "0 0 18px", textAlign: "center",
            fontSize: "20px", fontWeight: 800,
            letterSpacing: "0.1em", color: "#dc2626",
          }}>
            {EMERGENCY_NUMBER_DISPLAY}
          </p>

          {/* Botones */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              ref={cancelBtnRef}
              onClick={onCancel}
              style={{
                flex: 1, padding: "10px 12px",
                border: "1.5px solid #e5e7eb", borderRadius: "12px",
                backgroundColor: "#fff", color: "#374151",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
              }}
            >
              Cancelar
            </button>

            <a
              href={EMERGENCY_HREF}
              onClick={onConfirm}
              role="button"
              aria-label={`Llamar ahora al ${EMERGENCY_NUMBER_DISPLAY}`}
              style={{
                flex: 1, padding: "10px 12px",
                borderRadius: "12px", border: "none",
                backgroundColor: "#dc2626", color: "#fff",
                fontSize: "13px", fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: "6px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(220,38,38,0.35)",
              }}
            >
              <PhoneIcon size={14} color="white" />
              Llamar ahora
            </a>
          </div>

          <p style={{
            margin: "12px 0 0", textAlign: "center",
            fontSize: "11px", color: "#9ca3af",
          }}>
            Disponible las 24 horas del día
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function EmergencyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastClickRef = useRef<number>(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickRef.current < CLICK_COOLDOWN_MS) return;
    lastClickRef.current = now;

    // Vibración háptica (Android; no disponible en iOS Safari)
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate([80, 40, 120]); } catch {}
    }

    setIsModalOpen(true);
  }, []);

  const handleConfirm = useCallback(() => setIsModalOpen(false), []);
  const handleCancel  = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      {/* Keyframes para heartbeat y modal */}
      <style>{`
        @keyframes emgHeartbeat {
          0%,100% { transform:scale(1);    box-shadow:0 4px 18px rgba(220,38,38,0.45); }
          14%      { transform:scale(1.08); box-shadow:0 6px 24px rgba(220,38,38,0.60); }
          28%      { transform:scale(1); }
          42%      { transform:scale(1.05); box-shadow:0 5px 20px rgba(220,38,38,0.52); }
          70%      { transform:scale(1); }
        }
        @keyframes emgSlideUp {
          from { opacity:0; transform:translateY(18px) scale(0.97); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        #emg-float-btn {
          animation: emgHeartbeat 2.4s ease-in-out infinite;
        }
        #emg-float-btn:hover,
        #emg-float-btn:focus-visible {
          animation-play-state: paused;
          transform: scale(1.06);
        }
        @media (prefers-reduced-motion: reduce) {
          #emg-float-btn { animation: none; }
        }
      `}</style>

      {/* ── Botón flotante compacto ── */}
      <button
        id="emg-float-btn"
        type="button"
        onClick={handleClick}
        aria-label={`Llamada de Emergencia al ${EMERGENCY_NUMBER_DISPLAY}`}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        style={{
          /* Posición fija — siempre visible aunque se haga scroll */
          position:  "fixed",
          bottom:    "20px",
          right:     "20px",
          zIndex:    9998,

          /* Layout interno */
          display:    "flex",
          alignItems: "center",
          gap:        "8px",

          /* Forma de píldora */
          borderRadius: "999px",
          border:       "none",

          /* Colores */
          backgroundColor: "#dc2626",
          color:           "#ffffff",

          /* Tamaño compacto */
          padding:    "9px 16px 9px 10px",
          fontSize:   "13px",
          fontWeight: 600,
          lineHeight: 1,
          whiteSpace: "nowrap",

          /* Interacción */
          cursor:               "pointer",
          userSelect:           "none",
          WebkitTapHighlightColor: "transparent",

          /* Transición suave de color en hover */
          transition: "background-color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
      >
        {/* Círculo semitransparente con ícono de teléfono */}
        <span style={{
          width:           "28px",
          height:          "28px",
          borderRadius:    "50%",
          backgroundColor: "rgba(255,255,255,0.22)",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexShrink:      0,
        }}>
          <PhoneIcon size={15} color="white" />
        </span>

        <span>Llamada de Emergencia</span>
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
