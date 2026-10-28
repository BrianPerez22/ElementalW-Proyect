/**
 * Modelo de datos del sitio.
 * Para agregar una nueva investigación NO hay que tocar componentes:
 * crea un archivo en src/data/investigaciones/ y regístralo en index.ts.
 */

export type ResearchStatus = 'completada' | 'en-progreso';

export interface ComparisonItem {
  label: string;
  a: number;
  b: number;
  /** Diferencia tal como la reporta la fuente (si se omite, se calcula b - a) */
  delta?: number;
}

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
      items: ComparisonItem[];
    }
  | {
      type: 'bars';
      title: string;
      caption?: string;
      /** value en porcentaje (0–100) */
      items: { label: string; value: number }[];
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

/** Presentación corta (pitch) que se abre en su propio HTML, aparte del sitio. */
export interface Pitch {
  /** Ruta relativa a la raíz del sitio, p. ej. "pitch/investigacion-2/" */
  href: string;
  /** Texto del botón en la tarjeta */
  label: string;
  /** Texto auxiliar, p. ej. "12 escenas · 5 minutos" */
  detail?: string;
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
  /** Colaboradores (opcional); se muestran en los créditos del detalle */
  collaborators?: string;
  /** Ej. "Research Summit 2026 · Universidad EAN" */
  event?: string;
  date?: string;
  summary: string;
  tags: string[];
  /** Cifras cortas que se muestran en la tarjeta */
  highlights?: { value: string; label: string }[];
  poster?: Poster;
  /** Si existe, la tarjeta muestra un botón que abre el pitch en otra página */
  pitch?: Pitch;
  blocks: ContentBlock[];
}

export interface GlobalMetric {
  value: string;
  label: string;
  detail?: string;
  /** Origen del dato: ayuda a que se lea de dónde sale cada cifra */
  source: string;
}

interface ChartBase {
  /** De qué investigación sale el dato */
  source: string;
  /** Ocupa las dos columnas en pantallas grandes */
  wide?: boolean;
}

/** Gráficas de la sección "Métricas globales". */
export type MetricChart =
  | (ChartBase & Extract<ContentBlock, { type: 'comparison' }>)
  | (ChartBase & {
      type: 'bars';
      title: string;
      caption?: string;
      /** value en porcentaje (0–100) */
      items: { label: string; value: number }[];
    })
  | (ChartBase & {
      type: 'donut';
      title: string;
      caption?: string;
      /** Porcentaje (0–100) de la parte destacada */
      value: number;
      label: string;
      restLabel: string;
    })
  | (ChartBase & {
      type: 'sources';
      title: string;
      caption?: string;
      inputs: string[];
      output: string;
    });
