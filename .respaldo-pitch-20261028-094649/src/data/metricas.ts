import type { GlobalMetric, MetricChart } from '../types';
import { investigaciones } from './investigaciones';
import { competencias } from './investigaciones/investigacion-1';

const enProgreso = investigaciones.filter((r) => r.status === 'en-progreso').length;
const completadas = investigaciones.length - enProgreso;

/**
 * Métricas globales y básicas (solo para presentación).
 * Las cifras de la Investigación 1 salen de su póster; la Investigación 2 sigue en progreso,
 * por eso aquí solo aparece información descriptiva, sin resultados.
 */
export const globalMetrics: GlobalMetric[] = [
  {
    value: String(investigaciones.length),
    label: 'Investigaciones',
    detail: `${completadas} completada · ${enProgreso} en progreso`,
    source: 'Global',
  },
  { value: '36', label: 'Estudiantes participantes', detail: 'Química general, Universidad EAN', source: 'Investigación 1' },
  { value: '+11.6 pp', label: 'Mejora global pre → post', detail: '71.8% → 83.3%', source: 'Investigación 1' },
  { value: '89%', label: 'Calificó la app como útil', detail: '4–5 sobre 5', source: 'Investigación 1' },
  { value: '6', label: 'Competencias evaluadas', detail: 'C1–C6 · 12 preguntas', source: 'Investigación 1' },
  { value: '2', label: 'Líneas de datos', detail: 'Encuestas/entrevistas y telemetría', source: 'Investigación 2 (en progreso)' },
];

/** Gráficas de la sección de métricas, en el orden en que se muestran. */
export const globalCharts: MetricChart[] = [
  {
    type: 'comparison',
    source: 'Investigación 1',
    title: 'Desempeño global',
    caption: 'Promedio del grupo completo (n = 36).',
    seriesLabels: ['Pre-test', 'Post-test'],
    items: [{ label: 'Grupo completo', a: 71.8, b: 83.3, delta: 11.6 }],
  },
  {
    type: 'donut',
    source: 'Investigación 1',
    title: 'Estudiantes con mejora',
    caption: 'Del total de participantes (n = 36).',
    value: 61,
    label: 'Con mejora',
    restLabel: 'Sin mejora',
  },
  {
    type: 'bars',
    source: 'Investigación 1',
    title: 'Percepción estudiantil',
    caption: 'Porcentaje de estudiantes (n = 36).',
    items: [
      { label: 'La calificó como útil (4–5 de 5)', value: 89 },
      { label: 'La encontró clara', value: 83 },
      { label: 'Reportó dificultad en nomenclatura y clasificación', value: 64 },
    ],
  },
  {
    type: 'sources',
    source: 'Investigación 2 (en progreso)',
    title: 'Fuentes de datos',
    caption: 'Todavía sin resultados: así se combinarán las dos líneas.',
    inputs: ['Encuestas y entrevistas', 'Telemetría (Learning Analytics)'],
    output: 'Patrones, barreras y criterios para mejorar',
  },
  {
    type: 'comparison',
    wide: true,
    source: 'Investigación 1',
    title: 'Desempeño por competencia',
    caption: 'Pre-test vs. post-test por competencia (n = 36).',
    seriesLabels: ['Pre-test', 'Post-test'],
    items: competencias,
  },
];
