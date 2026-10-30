import type { ComparisonItem, Research } from '../../types';

/** Resultados por competencia (póster). Se exporta para reutilizarlos en las métricas globales. */
export const competencias: ComparisonItem[] = [
  { label: 'C1 Clasificación', a: 86.1, b: 91.7, delta: 5.6 },
  { label: 'C2 Nomenclatura', a: 80.6, b: 76.4, delta: -4.2 },
  { label: 'C3 Fórmulas', a: 52.8, b: 79.2, delta: 26.4 },
  { label: 'C4 Ácido-Base', a: 91.7, b: 86.1, delta: -5.6 },
  { label: 'C5 Balanceo', a: 62.0, b: 76.9, delta: 14.8 },
  { label: 'C6 Estequiometría', a: 72.2, b: 94.4, delta: 22.2 },
];

/** Investigación 1 — Póster de Research Summit 2026 (pre-test / post-test). */
export const investigacion1: Research = {
  id: 'investigacion-1',
  number: '01',
  title: 'Elemental: aprendizaje basado en minijuegos para química general',
  category: 'Química general · Estudio pre-test / post-test',
  area: 'Química General',
  status: 'completada',
  authors: 'Brian David Pérez Herrera · Tutora: Diana Angélica Varela Martínez',
  event: 'Research Summit 2026 · Universidad EAN · Semillero Smart Farming',
  date: '12 de mayo de 2026 · Bogotá, Colombia',
  summary:
    'Estudio con 36 estudiantes de química general que compara su desempeño antes y después de usar Elemental, una aplicación educativa basada en minijuegos.',
  tags: ['Pre/Post-test', 'Química general', 'Minijuegos', 'Póster A3'],
  highlights: [
    { value: '+11.6 pp', label: 'Mejora global' },
    { value: '36', label: 'Estudiantes' },
  ],
  poster: {
    pdf: 'investigacion-1/poster.pdf',
    image: 'investigacion-1/poster.png',
    alt: 'Póster de investigación de Elemental, Research Summit 2026 (formato A3 vertical)',
  },
  pitch: {
    href: 'pitch/investigacion-1/',
    label: 'Abrir pitch',
    detail: '15 escenas',
  },
  blocks: [
    {
      type: 'paragraph',
      title: 'Contexto',
      text: 'La química general presenta dificultades frecuentes en competencias como nomenclatura, formulación y balanceo de ecuaciones, especialmente en los primeros cursos universitarios. En este contexto, las aplicaciones educativas basadas en minijuegos surgen como una alternativa para fortalecer el aprendizaje interactivo y la participación estudiantil.',
    },
    {
      type: 'callout',
      title: 'Pregunta de investigación',
      text: '¿Qué cambios en el desempeño inmediato se observan tras el uso de una aplicación educativa basada en minijuegos en estudiantes de química general?',
    },
    {
      type: 'list',
      title: 'Metodología',
      items: [
        'Diseño: pre-test/post-test con 36 estudiantes de química general (Universidad EAN).',
        'Instrumento: 12 preguntas distribuidas en 6 competencias (C1–C6), con contenido diferente entre pre-test y post-test.',
        'Intervención: uso de la aplicación educativa Elemental.',
        'Análisis: comparación pre/post, mejora por categoría y percepción estudiantil.',
      ],
    },
    {
      type: 'stats',
      title: 'Resultados globales (n = 36)',
      items: [
        { value: '71.8%', label: 'Pre-test' },
        { value: '83.3%', label: 'Post-test' },
        { value: '+11.6%', label: 'Mejora global' },
        { value: '61%', label: 'Estudiantes con mejora' },
      ],
    },
    {
      type: 'comparison',
      title: 'Resultados por competencia',
      caption: 'Desempeño (%) pre-test vs. post-test por competencia (n = 36).',
      seriesLabels: ['Pre-test', 'Post-test'],
      items: competencias,
    },
    {
      type: 'stats',
      title: 'Percepción estudiantil (n = 36)',
      items: [
        { value: '89%', label: 'Calificó la app como útil (4–5 sobre 5)' },
        { value: '83%', label: 'La encontró clara' },
        { value: '64%', label: 'Reportó dificultad en nomenclatura y clasificación' },
      ],
    },
    {
      type: 'list',
      title: 'Conclusiones',
      items: [
        'El grupo mejoró +11.6 puntos porcentuales entre pre-test y post-test.',
        'Las mayores mejoras se dieron en C3 Fórmulas (+26.4%), C6 Estequiometría (+22.2%) y C5 Balanceo (+14.8%).',
        'C2 Nomenclatura y C4 Ácido-Base mostraron un leve descenso, consistente con la dificultad reportada por los estudiantes.',
        'El 39% de los estudiantes no presentó mejora; los resultados corresponden a desempeño inmediato, no a retención a largo plazo.',
      ],
    },
    {
      type: 'callout',
      title: 'Alcance de los resultados',
      text: 'No se infiere causalidad fuerte. Se recomienda validación con grupo control y seguimiento longitudinal.',
    },
    {
      type: 'references',
      title: 'Referencias',
      items: [
        'Contreras Espinosa, R. S. (2016). Juegos digitales y gamificación en educación. RIED, 19(2), 27–33.',
        'Domínguez-Díaz et al. (2013). Gamifying learning experiences. Computers & Education, 63, 380–392.',
        'Hernández Sampieri et al. (2014). Metodología de la investigación (6.ª ed.). McGraw-Hill.',
        'Pérez Herrera, B. D. (2026). Elemental [Aplicación educativa]. Desarrollo propio.',
      ],
    },
  ],
};
