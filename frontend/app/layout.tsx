// app/layout.tsx
// Server Component — layout raíz de la aplicación.
// Importa globals.css aquí para que aplique a toda la app.
// Nav es Client Component (necesita usePathname); el resto es Server.

import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import { RelatoProvider } from '@/context/RelatoContext'
import EmergencyButton from "@/components/ui/EmergencyButton";
import './globals.css'

export const metadata: Metadata = {
  title: {
    default:  'Plataforma VPMRG',
    template: '%s | Plataforma VPMRG',
  },
  description:
    'Orientación jurídica anónima para mujeres en situación de violencia política en razón de género — Ciudad de México.',
  robots: { index: false, follow: false }, // plataforma de apoyo, no debe indexarse
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {/* RelatoProvider envuelve toda la app para compartir el relato
            entre Inicio → Diagnóstico → Relato de hechos */}
        <RelatoProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <footer className="footer">
            Plataforma VPMRG — Hackathon 2026&nbsp;|&nbsp;
            Orientación inicial, no asesoría jurídica&nbsp;|&nbsp;
            Plataforma anónima · Ciudad de México
          </footer>
          <EmergencyButton />
        </RelatoProvider>
      </body>
    </html>
  )
}
