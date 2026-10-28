import type { Research } from '../../types';

/**
 * Acierto medio por evaluación final (Figura 1 del póster, 90 intentos).
 * Se exporta para reutilizarlo en las métricas globales.
 * * = probablemente subestimado por la falla de la actividad «unir».
 */
export const aciertoEvaluaciones = [
  { label: 'Física · Múltiples dimensiones', value: 84 },
  { label: 'Química · Clasificación de la materia', value: 95 },
  { label: 'Química · Teoría atómica*', value: 69 },
  { label: 'Química · Periodicidad y enlaces*', value: 64 },
  { label: 'Química · Familias inorgánicas*', value: 68 },
];

/** Investigación 2 — Póster V EISI 2026 (estudio mixto convergente en Física y Química). */
export const investigacion2: Research = {
  id: 'investigacion-2',
  number: '02',
  title: 'Criterios para la implementación de gamificación web en educación superior',
  category: 'Estudio mixto convergente · Física Mecánica y Química General',
  area: 'Ciencias Básicas (Física y Química)',
  status: 'completada',
  authors: 'Brian David Pérez Herrera · Daniela Sophia Coavas Barboza',
  collaborators:
    'Juan David Serrato Alvarado · Andrea Carolina Mora Lopez · Karen Sofia Ovalle Morales · Ariana Guerrero Rios',
  event: 'V EISI 2026 · Universidad EAN · Semillero Smart Farming · Plataforma Elemental-W',
  date: '29 de octubre de 2026 · Bogotá, Colombia',
  summary:
    'Estudio con 46 estudiantes y 4 docentes de Física Mecánica y Química General que identifica qué criterios pedagógicos, funcionales y de usabilidad debe cumplir una plataforma web gamificada para funcionar bien en ciencias básicas.',
  tags: ['Estudio mixto', 'Física y Química', '18 criterios', 'Learning Analytics', 'Póster V EISI'],
  highlights: [
    { value: '46', label: 'Estudiantes' },
    { value: '18', label: 'Criterios' },
  ],
  poster: {
    pdf: 'investigacion-2/poster.pdf',
    image: 'investigacion-2/poster.png',
    alt: 'Póster «Criterios para la implementación de gamificación web en educación superior», V EISI 2026',
  },
  pitch: {
    href: 'pitch/investigacion-2/',
    label: 'Abrir pitch',
    detail: '12 escenas · 5 minutos',
  },
  blocks: [
    {
      type: 'paragraph',
      title: 'Contexto',
      text: 'La gamificación puede elevar la motivación en educación superior, pero la evidencia es mixta y depende del diseño. Falta saber qué debe cumplir una plataforma web gamificada para funcionar bien en ciencias básicas. Elemental-W es el medio de apoyo del estudio, no su objeto: llevó la gamificación al aula y recogió los datos.',
    },
    {
      type: 'callout',
      title: 'Pregunta de investigación',
      text: '¿Qué criterios pedagógicos, funcionales y de usabilidad favorecen la implementación de plataformas web gamificadas para enseñar ciencias básicas en educación superior?',
    },
    {
      type: 'list',
      title: 'Método',
      items: [
        'Diseño mixto convergente y exploratorio, sin grupo de control.',
        'Dos cursos: Física Mecánica (23 inscritos) y Química General (21 inscritos); 46 de 50 estudiantes registrados tuvieron actividad, y participaron 4 docentes.',
        'Plataforma Elemental-W: 7 minijuegos y 6 simuladores, con 35 experiencias en Química y 35 en Física.',
        'Cinco fuentes de datos: evaluaciones finales, quiz de fricción, telemetría, 57 entrevistas y encuestas, y reportes de error.',
        'Triangulación: cada criterio se contrastó con al menos dos fuentes (lo que dicen, lo que hacen y lo que falla). Corte de datos: 26 de octubre de 2026.',
      ],
    },
    {
      type: 'stats',
      title: 'Resultados en cifras',
      items: [
        { value: '46', label: 'Estudiantes con actividad' },
        { value: '90', label: 'Evaluaciones finales' },
        { value: '4,58', label: 'Satisfacción media (1 a 5)' },
        { value: '76%', label: 'Intentos satisfactorios o dominados' },
        { value: '223', label: 'Lanzamientos del simulador' },
        { value: '57', label: 'Entrevistas y encuestas' },
      ],
    },
    {
      type: 'bars',
      title: 'Acierto medio por evaluación final',
      caption: '90 intentos. *Probablemente subestimado por una falla en la actividad de «unir».',
      items: aciertoEvaluaciones,
    },
    {
      type: 'list',
      title: 'Simulador de fricción: explorar no basta',
      items: [
        '22 estudiantes hicieron 223 lanzamientos, pero lanzar más veces no se asoció con menos error en el Ejercicio 1 (r ≈ −0,02).',
        'Logro medio por componente del quiz: valores medidos 88%, ecuaciones 73% y respuesta final 60%.',
        'En el Ejercicio 2, solo 1 de 10 estudiantes lo resolvió de forma completamente correcta: la simulación necesita guía.',
      ],
    },
    {
      type: 'table',
      title: 'Lo que piden y lo que frena a los estudiantes',
      columns: ['Hallazgo', 'Dato', 'Fuente'],
      rows: [
        ['Piden una interfaz fácil', '46% la pide; 11 de 13 la vieron sencilla tras usarla', 'Entrevistas y encuestas'],
        ['Valoran simular y ver', '8 de 13 destacan los simuladores; explicaciones visuales 4,64/5', 'Entrevistas y encuestas'],
        ['Piden entender el error', '7 de 39 piden explicaciones; 9 comentarios valoran el paso a paso', 'Comentarios'],
        ['Monotonía', '26% la reporta; los docentes piden más variedad', 'Encuesta pública'],
        ['Información poco fiable y costo', '21% cada una (el costo, aún provisional)', 'Encuesta pública'],
        ['Sin guía de inicio', '3 piden un tutorial', 'Comentarios'],
      ],
    },
    {
      type: 'callout',
      title: 'Cruzar fuentes: la falla de «unir»',
      text: '22 comentarios de Química describen que la selección no se veía o el ejercicio se trababa. En las evaluaciones, las respuestas de «unir» (63) acertaron entre 0% y 20% en 3 de 4 pruebas, frente a 73–82% en opción múltiple. La revisión técnica halló que la pregunta no guardaba su identificador; se corrigió el 4 de octubre y falta verificarla con una nueva aplicación.',
    },
    {
      type: 'table',
      title: 'Los 18 criterios propuestos',
      columns: ['Código', 'Criterio', 'Prioridad alta'],
      rows: [
        ['P1', 'Propósito alineado al currículo', 'Sí'],
        ['P2', 'Competencia siempre opcional', 'Sí'],
        ['P3', 'Retroalimentación que explica el error al instante', 'Sí'],
        ['P4', 'Simulación con guía de uso', 'Sí'],
        ['P5', 'Práctica repetible y variada', 'Sí'],
        ['P6', 'Rigor conceptual y variables definidas', 'Sí'],
        ['F1', 'Actividades interactivas robustas', 'Sí'],
        ['F2', 'Guardado automático', '—'],
        ['F3', 'Panel docente con notas', 'Sí'],
        ['F4', 'Autenticación segura y recuperable', 'Sí'],
        ['F5', 'Telemetría completa y consistente', 'Sí'],
        ['F6', 'Acceso gratuito y liviano, sin publicidad', '—'],
        ['U1', 'Interfaz intuitiva con tutorial breve', 'Sí'],
        ['U2', 'Responsive (iOS, Android y PC)', 'Sí'],
        ['U3', 'Un tema por sesión breve', 'Sí'],
        ['U4', 'Sonidos y notificaciones configurables', '—'],
        ['U5', 'Identidad visual cálida', '—'],
        ['U6', 'Progreso visible', '—'],
      ],
    },
    {
      type: 'list',
      title: 'Conclusiones',
      items: [
        'Una plataforma gamificada funciona por estar mejor diseñada, no por tener más juego.',
        'Alta aceptación (4,58/5; 76% satisfactorio o dominado), pero sin evidencia causal de aprendizaje: efecto techo y sin grupo de control.',
        'La simulación necesita guía: solo 1 de 10 resolvió bien el Ejercicio 2 y lanzar más veces no mejoró la precisión.',
        'La gamificación apoya la práctica y no la reemplaza; la competencia debe ser opcional.',
        'Un fallo técnico puede sesgar los datos: probar cada actividad antes de aplicarla.',
      ],
    },
    {
      type: 'list',
      title: 'Siguientes pasos',
      items: [
        'Corregir la plataforma: actividad de «unir» verificada, tutorial de 30–60 s y guardado automático.',
        'Acceso seguro por enlace único o cuenta institucional, y eventos de telemetría por actividad en todos los módulos.',
        'Validar los 18 criterios con docentes, calificando relevancia y viabilidad de 1 a 5.',
        'Medir el efecto con pretest–postest y grupo de comparación, en más cursos e instituciones.',
      ],
    },
    {
      type: 'callout',
      title: 'Alcance de los resultados',
      text: 'Estudio exploratorio y descriptivo, sin grupo de control: no mide efecto causal. El 49% de los intentos marcó 5 en todo (efecto techo), así que la satisfacción refleja aceptación, no aprendizaje. Costo y conectividad provienen de una encuesta pública con nueve envíos atípicos y son provisionales.',
    },
    {
      type: 'references',
      title: 'Referencias',
      items: [
        'Sailer, M. y Homner, L. (2020). Educ. Psychol. Rev., 32, 77–112.',
        'Landers, R. N. (2014). Simulation & Gaming, 45(6), 752–768.',
        'Ryan, R. M. y Deci, E. L. (2000). Am. Psychologist, 55(1), 68–78.',
        'de Jong, T. y van Joolingen, W. R. (1998). Rev. Educ. Res., 68(2), 179–201.',
        'Hattie, J. y Timperley, H. (2007). Rev. Educ. Res., 77(1), 81–112.',
      ],
    },
  ],
};
