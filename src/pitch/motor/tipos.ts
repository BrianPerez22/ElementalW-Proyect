/**
 * Modelo de datos de un pitch. Cada pitch (src/pitch/<nombre>/contenido.ts) exporta un `Contenido`
 * y el motor (src/pitch/motor/) lo dibuja sin conocer su texto.
 */
export interface Tarjeta {
  numero?: string | number;
  personaje?: string | undefined;
  titulo?: string;
  texto?: string;
}
export interface Metrica extends Tarjeta {
  valor: number;
  decimales?: number;
  signo?: boolean;
  unidad?: string;
  /** Si existe, la métrica dibuja un medidor (valor ÷ máximo): «46 de 50», «76 de 100», «3 de 4». */
  maximo?: number;
}
export interface Grafica {
  titulo: string;
  minimo: number;
  maximo: number;
  marcas: number[];
  unidad?: string;
  signo?: boolean;
  series: { nombre: string; valor: number }[];
}
export interface Criterio {
  codigo: string;
  texto: string;
  alta?: boolean;
}
interface Base<K extends string> {
  tipo: K;
  tema: string;
  titulo: string;
  seccion?: string;
  globo: string;
  personaje: string;
}
interface DatosEscenas {
  portada: { etiqueta: string; subtitulo: string; datos: Tarjeta[] };
  pregunta: { pregunta: string; tarjetas: Tarjeta[] };
  herramienta: {
    resumen: string;
    tarjetas: Tarjeta[];
    actividades: Tarjeta[];
    tituloSimuladores: string;
  };
  metodo: { pasos: Tarjeta[]; grupos: (Tarjeta & { valor: string })[]; metrica: Tarjeta };
  cifras: { metricas: Metrica[]; nota: Tarjeta };
  simulador: { grafica: Grafica; conclusion: Tarjeta };
  hallazgos: { columnas: { titulo: string; tarjetas: Tarjeta[] }[] };
  triangulacion: { metricas: Metrica[]; tarjetas: Tarjeta[] };
  criterios: { columnas: { titulo: string; criterios: Criterio[] }[]; leyenda: string };
  siguientes: { pasos: Tarjeta[]; pregunta: Tarjeta };
  conclusiones: { puntos: Tarjeta[] };
  gracias: { nombre: string; descripcion: string; personas: Tarjeta[]; personajes: string[] };
}
export type Tipo = keyof DatosEscenas;
export type Escenas = { [K in Tipo]: DatosEscenas[K] & Base<K> };
export type Escena = Escenas[Tipo];
interface Diseno {
  decoracion: [string, number, number, number][];
  estrellas: [number, number, number, string?, number?][];
  puntos?: [number, number, number, string][];
  personaje?: string;
}
/** Textos de la interfaz (controles, accesibilidad y formato de números). */
export type Interfaz = Contenido["interfaz"];

export interface Contenido {
  interfaz: Record<
    | "titulo"
    | "presentacion"
    | "marca"
    | "pie"
    | "anterior"
    | "siguiente"
    | "indice"
    | "progreso"
    | "completa"
    | "salirCompleta"
    | "ayuda"
    | "errorCompleta"
    | "errorImagen"
    | "separadorContador"
    | "decimal"
    | "positivo"
    | "negativo"
    | "porcentaje"
    | "puntos",
    string
  >;
  /** Clave → ruta dentro de src/pitch/recursos/ (p. ej. "chispa/Circulo/chispa-circulo-rosa.svg"). */
  assets: Record<string, string>;
  diseno: Record<Tipo, Diseno>;
  simuladores: { personaje: string; codigo: string; nombre: string }[];
  escenas: Escena[];
}
