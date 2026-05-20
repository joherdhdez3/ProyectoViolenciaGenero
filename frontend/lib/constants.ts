// lib/constants.ts
// Datos estáticos de la plataforma VPMRG — solo CDMX
// En producción estos vendrían de una API o base de datos

import type {
  NavItem,
  RutaPaso,
  EvidenciaSeccion,
  BibliotecaItem,
  InstitucionDiagnostico,
  InstitucionDirectorio,
} from '@/types'

// ─── Navegación ───────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { id: 'inicio',      label: 'Inicio',      href: '/'           },
  { id: 'diagnostico', label: 'Diagnóstico', href: '/diagnostico' },
  { id: 'evidencia',   label: 'Evidencia',   href: '/evidencia'  },
  { id: 'biblioteca',  label: 'Biblioteca',  href: '/biblioteca' },
  { id: 'directorio',  label: 'Directorio',  href: '/directorio' },
]

// Rutas que comparten la pestaña activa "Diagnóstico"
export const DIAGNOSTICO_GRUPO = ['/diagnostico', '/ruta', '/relato']

// ─── Alcaldías CDMX ───────────────────────────────────────────────────────────
export const ALCALDIAS_CDMX: string[] = [
  'Álvaro Obregón',
  'Azcapotzalco',
  'Benito Juárez',
  'Coyoacán',
  'Cuajimalpa de Morelos',
  'Cuauhtémoc',
  'Gustavo A. Madero',
  'Iztacalco',
  'Iztapalapa',
  'La Magdalena Contreras',
  'Miguel Hidalgo',
  'Milpa Alta',
  'Tláhuac',
  'Tlalpan',
  'Venustiano Carranza',
  'Xochimilco',
]

// ─── Cargos políticos ─────────────────────────────────────────────────────────
export const CARGOS_POLITICOS: string[] = [
  'Candidata a cargo de elección popular',
  'Diputada local',
  'Concejala',
  'Funcionaria pública designada',
  'Militante o dirigente de partido político',
  'Activista o defensora de derechos',
  'Otro cargo político',
]

// ─── Diagnóstico ──────────────────────────────────────────────────────────────
export const CONDUCTAS: string[] = [
  'Obstaculización del cargo',
  'Violencia simbólica',
  'Violencia digital',
  'Exclusión de toma de decisiones',
  'Difamación',
]

export const DERECHOS: string[] = [
  'Derecho al ejercicio del cargo público sin obstaculización',
  'Derecho a la no discriminación en el ámbito político-electoral',
  'Principio de paridad de género en el desempeño del cargo',
  'Derecho a la integridad y dignidad política de las mujeres',
]

export const INSTITUCIONES_DIAGNOSTICO: InstitucionDiagnostico[] = [
  {
    nombre: 'INE — Unidad Técnica de Género',
    desc:   'Obstaculización del cargo / exclusión de decisiones',
  },
  {
    nombre: 'TEPJF',
    desc:   'Omisiones de autoridades electorales locales',
  },
  {
    nombre: 'Fiscalía Especializada (FEPADE)',
    desc:   'Violencia digital / difamación',
  },
]

// ─── Ruta institucional ───────────────────────────────────────────────────────
export const RUTA_PASOS: RutaPaso[] = [
  {
    titulo:    'Reúne tu evidencia',
    desc:      'Antes de presentar cualquier queja, organiza tu documentación: capturas de pantalla, oficios, correos, audios, testigos y cualquier documentación institucional relevante.',
    linkLabel: 'Checklist de evidencia →',
    linkTo:    '/evidencia',
  },
  {
    titulo:    'Presenta queja ante el INE — Unidad Técnica de Género',
    desc:      'Por obstaculización del cargo y exclusión de toma de decisiones. Presenta escrito con tu cargo, descripción cronológica de los hechos y pruebas.',
    linkLabel: null,
    linkTo:    null,
  },
  {
    titulo:    'Denuncia ante la Fiscalía Especializada (FEPADE)',
    desc:      'Por difusión de información falsa como acto de violencia digital y difamación. Puedes presentar denuncia en línea o de forma presencial.',
    linkLabel: null,
    linkTo:    null,
  },
  {
    titulo:    'Recurre al TEPJF si no hay respuesta institucional',
    desc:      'Ante omisiones o respuestas insuficientes de las autoridades electorales locales, el Tribunal Electoral es la instancia de alzada.',
    linkLabel: null,
    linkTo:    null,
  },
]

// ─── Evidencia ────────────────────────────────────────────────────────────────
export const EVIDENCIA_SECCIONES: EvidenciaSeccion[] = [
  {
    titulo: '📱 Evidencia digital',
    items: [
      'Capturas de pantalla de mensajes, publicaciones o comentarios ofensivos (con fecha y hora visibles)',
      'Registros de llamadas o audios de amenazas / hostigamiento',
      'Correos electrónicos o comunicaciones institucionales relevantes',
      'Evidencia de exclusión de grupos de WhatsApp, canales oficiales o plataformas de trabajo',
    ],
  },
  {
    titulo: '📄 Documentación oficial',
    items: [
      'Actas de sesión de cabildo donde se evidencie la exclusión o impedimento',
      'Oficios, memorándums o comunicaciones formales que avalen los hechos',
      'Resoluciones o acuerdos que te hayan afectado en el ejercicio del cargo',
      'Tu nombramiento o credencial del cargo que desempeñas',
    ],
  },
  {
    titulo: '👥 Testimonios y testigos',
    items: [
      'Nombre y datos de contacto de testigos presenciales (no es obligatorio incluirlos)',
      'Declaraciones escritas de personas que presenciaron los hechos',
      'Actas o registros de organizaciones de la sociedad civil que acompañen el caso',
    ],
  },
  {
    titulo: '📅 Registro cronológico',
    items: [
      'Lista ordenada de los hechos con fecha, lugar y descripción de cada uno',
      'Bitácora personal con anotaciones de incidentes (puede ser manual o digital)',
    ],
  },
]

// ─── Biblioteca ───────────────────────────────────────────────────────────────
export const BIBLIOTECA: BibliotecaItem[] = [
  {
    tipo:   'Ley Federal',
    anio:   '2023',
    titulo: 'Ley General de Acceso de las Mujeres a una Vida Libre de Violencia',
    desc:   'Marco normativo federal que define la violencia política en razón de género y establece las obligaciones del Estado.',
  },
  {
    tipo:   'Protocolo',
    anio:   '2024',
    titulo: 'Protocolo para la Atención de la Violencia Política — INE',
    desc:   'Procedimiento oficial del INE para la presentación, sustanciación y resolución de quejas por violencia política.',
  },
  {
    tipo:   'Sentencia',
    anio:   '2022',
    titulo: 'Sentencia SUP-JDC-1234/2022 — TEPJF',
    desc:   'Criterio jurisprudencial del Tribunal Electoral sobre obstaculización del cargo en mujeres electas.',
  },
  {
    tipo:   'Guía',
    anio:   '2024',
    titulo: '¿Qué es la violencia política en razón de género?',
    desc:   'Explicación accesible de los tipos, conductas, responsables y vías de denuncia. Elaborada con lenguaje sencillo.',
  },
  {
    tipo:   'Ley Federal',
    anio:   '2020',
    titulo: 'Reforma al Código Penal — Violencia política de género',
    desc:   'Tipos penales específicos, sanciones y responsables. Incluye delitos electorales con perspectiva de género.',
  },
  {
    tipo:   'Guía',
    anio:   '2024',
    titulo: 'Guía de autodefensa digital para mujeres políticas',
    desc:   'Herramientas y estrategias para documentar, reportar y protegerte ante la violencia digital en el ámbito político.',
  },
]

export const BIBLIO_TABS: string[] = ['Todas', 'Leyes', 'Protocolos', 'Derechos']

// ─── Directorio ───────────────────────────────────────────────────────────────
export const DIRECTORIO: InstitucionDirectorio[] = [
  {
    nombre: 'INE — Instituto Nacional Electoral',
    area:   'Unidad Técnica de Género',
    ambito: 'Nacional',
    tipo:   'Institutos electorales',
    tel:    '800 433 2000',
    email:  'unitecgenero@ine.mx',
    desc:   'Quejas por obstaculización del cargo, exclusión de decisiones y violencia simbólica en el ámbito electoral.',
  },
  {
    nombre: 'TEPJF — Tribunal Electoral del Poder Judicial',
    area:   'Sala Superior',
    ambito: 'Nacional',
    tipo:   'Tribunales',
    tel:    '800 835 3783',
    email:  'orientacion@tepjf.gob.mx',
    desc:   'Recurso de apelación y juicio de la ciudadanía. Segunda instancia ante omisiones de autoridades electorales.',
  },
  {
    nombre: 'FEPADE — Fiscalía Especializada',
    area:   'Ministerio Público Federal',
    ambito: 'Nacional',
    tipo:   'Fiscalías',
    tel:    '800 FEPADE1',
    email:  'atencion.ciudadana@pgr.gob.mx',
    desc:   'Delitos electorales, violencia digital y difamación como instrumentos de violencia política de género.',
  },
  {
    nombre: 'IECM — Instituto Electoral de la Ciudad de México',
    area:   'Instituto Electoral Local',
    ambito: 'Ciudad de México',
    tipo:   'Institutos electorales',
    tel:    '55 1391 1391',
    email:  'atencion@iecm.mx',
    desc:   'Quejas ante autoridad electoral local de la CDMX. Procedimientos de responsabilidad contra actores políticos.',
  },
  {
    nombre: 'SEMUJERES CDMX',
    area:   'Secretaría de las Mujeres',
    ambito: 'Ciudad de México',
    tipo:   'Redes de apoyo',
    tel:    '55 5512 5898',
    email:  'atencion@semujeres.cdmx.gob.mx',
    desc:   'Orientación y acompañamiento para mujeres en CDMX. Atención especializada en violencia política y de género.',
  },
  {
    nombre: 'Red de Mujeres en Plural',
    area:   'Organización de la Sociedad Civil',
    ambito: 'Nacional',
    tipo:   'Redes de apoyo',
    tel:    '55 5512 7700',
    email:  'contacto@mujeresplural.mx',
    desc:   'Acompañamiento jurídico, psicológico y político para mujeres que enfrentan violencia política de género.',
  },
  {
    nombre: 'INMUJERES — Instituto Nacional de las Mujeres',
    area:   'Secretaría de Gobernación',
    ambito: 'Nacional',
    tipo:   'Redes de apoyo',
    tel:    '800 911 2000',
    email:  'inmujeres@inmujeres.gob.mx',
    desc:   'Orientación, canalización y acompañamiento. Línea de atención especializada para mujeres en situación de violencia.',
  },
]

export const AMBITOS_DIRECTORIO: string[]  = ['Todos', 'Nacional', 'Ciudad de México']
export const TIPOS_INSTITUCION: string[]   = ['Todas', 'Institutos electorales', 'Fiscalías', 'Tribunales', 'Redes de apoyo']

// ─── Aviso legal ──────────────────────────────────────────────────────────────
export const AVISO_LEGAL =
  'Esta plataforma no sustituye la asesoría jurídica profesional ni a las autoridades competentes. Actúa como puente seguro y especializado entre las usuarias y las instituciones competentes.'
