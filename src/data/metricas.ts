import type { GlobalMetric } from '../types';
import { investigaciones } from './investigaciones';

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
  {
    value: '36',
    label: 'Estudiantes participantes',
    detail: 'Química general, Universidad EAN',
    source: 'Investigación 1',
  },
  {
    value: '+11.6 pp',
    label: 'Mejora global pre → post',
    detail: '71.8% → 83.3%',
    source: 'Investigación 1',
  },
  {
    value: '89%',
    label: 'Calificó la app como útil',
    detail: '4–5 sobre 5',
    source: 'Investigación 1',
  },
  {
    value: '6',
    label: 'Competencias evaluadas',
    detail: 'C1–C6 · 12 preguntas',
    source: 'Investigación 1',
  },
  {
    value: '2',
    label: 'Líneas de datos',
    detail: 'Encuestas/entrevistas y telemetría',
    source: 'Investigación 2 (en progreso)',
  },
];
