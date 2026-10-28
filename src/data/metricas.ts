import type { GlobalMetric, MetricChart } from '../types';
import { investigaciones } from './investigaciones';

const enProgreso = investigaciones.filter((r) => r.status === 'en-progreso').length;
const completadas = investigaciones.length - enProgreso;

// Participantes de cada estudio (póster de la Investigación 1 y póster/informe de la Investigación 2).
const estudiantesInv1 = 36;
const estudiantesInv2 = 46;
const estudiantesTotal = estudiantesInv1 + estudiantesInv2;

/**
 * Métricas globales (solo para presentación).
 * Panorama de TODO lo investigado hasta ahora entre las dos investigaciones: no entra al detalle
 * de cada una (para eso está su ficha). Las cifras salen de los pósteres de cada investigación.
 */
export const globalMetrics: GlobalMetric[] = [
  {
    value: String(investigaciones.length),
    label: 'Investigaciones',
    detail: enProgreso === 0 ? `${completadas} completadas` : `${completadas} completada · ${enProgreso} en progreso`,
    source: 'Global',
  },
  {
    value: String(estudiantesTotal),
    label: 'Participaciones de estudiantes',
    detail: `${estudiantesInv1} en la Inv. 1 + ${estudiantesInv2} en la Inv. 2 · y 4 docentes`,
    source: 'Investigaciones 1 y 2',
  },
  {
    value: '2',
    label: 'Áreas de ciencias básicas',
    detail: 'Química general y Física mecánica · Universidad EAN',
    source: 'Investigaciones 1 y 2',
  },
  {
    value: '7',
    label: 'Fuentes de datos',
    detail: '2 en la Inv. 1 (pre/post-test y percepción) · 5 en la Inv. 2',
    source: 'Investigaciones 1 y 2',
  },
  {
    value: '4,58',
    label: 'Satisfacción media (escala de 1 a 5)',
    detail: 'Inv. 2 · en la Inv. 1, el 89% la calificó útil (4–5 de 5)',
    source: 'Investigaciones 1 y 2',
  },
  {
    value: '18',
    label: 'Criterios de diseño propuestos',
    detail: 'Pedagógicos, funcionales y de usabilidad · 13 de prioridad alta',
    source: 'Investigación 2',
  },
];

/** Gráficas de la sección de métricas, en el orden en que se muestran. */
export const globalCharts: MetricChart[] = [
  {
    type: 'donut',
    source: 'Investigaciones 1 y 2',
    title: 'Estudiantes participantes',
    caption: `${estudiantesTotal} participaciones en total. No se verificó si algún estudiante estuvo en ambos estudios.`,
    value: Math.round((estudiantesInv1 / estudiantesTotal) * 100),
    label: `Inv. 1 · Química general (${estudiantesInv1})`,
    restLabel: `Inv. 2 · Física y Química (${estudiantesInv2})`,
  },
  {
    type: 'bars',
    source: 'Investigaciones 1 y 2',
    title: 'Aceptación y lectura crítica',
    caption: 'Porcentaje de estudiantes (Inv. 1, n = 36) o de intentos (Inv. 2, 90 intentos).',
    items: [
      { label: 'Inv. 1 · Calificó la app como útil (4–5 de 5)', value: 89 },
      { label: 'Inv. 1 · La encontró clara', value: 83 },
      { label: 'Inv. 2 · Intentos satisfactorios o dominados', value: 76 },
      { label: 'Inv. 2 · Intentos que marcaron 5 en todo (efecto techo)', value: 49 },
    ],
  },
  {
    type: 'comparison',
    source: 'Investigación 1',
    title: 'Mejora tras usar Elemental',
    caption: 'Desempeño inmediato, pre-test vs. post-test (n = 36): grupo completo y las competencias que más mejoraron.',
    seriesLabels: ['Pre-test', 'Post-test'],
    items: [
      { label: 'Grupo completo', a: 71.8, b: 83.3, delta: 11.6 },
      { label: 'Fórmulas', a: 52.8, b: 79.2, delta: 26.4 },
      { label: 'Estequiometría', a: 72.2, b: 94.4, delta: 22.2 },
      { label: 'Balanceo', a: 62.0, b: 76.9, delta: 14.8 },
    ],
  },
  {
    type: 'bars',
    source: 'Investigación 2',
    title: 'Lo que mejor funcionó',
    caption: 'Física y Química en la Universidad EAN: evaluaciones finales y percepción de uso.',
    items: [
      { label: 'Acierto medio en Clasificación de la materia', value: 95 },
      { label: 'Estudiantes entrevistados que vieron la interfaz sencilla (11 de 13)', value: 85 },
      { label: 'Acierto medio en Física · Múltiples dimensiones', value: 84 },
      { label: 'Intentos satisfactorios o dominados', value: 76 },
    ],
  },
  {
    type: 'sources',
    wide: true,
    source: 'Investigaciones 1 y 2',
    title: 'Del aula a la evidencia',
    caption: 'Elemental ya se probó en clases reales de dos áreas de ciencias básicas y dejó una ruta clara de mejora.',
    inputs: [
      '82 participaciones de estudiantes y 4 docentes',
      'Química general y Física mecánica · Universidad EAN',
      '7 fuentes de datos contrastadas entre sí',
      '2 pósteres académicos: Research Summit 2026 y V EISI 2026',
    ],
    output: 'Una app aceptada en el aula y 18 criterios para seguir creciendo',
  },
];
