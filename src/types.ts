/**
 * Modelo de datos del sitio.
 * Para agregar una nueva investigación NO hay que tocar componentes:
 * crea un archivo en src/data/investigaciones/ y regístralo en index.ts.
 */

export type ResearchStatus = 'completada' | 'en-progreso';

/** Bloques de contenido que se renderizan (en orden) dentro del detalle de una investigación. */
export type ContentBlock =
  | { type: 'paragraph'; title?: string; text: string }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'stats'; title?: string; items: { value: string; label: string }[] }
  | {
      type: 'comparison';
      title: string;
      caption?: string;
      /** Nombres de las dos series, p. ej. ['Pre-test', 'Post-test'] */
      seriesLabels: [string, string];
      items: { label: string; a: number; b: number }[];
    }
  | { type: 'table'; title?: string; columns: string[]; rows: string[][] }
  | { type: 'list'; title?: string; items: string[]; tone?: 'default' | 'warning' }
  | { type: 'references'; title?: string; items: string[] };

export interface Poster {
  /** Ruta dentro de /public, p. ej. "investigacion-1/poster.pdf" */
  pdf: string;
  /** Imagen de vista previa del póster (PNG/JPG) */
  image: string;
  alt: string;
}

export interface Research {
  /** Se usa en la URL (#id) y como clave. Único. */
  id: string;
  /** "01", "02"... */
  number: string;
  title: string;
  category: string;
  area: string;
  status: ResearchStatus;
  authors: string;
  /** Ej. "Research Summit 2026 · Universidad EAN" */
  event?: string;
  date?: string;
  summary: string;
  tags: string[];
  /** Cifras cortas que se muestran en la tarjeta */
  highlights?: { value: string; label: string }[];
  poster?: Poster;
  blocks: ContentBlock[];
}

export interface GlobalMetric {
  value: string;
  label: string;
  detail?: string;
  /** Origen del dato: ayuda a que se lea de dónde sale cada cifra */
  source: string;
}
