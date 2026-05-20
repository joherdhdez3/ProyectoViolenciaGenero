'use client'

// context/RelatoContext.tsx
// Estado global para el relato de la usuaria.
// Se usa Context en lugar de prop-drilling porque el relato
// se comparte entre Inicio → Diagnóstico → Relato de hechos.
// En un proyecto más grande se usaría Zustand o Jotai.

import { createContext, useContext, useState, ReactNode } from 'react'

interface RelatoContextType {
  relato: string
  setRelato: (texto: string) => void
  casoId: string
  setCasoId: (id: string) => void
}

const RelatoContext = createContext<RelatoContextType | null>(null)

export function RelatoProvider({ children }: { children: ReactNode }) {
  const [relato, setRelato] = useState('')
  const [casoId, setCasoId] = useState('')

  return (
    <RelatoContext.Provider value={{ relato, setRelato, casoId, setCasoId }}>
      {children}
    </RelatoContext.Provider>
  )
}

export function useRelato(): RelatoContextType {
  const ctx = useContext(RelatoContext)
  if (!ctx) throw new Error('useRelato debe usarse dentro de <RelatoProvider>')
  return ctx
}
