import type { NombreIcono } from './iconos';

/**
 * Modelo de datos del pitch de la Investigación 1 (tema oscuro, lienzo de 1920 × 1080).
 * Cada escena es un objeto con `tipo`; Escenas.tsx lo dibuja y contenido.ts lo rellena.
 *
 * Marcas dentro de los textos (nunca HTML):
 *   **texto**              acento de la escena (color según el contexto)
 *   __texto__              énfasis en blanco
 *   {{verde:texto}}        texto en verde   ·   {{naranja:texto}}  texto en naranja
 *   \n                     salto de línea
 */
export type Tono = 'azul' | 'verde' | 'naranja' | 'rojo' | 'morado';

interface Base<K extends string> {
  tipo: K;
  /** Nombre corto de la escena: título de los puntos de progreso y de los lectores de pantalla. */
  nombre: string;
}

export interface Paso {
  numero: string;
  tono: Tono;
  titulo: string;
  texto: string;
}
export interface ConIcono {
  icono: NombreIcono;
  tono: Tono;
  titulo: string;
  texto: string;
}
export interface Barra {
  nombre: string;
  codigo: string;
  /** Largo de la barra (0–100), solo visual. */
  ancho: number;
  /** Texto de la cifra, p. ej. «+26pp». */
  valor: string;
  tono: 'verde' | 'azul' | 'rojo';
}

interface DatosEscenas {
  portada: {
    etiqueta: string;
    encabezado: string;
    subtitulo: string;
    datos: { etiqueta: string; valor: string }[];
    emblema: { sigla: string; rotulo: string };
  };
  problema: { etiqueta: string; tarjetas: ConIcono[] };
  pregunta: { etiqueta: string; pregunta: string; pildoras: { icono: NombreIcono; texto: string }[] };
  app: {
    etiqueta: string;
    descripcion: string;
    funciones: { icono: NombreIcono; tono: Tono; texto: string }[];
    competenciasTitulo: string;
    competencias: { texto: string; tono?: 'azul' | 'verde' }[];
    modos: { icono: NombreIcono; nombre: string; detalle: string }[];
  };
  metodologia: {
    etiqueta: string;
    pasos: Paso[];
    nota: string;
    grupos: { etiqueta: string; nombre: string; detalle: string }[];
  };
  resultados: {
    etiqueta: string;
    cifras: { valor: string; sufijo: string; sufijoPequeno?: boolean; tono: 'gris' | 'verde' | 'naranja' | 'azul'; etiqueta: string; flechaDespues?: boolean }[];
    destacados: { valor: string; tono: Tono; texto: string }[];
  };
  grupos: {
    etiqueta: string;
    comparados: {
      etiqueta: string;
      titulo: string;
      grande: string;
      unidad: string;
      subetiqueta: string;
      filas: { etiqueta: string; valor: string; tendencia?: 'sube' | 'baja' }[];
    }[];
    interpretacion: { etiqueta: string; titulo: string; texto: string };
  };
  competencias: {
    etiqueta: string;
    mejoran: { titulo: string; barras: Barra[] };
    sinMejora: { titulo: string; barras: Barra[]; nota: string };
  };
  percepcion: {
    etiqueta: string;
    indicadores: { valor: string; porcentaje: number; tono: 'verde' | 'azul' | 'naranja'; texto: string }[];
    contexto: { titulo: string; texto: string }[];
  };
  interpretacion: {
    etiqueta: string;
    columnas: {
      titulo: string;
      tono: 'verde' | 'naranja';
      bloques: { icono: NombreIcono; variante?: 'cautela' | 'riesgo'; titulo: string; texto: string }[];
    }[];
  };
  conclusiones: { etiqueta: string; puntos: { numero: string; texto: string }[] };
  siguientes: {
    etiqueta: string;
    pasos: ConIcono[];
    pregunta: { etiqueta: string; texto: string };
    etiquetas: string[];
  };
  plataforma: {
    etiqueta: string;
    insignia: string;
    encabezado: string;
    descripcion: string;
    pilares: ConIcono[];
  };
  modelo: {
    etiqueta: string;
    pasos: Paso[];
    destacado: { etiqueta: string; texto: string };
    fichas: { texto: string; tono?: 'morado' | 'azul' | 'verde' }[];
  };
  creditos: {
    /** Nombre de la persona que firma el pitch (no confundir con `nombre`, el de la escena). */
    nombrePersona: string;
    rol: string;
    universidad: string;
    semillero: string;
    filas: { etiqueta: string; valor: string }[];
    sello: string;
  };
}

export type Tipo = keyof DatosEscenas;
export type Escenas = { [K in Tipo]: DatosEscenas[K] & Base<K> };
export type Escena = Escenas[Tipo];

/** Textos de la interfaz (título de la pestaña, accesibilidad, ayuda y errores). */
export interface Interfaz {
  titulo: string;
  presentacion: string;
  indice: string;
  navegar: string;
  separadorContador: string;
  errorCompleta: string;
}

export interface Contenido {
  interfaz: Interfaz;
  escenas: Escena[];
}
