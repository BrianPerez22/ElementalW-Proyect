import type { Contenido } from './tipos';

/* Pitch de la Investigación 1 (Research Summit 2026, estudio pre-test / post-test). Edita solo este archivo.
 * Marcas en los textos: **acento** · __blanco__ · {{verde:texto}} · {{naranja:texto}} · \n salto de línea.
 * No insertes HTML. Los iconos son nombres de iconos.tsx; los tonos son azul, verde, naranja, rojo y morado.
 */
export const contenido: Contenido = {
  interfaz: {
    titulo: 'Elemental W — Pitch · Brian David Pérez Herrera',
    presentacion: 'Pitch de la Investigación 1: impacto de una app educativa basada en minijuegos en química general',
    indice: 'Ir a una escena',
    navegar: 'navegar',
    separadorContador: ' / ',
    errorCompleta: 'El navegador no permitió cambiar la pantalla completa. Usa la opción de pantalla completa del navegador.',
  },
  escenas: [
    {
      tipo: 'portada',
      nombre: 'Portada',
      etiqueta: 'Investigación Educativa · Universidad EAN · 2026',
      encabezado: 'Impacto de una app\neducativa basada en\n**minijuegos**',
      subtitulo: 'en el desempeño inmediato en competencias\nde **química general**',
      datos: [
        { etiqueta: 'Autor', valor: 'Brian David Pérez Herrera' },
        { etiqueta: 'Asesora', valor: 'Diana A. Varela Martínez' },
        { etiqueta: 'Muestra', valor: 'n = 36 · 2 grupos' },
        { etiqueta: 'Semillero', valor: 'Investigación en Química' },
      ],
      emblema: { sigla: 'EW', rotulo: 'ELEMENTAL W' },
    },
    {
      tipo: 'problema',
      nombre: 'El problema',
      etiqueta: 'El problema',
      tarjetas: [
        {
          icono: 'matraz',
          tono: 'azul',
          titulo: 'Dificultades en química general',
          texto: 'Los estudiantes presentan barreras persistentes en **balanceo de ecuaciones**, nomenclatura y clasificación de compuestos — áreas fundamentales del curso.',
        },
        {
          icono: 'tendenciaBaja',
          tono: 'rojo',
          titulo: 'Bajo desempeño documentado',
          texto: 'El Grupo 2 partió con un promedio de **52.7%** en pre-test, evidenciando brechas reales antes de cualquier intervención pedagógica.',
        },
        {
          icono: 'control',
          tono: 'naranja',
          titulo: 'La oportunidad de lo interactivo',
          texto: 'El aprendizaje activo y gamificado puede reducir la carga cognitiva y aumentar la motivación, pero su **impacto en química** requiere evidencia empírica.',
        },
        {
          icono: 'microscopio',
          tono: 'morado',
          titulo: 'Brecha en la literatura',
          texto: 'Existen pocos estudios que midan el efecto **inmediato y controlado** de una herramienta interactiva específica en competencias de química general universitaria.',
        },
      ],
    },
    {
      tipo: 'pregunta',
      nombre: 'Pregunta central',
      etiqueta: 'Pregunta central',
      pregunta: '¿El uso de una aplicación basada en\n**minijuegos** mejora el desempeño\ninmediato en química general?',
      pildoras: [
        { icono: 'balanza', texto: 'Balanceo de ecuaciones' },
        { icono: 'etiqueta', texto: 'Nomenclatura' },
        { icono: 'vaso', texto: 'Formulación' },
        { icono: 'atomo', texto: 'Ácido-base' },
        { icono: 'calculadora', texto: 'Estequiometría' },
      ],
    },
    {
      tipo: 'app',
      nombre: 'La app',
      etiqueta: 'La solución · Elemental W',
      descripcion: 'Una aplicación web educativa con **minijuegos interactivos** diseñada para practicar competencias de química general en contexto universitario.',
      funciones: [
        { icono: 'check', tono: 'azul', texto: '__Retroalimentación inmediata__ — el estudiante sabe al instante si acertó' },
        { icono: 'movil', tono: 'verde', texto: '__BYOD__ — funciona desde el celular del estudiante, sin instalación' },
        { icono: 'panel', tono: 'naranja', texto: '__Dashboard en tiempo real__ — el docente ve el progreso del grupo' },
        { icono: 'registro', tono: 'morado', texto: '__Registro automático__ — cada respuesta se guarda con timestamp' },
      ],
      competenciasTitulo: '6 competencias cubiertas',
      competencias: [
        { texto: 'C1 · Clasificación', tono: 'azul' },
        { texto: 'C2 · Nomenclatura' },
        { texto: 'C3 · Formulación', tono: 'verde' },
        { texto: 'C4 · Ácido-base' },
        { texto: 'C5 · Balanceo', tono: 'verde' },
        { texto: 'C6 · Estequiometría', tono: 'verde' },
      ],
      modos: [
        { icono: 'identificar', nombre: 'Identificar', detalle: 'Tipo de reacción y clasificación' },
        { icono: 'balancear', nombre: 'Balancear', detalle: 'Coeficientes en ecuaciones' },
        { icono: 'nombrar', nombre: 'Nombrar', detalle: 'Nomenclatura IUPAC y Stock' },
        { icono: 'calcular', nombre: 'Calcular', detalle: 'Moles y masa molar' },
      ],
    },
    {
      tipo: 'metodologia',
      nombre: 'Metodología',
      etiqueta: 'Diseño metodológico',
      pasos: [
        {
          numero: '01',
          tono: 'azul',
          titulo: 'PRE-TEST — Línea base',
          texto: '12 preguntas, 6 competencias. Aplicado de forma simultánea en los dos grupos a través de la app. Duración ~10 min por estudiante.',
        },
        {
          numero: '02',
          tono: 'verde',
          titulo: 'INTERVENCIÓN — Minijuegos',
          texto: 'Los estudiantes usaron **Elemental W** en clase para practicar las mismas competencias con preguntas distintas pero de dificultad equivalente.',
        },
        {
          numero: '03',
          tono: 'azul',
          titulo: 'POST-TEST — Medición de impacto',
          texto: '12 preguntas con **contenido distinto** al pre-test pero evaluando las mismas 6 competencias. Comparabilidad asegurada por diseño.',
        },
      ],
      nota: 'Métrica principal: % de aciertos por estudiante\nMejora = post-test − pre-test (puntos porcentuales)\nRegistro automático con timestamps en base de datos SQLite',
      grupos: [
        {
          etiqueta: 'Grupo 1',
          nombre: 'Profesora A',
          detalle: '**n = 21 estudiantes**\nSesión matutina · Grupo de nivel avanzado\nPre-test promedio inicial: **85.3%**\nLos estudiantes ya dominaban la mayoría de competencias',
        },
        {
          etiqueta: 'Grupo 2',
          nombre: 'Profesora B',
          detalle: '**n = 15 estudiantes**\nSesión vespertina · Grupo con mayor brecha\nPre-test promedio inicial: **52.7%**\nPunto de partida significativamente más bajo',
        },
      ],
    },
    {
      tipo: 'resultados',
      nombre: 'Resultados globales',
      etiqueta: 'Resultados globales · n = 36',
      cifras: [
        { valor: '71.8', sufijo: '%', tono: 'gris', etiqueta: 'Desempeño Pre-test', flechaDespues: true },
        { valor: '83.3', sufijo: '%', tono: 'verde', etiqueta: 'Desempeño Post-test' },
        { valor: '+11.6', sufijo: 'pp', sufijoPequeno: true, tono: 'naranja', etiqueta: 'Mejora promedio' },
        { valor: '61', sufijo: '%', tono: 'azul', etiqueta: 'Estudiantes que mejoraron' },
      ],
      destacados: [
        { valor: '+26pp', tono: 'verde', texto: 'Formulación química (C3) — **mayor mejora**' },
        { valor: '+15pp', tono: 'azul', texto: 'Balanceo de ecuaciones (C5)' },
        { valor: '+22pp', tono: 'azul', texto: 'Estequiometría (C6)' },
        { valor: '−5pp', tono: 'rojo', texto: 'Nomenclatura (C2) — **área sin mejora**' },
      ],
    },
    {
      tipo: 'grupos',
      nombre: 'Comparación por grupos',
      etiqueta: 'Comparación por grupos — el hallazgo clave',
      comparados: [
        {
          etiqueta: 'Grupo 1 · Profesora A',
          titulo: 'Alta línea base',
          grande: '+2.4',
          unidad: 'pp',
          subetiqueta: 'mejora promedio',
          filas: [
            { etiqueta: 'Pre-test', valor: '85.3%' },
            { etiqueta: 'Post-test', valor: '87.8%' },
            { etiqueta: 'Mejoraron', valor: '43% (9/21)' },
            { etiqueta: 'C5 Balanceo', valor: '+9.5pp ↑', tendencia: 'sube' },
            { etiqueta: 'C2 Nomenclatura', valor: '−4.8pp ↓', tendencia: 'baja' },
          ],
        },
        {
          etiqueta: 'Grupo 2 · Profesora B',
          titulo: 'Baja línea base',
          grande: '+24.4',
          unidad: 'pp',
          subetiqueta: 'mejora promedio',
          filas: [
            { etiqueta: 'Pre-test', valor: '52.7%' },
            { etiqueta: 'Post-test', valor: '77.1%' },
            { etiqueta: 'Mejoraron', valor: '87% (13/15) ↑', tendencia: 'sube' },
            { etiqueta: 'C3 Formulación', valor: '+63.3pp ↑↑', tendencia: 'sube' },
            { etiqueta: 'C6 Estequiometría', valor: '+50pp ↑↑', tendencia: 'sube' },
          ],
        },
      ],
      interpretacion: {
        etiqueta: 'Interpretación',
        titulo: 'El contexto importa',
        texto: 'La herramienta tuvo un **impacto drásticamente mayor** en el grupo con menor dominio previo.\n\nEl Grupo 2, partiendo desde __52.7%__, alcanzó __77.1%__ después de la intervención — una ganancia de **24.4 puntos porcentuales**.\n\nEsto sugiere que la app es especialmente efectiva como **herramienta de nivelación** para estudiantes con menor preparación previa.',
      },
    },
    {
      tipo: 'competencias',
      nombre: 'Desempeño por competencia',
      etiqueta: 'Desempeño por competencia',
      mejoran: {
        titulo: '▲ \u00a0Áreas que mejoraron',
        barras: [
          { nombre: 'Formulación química', codigo: 'C3', ancho: 85, valor: '+26pp', tono: 'verde' },
          { nombre: 'Estequiometría', codigo: 'C6', ancho: 74, valor: '+22pp', tono: 'verde' },
          { nombre: 'Balanceo de ecuaciones', codigo: 'C5', ancho: 58, valor: '+15pp', tono: 'verde' },
          { nombre: 'Clasificación', codigo: 'C1', ancho: 32, valor: '+5pp', tono: 'azul' },
        ],
      },
      sinMejora: {
        titulo: '▼ \u00a0Áreas sin mejora significativa',
        barras: [
          { nombre: 'Nomenclatura', codigo: 'C2', ancho: 22, valor: '−4.3pp', tono: 'rojo' },
          { nombre: 'Ácido-base', codigo: 'C4', ancho: 18, valor: '−4.7pp', tono: 'rojo' },
        ],
        nota: 'El descenso en C2 y C4 es __consistente entre grupos__ y se correlaciona con la percepción de los estudiantes (64% reportó dificultad en nomenclatura). Esto puede indicar que el **tipo de ejercicio en la app no fue suficientemente efectivo** para estas competencias específicas.',
      },
    },
    {
      tipo: 'percepcion',
      nombre: 'Percepción',
      etiqueta: 'Percepción de los estudiantes · n = 36',
      indicadores: [
        { valor: '89%', porcentaje: 89, tono: 'verde', texto: 'calificó la herramienta como __útil para la comprensión__ del tema (4–5 / 5)' },
        { valor: '83%', porcentaje: 83, tono: 'azul', texto: 'percibió la interfaz como __clara o muy clara__ en su flujo de uso' },
        { valor: '64%', porcentaje: 64, tono: 'naranja', texto: 'reportó __dificultad en nomenclatura__ — consistente con el descenso en C2' },
      ],
      contexto: [
        {
          titulo: 'Datos y percepción alineados',
          texto: 'La autopercepción de dificultad en **nomenclatura** coincide con el resultado medido: C2 fue la categoría con mayor descenso en ambos grupos.',
        },
        {
          titulo: 'Alta aceptabilidad de la herramienta',
          texto: 'El 89% de aprobación indica que la herramienta es bien recibida, lo que reduce la barrera de adopción para futuras implementaciones.',
        },
        {
          titulo: 'Validación cualitativa y cuantitativa',
          texto: 'La consistencia entre percepción y resultados objetivos refuerza la **validez del instrumento** y del diseño de la app.',
        },
      ],
    },
    {
      tipo: 'interpretacion',
      nombre: 'Interpretación y limitaciones',
      etiqueta: 'Interpretación y limitaciones',
      columnas: [
        {
          titulo: 'Evidencias positivas',
          tono: 'verde',
          bloques: [
            {
              icono: 'verificado',
              titulo: 'Mejora inmediata demostrada',
              texto: 'El grupo presentó una mejora **global de +11.6pp** entre pre y post-test. Especialmente notable en **C3 (+26pp)**, **C6 (+22pp)** y **C5 (+15pp)**.',
            },
            {
              icono: 'objetivo',
              titulo: 'Mayor impacto donde más se necesita',
              texto: 'El Grupo 2, con la mayor brecha inicial, mostró **+24.4pp** de mejora — diez veces más que el Grupo 1. La herramienta actúa como **nivelador efectivo**.',
            },
            {
              icono: 'voz',
              titulo: 'Alta aceptabilidad',
              texto: 'El 89% lo consideró útil, validando el diseño UX y la pertinencia pedagógica del enfoque **gamificado**.',
            },
          ],
        },
        {
          titulo: 'Limitaciones y cautela',
          tono: 'naranja',
          bloques: [
            {
              icono: 'advertencia',
              variante: 'cautela',
              titulo: 'Sin grupo control',
              texto: 'El diseño pre-test/post-test sin grupo control **no permite inferir causalidad fuerte**. La mejora podría deberse parcialmente a la práctica o el efecto prueba.',
            },
            {
              icono: 'reloj',
              variante: 'cautela',
              titulo: 'Solo desempeño inmediato',
              texto: 'Los resultados corresponden exclusivamente a mejora **inmediata**. No se midió retención a largo plazo ni transferencia a otros contextos.',
            },
            {
              icono: 'tendenciaRoja',
              variante: 'riesgo',
              titulo: 'Competencias sin mejora',
              texto: 'Nomenclatura (C2) y ácido-base (C4) mostraron **leves descensos**, sugiriendo que el diseño de ejercicios para estas áreas debe revisarse.',
            },
          ],
        },
      ],
    },
    {
      tipo: 'conclusiones',
      nombre: 'Conclusiones',
      etiqueta: 'Conclusiones',
      puntos: [
        {
          numero: '01',
          texto: 'Las herramientas interactivas **pueden mejorar el desempeño inmediato** — evidencia empírica con {{verde:+11.6pp}} de mejora promedio en 36 estudiantes',
        },
        {
          numero: '02',
          texto: 'El impacto es **mayor donde hay mayor brecha** — el Grupo 2 (línea base baja) obtuvo {{verde:+24.4pp}} frente a {{verde:+2.4pp}} del Grupo 1',
        },
        {
          numero: '03',
          texto: 'El impacto **varía según la competencia** evaluada — formulación y estequiometría mejoraron significativamente; {{naranja:nomenclatura requiere rediseño}}',
        },
        {
          numero: '04',
          texto: 'Se recomienda **validación con grupo control** y seguimiento longitudinal para establecer causalidad y medir retención',
        },
      ],
    },
    {
      tipo: 'siguientes',
      nombre: 'Próximos pasos',
      etiqueta: 'Próximos pasos y visión',
      pasos: [
        {
          icono: 'escudo',
          tono: 'azul',
          titulo: 'Diseño experimental con grupo control',
          texto: 'Cuasi-experimento aleatorizado con grupos paralelos para **establecer causalidad** con rigor estadístico.',
        },
        {
          icono: 'documentoLupa',
          tono: 'verde',
          titulo: 'Rediseño de módulo de nomenclatura',
          texto: 'Revisión pedagógica de C2 y C4, con **mayor andamiaje** y ejercicios progresivos para nomenclatura IUPAC y Stock.',
        },
        {
          icono: 'graficoBarras',
          tono: 'morado',
          titulo: 'Seguimiento longitudinal',
          texto: 'Medición de retención a 2 y 4 semanas para evaluar si la **mejora inmediata se sostiene** en el tiempo.',
        },
        {
          icono: 'maletin',
          tono: 'naranja',
          titulo: 'Escalamiento a más instituciones',
          texto: 'Validación en otros contextos universitarios para **generalizar los hallazgos** más allá de la Universidad EAN.',
        },
      ],
      pregunta: {
        etiqueta: 'Pregunta abierta',
        texto: '¿Puede **Elemental W** convertirse en una plataforma de nivelación estándar para cursos de química universitaria?',
      },
      etiquetas: [
        'Aprendizaje activo',
        'EdTech universitario',
        'Brecha de aprendizaje',
        'STEM Colombia',
        'Gamificación educativa',
        'Métricas de impacto',
        'Semillero EAN',
      ],
    },
    {
      tipo: 'plataforma',
      nombre: 'La plataforma',
      etiqueta: 'Elemental W como producto · Power-up universitario',
      insignia: 'Aplicación en producción',
      encabezado: 'Una plataforma de\n**educación semi-superior**\nen química',
      descripcion: 'Elemental W no es solo una herramienta de investigación — es una plataforma completa donde cualquier estudiante puede **practicar química de forma autónoma**, y cualquier profesor puede convertirla en su aula digital.',
      pilares: [
        {
          icono: 'aula',
          tono: 'azul',
          titulo: 'Clases teóricas dentro de la app',
          texto: 'Los profesores pueden crear módulos de teoría breves que los estudiantes consultan **antes** de los minijuegos — como un aula invertida.',
        },
        {
          icono: 'bloques',
          tono: 'morado',
          titulo: 'Minijuegos interactivos personalizados',
          texto: 'Cada docente diseña sus propias actividades; los estudiantes avanzan **al ritmo de su clase**, en cualquier dispositivo.',
        },
        {
          icono: 'estrellaContorno',
          tono: 'verde',
          titulo: 'Exámenes y calificaciones integradas',
          texto: 'La plataforma permite crear y aplicar exámenes dentro del mismo entorno — los estudiantes obtienen **notas reales** sin salir de la app.',
        },
        {
          icono: 'usuarioMas',
          tono: 'naranja',
          titulo: 'Acceso libre para estudiantes',
          texto: 'Cualquier estudiante puede practicar por su cuenta — sin costo, sin instalación — como **herramienta de nivelación autónoma**.',
        },
      ],
    },
    {
      tipo: 'modelo',
      nombre: 'Modelo de valor',
      etiqueta: 'Modelo de valor · Enfocado en docentes',
      pasos: [
        {
          numero: '01',
          tono: 'morado',
          titulo: 'El docente crea su aula en Elemental W',
          texto: 'Diseña clases teóricas, minijuegos y exámenes adaptados a su programa. La plataforma es su **herramienta de autor**.',
        },
        {
          numero: '02',
          tono: 'azul',
          titulo: 'Los estudiantes siguen el ritmo del curso',
          texto: 'Acceden desde cualquier dispositivo, completan actividades en tiempo real y la app registra todo automáticamente. El modelo económico no les afecta.',
        },
        {
          numero: '03',
          tono: 'verde',
          titulo: 'El docente obtiene métricas accionables',
          texto: 'Dashboard con desempeño por estudiante, por competencia y por sesión — todo en **tiempo real**, sin hojas de Excel.',
        },
      ],
      destacado: {
        etiqueta: 'Propuesta de valor central',
        texto: 'Elemental W convierte al docente en el **arquitecto de la experiencia** — y a la plataforma en su aliado pedagógico más poderoso.',
      },
      fichas: [
        { texto: 'Creación de clases', tono: 'morado' },
        { texto: 'Minijuegos a medida', tono: 'morado' },
        { texto: 'Exámenes integrados', tono: 'azul' },
        { texto: 'Dashboard docente', tono: 'azul' },
        { texto: 'Química general', tono: 'verde' },
        { texto: 'Expansión a ciencias básicas', tono: 'verde' },
        { texto: 'Química orgánica (futuro)' },
        { texto: 'Física y biología (futuro)' },
      ],
    },
    {
      tipo: 'creditos',
      nombre: 'Créditos',
      nombrePersona: 'Brian David Pérez Herrera',
      rol: 'Investigador principal',
      universidad: 'Ingeniería de Sistemas · Universidad EAN',
      semillero: 'Semillero de investigación en química · 2026',
      filas: [
        { etiqueta: 'Asesora académica', valor: 'Diana Angélica Varela Martínez' },
        { etiqueta: 'Docente participante', valor: 'Francys Yohan Piñeros Bedón' },
      ],
      sello: 'EAN · Semillero · 2026 · n=36 · Química General',
    },
  ],
};
