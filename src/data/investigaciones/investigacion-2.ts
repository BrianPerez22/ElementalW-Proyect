import type { Research } from '../../types';

/** Investigación 2 — En progreso (encuestas/entrevistas + telemetría / Learning Analytics). */
export const investigacion2: Research = {
  id: 'investigacion-2',
  number: '02',
  title: 'Investigación con encuestas, entrevistas y telemetría (Learning Analytics)',
  category: 'Investigación educativa · Learning Analytics',
  area: 'Ciencias Básicas',
  status: 'en-progreso',
  authors: 'Equipo Elemental W',
  summary:
    'Investigación en curso que combina lo que piensan estudiantes y docentes (encuestas y entrevistas) con lo que hacen realmente dentro de la plataforma (telemetría).',
  tags: ['Encuestas', 'Entrevistas', 'Telemetría', 'Learning Analytics'],
  blocks: [
    {
      type: 'callout',
      title: 'En progreso',
      text: 'Esta investigación todavía está en desarrollo. El contenido y los resultados se irán completando.',
    },
    {
      type: 'paragraph',
      title: 'Línea 1 · Encuestas, entrevistas e informes',
      text: 'Se construyó toda la sección de investigación dentro de la plataforma: encuestas, entrevistas, enlaces para compartirlas, informes y un dashboard, para recoger lo que piensan estudiantes y docentes y luego organizar esa información. La encuesta pública quedó separada, de modo que se puede responder sin entrar al sistema completo. En informes se conectaron los datos con la API para consultar respuestas y actualizaciones sin manejar todo manualmente. Así se centraliza la información y queda una base para comparar resultados entre distintas fuentes, en lugar de tener cada cosa por separado.',
    },
    {
      type: 'paragraph',
      title: 'Línea 2 · Telemetría y Learning Analytics',
      text: 'Se implementó telemetría para obtener la parte de Learning Analytics, que permite ver qué hace realmente el estudiante dentro de Elemental. Se programaron eventos como cuándo ve una caja, cuándo la abre o la cierra, cuánto tiempo permanece, en qué orden las visita, cuándo completa una actividad y algunas respuestas de Chispa. Los eventos se organizan por sesión y secuencia, se guardan localmente si hay problemas de conexión y después se envían por lotes al backend.',
    },
    {
      type: 'list',
      title: 'Eventos que se registran',
      items: [
        'Ver, abrir y cerrar una caja',
        'Tiempo de permanencia',
        'Orden en que se visitan las cajas',
        'Actividad completada',
        'Algunas respuestas de Chispa',
      ],
    },
    {
      type: 'callout',
      title: 'Qué permite el cruce de ambas líneas',
      text: 'Cruzar lo que sale de las encuestas y entrevistas con el comportamiento real dentro de la plataforma permite identificar patrones, barreras y lo que más se usa, y definir criterios para decidir qué mejorar y qué mantener.',
    },
  ],
};
