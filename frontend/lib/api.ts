interface RutaResponse {
  diagnostico_ruta?: string;
}

// Definición de los datos necesita recibir la función (ChatRequest de FastAPI)
interface RelatoPayload {
  relato_usuario: string; // En TypeScript se usa 'string' 
}


export async function obtenerRutaInstitucional(casoId: string): Promise<RutaResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const response = await fetch(`${baseUrl}/api/v1/caso/${casoId}/ruta`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

// Definición de los datos que va a devolver el backend
interface AnalisisResponse {
  caso_id: string;
  nivel_vpmrg: string;
  conductas: string[];
  derechos_vulnerados: string[];
  resumen_orientacion: string;  
}

//Función que hace la petición HTTP
export async function enviarRelato(payload: RelatoPayload): Promise<AnalisisResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Petición HTTP
  const response = await fetch(`${baseUrl}/api/v1/analisis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // JSON
    },
    body: JSON.stringify(payload), // Convierte el objeto de JavaScript a texto JSON
  });

  // Respuesta convertida en objeto
  return response.json();
}


// Se define la estructura de los datos personales de la usuaria
export interface DatosQuejosa {
  nombre_completo: string;
  cargo_funcion: string;
  municipio_alcaldia: string;
  autoridad_denunciada: string;
}

// Se define lo que se envia al backend
interface RelatoFormalPayload {
  caso_id: string;
  datos_quejosa: DatosQuejosa;
}

// Se define respuesta del backend
interface RelatoFormalResponse {
  proemio: string;
  antecedentes: string;
  hechos_ordenados: string;
  url_pdf: string; 
}

// Función que enviará los datos
export async function enviarRelatoFormal(payload: RelatoFormalPayload): Promise<RelatoFormalResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${baseUrl}/api/v1/relato-formal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export interface EvidenciasResponse {
  categorias: {
    categoria: string
    evidencias: string[]
  }[]
  notas_importantes: string[]
}

// Evidencias sugeridas para un caso específico
export async function obtenerEvidencias(
  casoId: string
): Promise<EvidenciasResponse> {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  
  // Si no hay casoId, el backend puede manejar un catálogo general
  const url = `${API_URL}/api/v1/evidencia/catalogo`

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error('Error al obtener el catálogo de evidencias');
  }
  console.log('Respuesta evidencias:', await res.clone().json());
  return res.json();
}
