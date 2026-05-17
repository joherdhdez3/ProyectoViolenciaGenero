// types/index.ts
// Tipos centralizados de la plataforma VPMRG

export interface NavItem {
  id: string
  label: string
  href: string
}

export interface RutaPaso {
  titulo: string
  desc: string
  linkLabel: string | null
  linkTo: string | null
}

export interface EvidenciaSeccion {
  titulo: string
  items: string[]
}

export interface BibliotecaItem {
  tipo: string
  anio: string
  titulo: string
  desc: string
}

export interface InstitucionDiagnostico {
  nombre: string
  desc: string
}

export interface InstitucionDirectorio {
  nombre: string
  area: string
  ambito: string
  tipo: string
  tel: string
  email: string
  desc: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface FormRelato {
  cargo: string
  alcaldia: string
  autoridad: string
  fechaInicio: string
  fechaFin: string
}
