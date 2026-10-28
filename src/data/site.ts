export const site = {
  name: 'Elemental W',
  url: 'https://elementalw.site',
  urlLabel: 'elementalw.site',
  year: 2026,
  admin: 'Brian David Pérez Herrera',
  heroTagline:
    'Una aplicación web para enseñar ciencias básicas, ayudar a profesores y estudiantes a entenderse mejor y hacer investigación con evidencia.',

  about: {
    badge: '¿Qué es el proyecto?',
    // Descripción indicada por el equipo
    paragraphs: [
      'Elemental W es una aplicación web diseñada para la enseñanza de ciencias básicas y la investigación con estudiantes y profesores. Con ella ya se han realizado investigaciones, y sigue avanzando técnicamente para convertirse en una aplicación funcional.',
      'La meta es doble: que los profesores la usen como herramienta para entender mejor a sus estudiantes, y que los estudiantes puedan identificar sus falencias, mejorar con múltiples opciones y aprender más de lo que lograrían con una clase tradicional.',
    ],
    purposeTitle: 'Propósito',
    purposeText:
      'Conectar la enseñanza de las ciencias básicas con evidencia sobre cómo aprenden realmente los estudiantes.',
    purposePoints: [
      { label: 'Investigaciones realizadas', value: '2' },
      { label: 'Estudiantes participantes', value: '82' },
    ],
  },

  pillars: [
    {
      icon: 'teacher',
      title: 'Para profesores',
      text: 'Una herramienta para entender mejor a sus estudiantes y decidir qué reforzar en clase.',
    },
    {
      icon: 'student',
      title: 'Para estudiantes',
      text: 'Identificar falencias, practicar con múltiples opciones y aprender más allá de la clase normal.',
    },
    {
      icon: 'research',
      title: 'Para la investigación',
      text: 'Recoger datos reales (encuestas, entrevistas y uso de la plataforma) para mejorar con criterio.',
    },
  ],
} as const;
