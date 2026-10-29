import type { Contenido } from "../motor/tipos";

/* Pitch de la Investigación 2 (Estudio 2, 5 minutos). Edita solo este archivo.
 * Textos con **doble asterisco** se destacan. \n crea un salto de línea. No insertes HTML.
 * Todas las cifras salen del Informe final del Estudio 2 (corte de datos: 26 de octubre de 2026).
 * Las ilustraciones (assets) son rutas dentro de src/pitch/recursos/.
 */
export const contenido: Contenido = {
  interfaz: {
    titulo: "Elemental-W · Pitch Estudio 2",
    presentacion: "Pitch del Estudio 2: criterios para la implementación de gamificación web",
    marca: "Elemental-W",
    pie: "ELEMENTAL-W · ESTUDIO 2 · PITCH 2026",
    anterior: "Escena anterior",
    siguiente: "Escena siguiente",
    indice: "Ir a una escena",
    progreso: "Progreso de la presentación",
    completa: "Pantalla completa",
    salirCompleta: "Salir de pantalla completa",
    ayuda: "← → para navegar · F pantalla completa",
    errorCompleta: "El navegador no permitió cambiar la pantalla completa. Usa la opción de pantalla completa del navegador.",
    errorImagen: "No se pudo cargar una ilustración de Chispa. Revisa la ruta en contenido.ts.",
    separadorContador: " / ",
    decimal: ",",
    positivo: "+",
    negativo: "−",
    porcentaje: "%",
    puntos: " pp",
  },
  assets: {
    trianguloRosa: "chispa/triangulo/chispa-triangulo-rosa-feliz.svg",
    trianguloAzul: "chispa/triangulo/chispa-triangulo-azul.svg",
    trianguloMorado: "chispa/triangulo/chispa-triangulo-morado-feliz.svg",
    trianguloNaranja: "chispa/triangulo/chispa-triangulo-naranja.svg",
    trianguloAmarillo: "chispa/triangulo/chispa-triangulo-amarillo-feliz.svg",
    circuloRosa: "chispa/Circulo/chispa-circulo-rosa.svg",
    circuloAzul: "chispa/Circulo/chispa-circulo-azul.svg",
    circuloNaranja: "chispa/Circulo/chispa-circulo-naranja.svg",
    circuloAmarillo: "chispa/Circulo/chispa-circulo-amarillo.svg",
    cuadradoAzul: "chispa/Cuadrado/chispa-cuadrado-azul.svg",
    cuadradoNaranja: "chispa/Cuadrado/chispa-cuadrado-naranja.svg",
    cuadradoAmarillo: "chispa/Cuadrado/chispa-cuadrado-amarillo.svg",
    hexagonoMorado: "chispa/Hexagono/chispa-hexagono-morado.svg",
    hexagonoAmarillo: "chispa/Hexagono/chispa-hexagono-amarillo.svg",
    carroRosa: "chispa/carro/chispa-carro-rosa-feliz.svg",
    carroAzul: "chispa/carro/chispa-carro-azul-feliz.svg",
    carroAmarillo: "chispa/carro/chispa-carro-amarillo-feliz.svg",
    manzana: "chispa/Manzana/chispa-manzana.svg",
    pera: "chispa/Pera/chispa-pera.svg",
    trianguloRosaNormal: "chispa/triangulo/chispa-triangulo-rosa.svg",
    trianguloMoradoNormal: "chispa/triangulo/chispa-triangulo-morado.svg",
    trianguloAmarilloNormal: "chispa/triangulo/chispa-triangulo-amarillo.svg",
    trianguloAzulFeliz: "chispa/triangulo/chispa-triangulo-azul-feliz.svg",
    cuadradoRosa: "chispa/Cuadrado/chispa-cuadrado-rosa.svg",
    cuadradoMorado: "chispa/Cuadrado/chispa-cuadrado-morado.svg",
    hexagonoRosa: "chispa/Hexagono/chispa-hexagono-rosa.svg",
    hexagonoAzul: "chispa/Hexagono/chispa-hexagono-azul.svg",
    hexagonoNaranja: "chispa/Hexagono/chispa-hexagono-naranja.svg",
    circuloMorado: "chispa/Circulo/chispa-circulo-morado.svg",
    carroMorado: "chispa/carro/chispa-carro-morado-feliz.svg",
    carroNaranja: "chispa/carro/chispa-carro-naranja-feliz.svg",
  },
  // Solo dirección visual: [asset, x, y, ancho] en el lienzo 1280 × 720.
  diseno: {
    portada: {
      decoracion: [
        ["circuloAzul", 725, 499, 130],
        ["cuadradoAmarillo", 1104, 523, 115],
        ["hexagonoMorado", 739, 38, 96],
        ["pera", 1176, 48, 82],
        ["manzana", 1181, 370, 82],
        ["carroAmarillo", 864, 562, 154],
        ["trianguloAzulFeliz", 715, 288, 77],
        ["circuloNaranja", 1046, 14, 67],
      ],
      estrellas: [
        [1200, 192, 32.64, "#FFFFFF", 15],
        [796.8, 259.2, 28.8, "#CF4173", 0],
        [1046.4, 638.4, 28.8, "#FFFFFF", 20],
        [672, 475.2, 24.96, "#CF4173", 10],
      ],
      puntos: [
        [1209.6, 480, 15.36, "#CF4173"],
        [835.2, 662.4, 17.28, "#FFFFFF"],
        [921.6, 24, 13.44, "#5D3140"],
      ],
    },
    pregunta: {
      decoracion: [
        ["trianguloAmarilloNormal", 322, 20, 58],
        ["pera", 492, 26, 59],
        ["trianguloAzul", 655, 21, 51],
        ["trianguloAmarilloNormal", 577, 659, 49],
        ["pera", 737, 660, 51],
        ["trianguloAzul", 885, 660, 42],
        ["cuadradoNaranja", 1064, 658, 50],
        ["trianguloNaranja", 1242, 420, 30],
        ["trianguloAzul", 8, 296, 30],
      ],
      estrellas: [
        [441.92, 39.67, 26.88, "#B494C5", 44.82],
        [786.98, 41.38, 30.72, "#5C53A3", 15.15],
        [651.14, 676.8, 24.96, "#B494C5", 11.66],
        [828.68, 670.08, 28.8, "#5C53A3", 9],
      ],
      puntos: [
        [284.71, 43.2, 13.44, "#5C53A3"],
        [993.6, 681.6, 12.48, "#5C53A3"],
      ],
    },
    herramienta: {
      personaje: "hexagonoAzul",
      decoracion: [
        ["cuadradoRosa", 330, 27, 48],
        ["manzana", 505, 21, 49],
        ["manzana", 650, 26, 55],
        ["manzana", 549, 657, 47],
        ["hexagonoNaranja", 738, 659, 41],
        ["hexagonoMorado", 885, 660, 42],
        ["pera", 1029, 657, 47],
        ["trianguloAmarillo", 1242, 389, 30],
        ["hexagonoNaranja", 8, 490, 30],
      ],
      estrellas: [
        [419.44, 46.76, 26.88, "#96C6EA", 42.06],
        [754.84, 50.25, 30.72, "#3DB5CE", 31.54],
        [675.07, 676.8, 24.96, "#96C6EA", 2.22],
        [819.7, 670.08, 28.8, "#3DB5CE", 34.15],
      ],
      puntos: [
        [291.52, 43.2, 13.44, "#3DB5CE"],
        [993.6, 681.6, 12.48, "#3DB5CE"],
      ],
    },
    metodo: {
      decoracion: [
        ["hexagonoAzul", 322, 33, 56],
        ["hexagonoMorado", 488, 20, 62],
        ["circuloRosa", 634, 24, 52],
        ["pera", 576, 660, 44],
        ["trianguloAzul", 739, 657, 44],
        ["manzana", 892, 658, 51],
        ["hexagonoAzul", 1045, 660, 49],
        ["trianguloMorado", 1242, 411, 30],
        ["hexagonoMorado", 8, 416, 30],
      ],
      estrellas: [
        [442.9, 42.59, 26.88, "#F2E291", 21.62],
        [782.63, 37.91, 30.72, "#D0AA3F", 30.46],
        [668.4, 676.8, 24.96, "#F2E291", 29.64],
        [834.92, 670.08, 28.8, "#D0AA3F", 16.11],
      ],
      puntos: [
        [282.54, 43.2, 13.44, "#D0AA3F"],
        [993.6, 681.6, 12.48, "#D0AA3F"],
      ],
    },
    cifras: {
      decoracion: [
        ["pera", 331, 29, 59],
        ["circuloAmarillo", 506, 26, 61],
        ["cuadradoMorado", 637, 23, 48],
        ["cuadradoNaranja", 547, 658, 41],
        ["trianguloNaranja", 742, 661, 42],
        ["trianguloAzul", 905, 658, 43],
        ["hexagonoNaranja", 1033, 660, 52],
        ["trianguloNaranja", 1242, 388, 30],
        ["circuloNaranja", 8, 467, 30],
      ],
      estrellas: [
        [435.41, 45.08, 26.88, "#F4939A", 16.34],
        [774.82, 31.19, 30.72, "#CF4173", 40.49],
        [658, 676.8, 24.96, "#F4939A", 15.54],
        [830.55, 670.08, 28.8, "#CF4173", 3.83],
      ],
      puntos: [
        [295.71, 43.2, 13.44, "#CF4173"],
        [993.6, 681.6, 12.48, "#CF4173"],
      ],
    },
    simulador: {
      personaje: "hexagonoNaranja",
      decoracion: [
        ["hexagonoRosa", 342, 31, 60],
        ["manzana", 494, 23, 61],
        ["circuloRosa", 626, 29, 55],
        ["circuloAzul", 572, 660, 51],
        ["trianguloAmarilloNormal", 744, 660, 43],
        ["trianguloAmarilloNormal", 883, 658, 48],
        ["trianguloAzul", 1063, 657, 51],
        ["trianguloAmarillo", 1242, 374, 30],
        ["trianguloAmarilloNormal", 8, 319, 30],
      ],
      estrellas: [
        [427.17, 41.36, 26.88, "#F5C693", 43.49],
        [763.89, 42.37, 30.72, "#CF5F3F", 38.05],
        [664.78, 676.8, 24.96, "#F5C693", 23.34],
        [832.02, 670.08, 28.8, "#CF5F3F", 16.99],
      ],
      puntos: [
        [284.29, 43.2, 13.44, "#CF5F3F"],
        [993.6, 681.6, 12.48, "#CF5F3F"],
      ],
    },
    hallazgos: {
      decoracion: [
        ["circuloAzul", 340, 20, 60],
        ["hexagonoRosa", 484, 29, 53],
        ["trianguloNaranja", 641, 32, 65],
        ["trianguloMoradoNormal", 579, 658, 42],
        ["circuloRosa", 726, 657, 51],
        ["circuloNaranja", 879, 658, 50],
        ["manzana", 1052, 660, 43],
        ["trianguloRosa", 1242, 417, 30],
        ["hexagonoRosa", 8, 495, 30],
      ],
      estrellas: [
        [439.67, 36.26, 26.88, "#F2E291", 28.39],
        [748.96, 54.51, 30.72, "#D0AA3F", 21.12],
        [658.76, 676.8, 24.96, "#F2E291", 29.99],
        [828.04, 670.08, 28.8, "#D0AA3F", 21.41],
      ],
      puntos: [
        [289.47, 43.2, 13.44, "#D0AA3F"],
        [993.6, 681.6, 12.48, "#D0AA3F"],
      ],
    },
    triangulacion: {
      personaje: "carroMorado",
      decoracion: [
        ["trianguloAzul", 335, 24, 58],
        ["hexagonoAmarillo", 473, 25, 50],
        ["manzana", 660, 29, 53],
        ["trianguloAmarilloNormal", 554, 660, 44],
        ["circuloRosa", 737, 659, 42],
        ["hexagonoNaranja", 896, 659, 42],
        ["manzana", 1056, 658, 54],
        ["trianguloAzulFeliz", 1242, 359, 30],
        ["trianguloRosaNormal", 8, 350, 30],
      ],
      estrellas: [
        [419.31, 43.25, 26.88, "#B494C5", 35.25],
        [778.3, 52.21, 30.72, "#5C53A3", 41.61],
        [655.97, 676.8, 24.96, "#B494C5", 42.16],
        [816.82, 670.08, 28.8, "#5C53A3", 14.61],
      ],
      puntos: [
        [281.14, 43.2, 13.44, "#5C53A3"],
        [993.6, 681.6, 12.48, "#5C53A3"],
      ],
    },
    criterios: {
      decoracion: [
        ["pera", 344, 19, 67],
        ["manzana", 502, 33, 53],
        ["trianguloAmarilloNormal", 658, 32, 57],
        ["hexagonoRosa", 580, 658, 41],
        ["circuloMorado", 734, 661, 53],
        ["trianguloMoradoNormal", 883, 659, 45],
        ["trianguloMoradoNormal", 1036, 658, 44],
        ["trianguloAmarillo", 1242, 275, 30],
        ["trianguloRosaNormal", 8, 288, 30],
      ],
      estrellas: [
        [426.92, 50.8, 26.88, "#96C6EA", 4.57],
        [784.88, 38.91, 30.72, "#3DB5CE", 40.41],
        [674.87, 676.8, 24.96, "#96C6EA", 39.67],
        [821.36, 670.08, 28.8, "#3DB5CE", 13.82],
      ],
      puntos: [
        [296.24, 43.2, 13.44, "#3DB5CE"],
        [993.6, 681.6, 12.48, "#3DB5CE"],
      ],
    },
    siguientes: {
      decoracion: [
        ["pera", 364, 20, 59],
        ["circuloAmarillo", 507, 20, 65],
        ["circuloAmarillo", 654, 25, 59],
        ["circuloAzul", 552, 661, 41],
        ["cuadradoAzul", 735, 660, 54],
        ["cuadradoAmarillo", 893, 661, 41],
        ["cuadradoMorado", 1038, 657, 44],
        ["trianguloRosa", 1242, 391, 30],
        ["hexagonoMorado", 8, 310, 30],
      ],
      estrellas: [
        [423.55, 41.44, 26.88, "#F5C693", 38.45],
        [776.74, 38.47, 30.72, "#CF5F3F", 44.1],
        [653.21, 676.8, 24.96, "#F5C693", 39.6],
        [806.95, 670.08, 28.8, "#CF5F3F", 15.74],
      ],
      puntos: [
        [282.07, 43.2, 13.44, "#CF5F3F"],
        [993.6, 681.6, 12.48, "#CF5F3F"],
      ],
    },
    conclusiones: {
      decoracion: [
        ["trianguloNaranja", 350, 23, 64],
        ["cuadradoAzul", 493, 27, 63],
        ["trianguloNaranja", 665, 24, 57],
        ["trianguloNaranja", 567, 659, 42],
        ["cuadradoMorado", 719, 657, 45],
        ["hexagonoMorado", 884, 657, 52],
        ["cuadradoAmarillo", 1059, 657, 52],
        ["cuadradoAmarillo", 8, 459, 30],
      ],
      estrellas: [
        [423.61, 47.28, 26.88, "#F4939A", 40.12],
        [769.83, 32.25, 30.72, "#CF4173", 22.02],
        [668.38, 676.8, 24.96, "#F4939A", 5.54],
        [821.25, 670.08, 28.8, "#CF4173", 32.9],
      ],
      puntos: [
        [294.9, 43.2, 13.44, "#CF4173"],
        [993.6, 681.6, 12.48, "#CF4173"],
      ],
    },
    gracias: {
      decoracion: [
        ["manzana", 1147, 149, 86],
        ["pera", 922, 235, 77],
        ["hexagonoRosa", 1085, 259, 82],
        ["circuloAmarillo", 1152, 24, 67],
        ["cuadradoMorado", 806, 154, 67],
      ],
      estrellas: [
        [864, 33.6, 28.8, "#F6D8BD", 0],
        [1180.8, 288, 28.8, "#F4939A", 20],
        [787.2, 278.4, 24.96, "#F4939A", 0],
        [499.2, 52.8, 28.8, "#F4939A", 10],
      ],
      puntos: [
        [1132.8, 96, 13.44, "#F6D8BD"],
        [1046.4, 211.2, 11.52, "#F4939A"],
      ],
    },
  },
  simuladores: [
    { codigo: "01", nombre: "Péndulo", personaje: "circuloRosa" },
    { codigo: "02", nombre: "Caída libre", personaje: "cuadradoAzul" },
    { codigo: "03", nombre: "Mov. parabólico", personaje: "hexagonoMorado" },
    { codigo: "04", nombre: "Construye-átomo", personaje: "trianguloNaranja" },
    { codigo: "05", nombre: "Ácidos y bases", personaje: "carroAmarillo" },
    { codigo: "06", nombre: "Movimiento y fricción", personaje: "cuadradoNaranja" },
  ],
  escenas: [
    // 1 · Portada (≈ 0:00–0:10)
    {
      tipo: "portada", tema: "rosa",
      titulo: "Criterios para la implementación de gamificación web en educación superior",
      etiqueta: "SEMILLERO SMART FARMING · ESTUDIO 2 · 2026",
      subtitulo: "Qué debe cumplir una plataforma gamificada para funcionar en ciencias básicas",
      globo: "¡hola, soy Chispa!", personaje: "trianguloRosa",
      datos: [
        { titulo: "ESTUDIO", texto: "Estudio 2 · diseño mixto" },
        { titulo: "CURSOS", texto: "Física Mecánica y Química General" },
        { titulo: "PARTICIPANTES", texto: "46 estudiantes y 4 docentes" },
        { titulo: "PRESENTAN", texto: "Brian David Pérez Herrera · Daniela Sophia Coavas Barboza\n"},
      ],
    },
    // 2 · Problema y pregunta (≈ 0:10–0:40)
    {
      tipo: "pregunta", tema: "morado", seccion: "CONTEXTO",
      titulo: "Pregunta de investigación", globo: "hmm… ¿qué debe cumplir?", personaje: "trianguloMorado",
      pregunta: "¿Qué criterios **pedagógicos, funcionales y de usabilidad** favorecen la implementación de plataformas web gamificadas para enseñar ciencias básicas en educación superior?",
      tarjetas: [
        { titulo: "Está en todas partes", texto: "La gamificación se extendió en educación superior para elevar motivación y participación.", personaje: "circuloRosa" },
        { titulo: "La evidencia es mixta", texto: "Efectos de pequeños a moderados que dependen del diseño y del contexto.", personaje: "cuadradoAzul" },
        { titulo: "Falta saber cómo", texto: "No hay claridad sobre qué debe cumplir una plataforma en ciencias básicas.", personaje: "hexagonoMorado" },
      ],
    },
    // 3 · La herramienta (≈ 0:40–1:00)
    {
      tipo: "herramienta", tema: "azul", seccion: "LA HERRAMIENTA",
      titulo: "Elemental-W: el medio, no el objeto", globo: "¡a jugar!", personaje: "hexagonoMorado",
      resumen: "Una plataforma web con **minijuegos, simuladores y evaluaciones** para Física y Química. Es el **medio de apoyo**, no el objeto del estudio: llevó la gamificación al aula y recogió los datos.",
      tarjetas: [
        { titulo: "7 mecánicas de juego", texto: "Unir, ordenar, balancear, construir, contrarreloj…" },
        { titulo: "Práctica infinita", texto: "Ejercicios con variación para repetir y reforzar." },
        { titulo: "Sonidos y celebración", texto: "Sonido de acierto o falla y celebración final." },
        { titulo: "Chispa, la mascota", texto: "Preguntas de enganche al inicio de cada tema." },
      ],
      actividades: [
        { titulo: "35 experiencias", texto: "Química · 4 clases" },
        { titulo: "35 experiencias", texto: "Física · 3 rutas" },
        { titulo: "Evaluación final", texto: "por cada tema" },
        { titulo: "Quiz de fricción", texto: "con simulador" },
      ],
      tituloSimuladores: "6 simuladores",
    },
    // 4 · Método (≈ 1:00–1:30)
    {
      tipo: "metodo", tema: "amarillo", seccion: "MÉTODO",
      titulo: "Dos cursos, cinco fuentes de datos", globo: "¡al salón!", personaje: "cuadradoAmarillo",
      pasos: [
        { numero: "01", titulo: "Dos cursos, tres sesiones", texto: "**Física Mecánica y Química General**: clases desde agosto hasta octubre" },
        { numero: "02", titulo: "Cinco fuentes de datos", texto: "Evaluaciones, quiz del simulador, **entrevistas y encuestas**, telemetría y reportes de error." },
        { numero: "03", titulo: "Triangulación", texto: "Cada criterio se contrastó con **al menos dos fuentes**: lo que dicen, lo que hacen y lo que falla." },
      ],
      grupos: [
        { titulo: "FÍSICA MECÁNICA", valor: "23 inscritos", texto: "Evaluación y quiz de fricción\n22 de los 90 intentos", personaje: "trianguloAzul" },
        { titulo: "QUÍMICA GENERAL", valor: "21 inscritos", texto: "4 evaluaciones por tema\n68 de los 90 intentos", personaje: "trianguloRosa" },
      ],
      metrica: { titulo: "Diseño mixto convergente", texto: "Exploratorio y descriptivo\nSin grupo de control\n46 de 50 estudiantes con actividad" },
    },
    // 5 · Cifras clave (≈ 1:30–2:00)
    {
      tipo: "cifras", tema: "rosa", seccion: "RESULTADOS",
      titulo: "Qué pasó: los números", globo: "¡cuántos datos!", personaje: "carroRosa",
      metricas: [
        { valor: 46, maximo: 50, titulo: "estudiantes con actividad" },
        { valor: 90, titulo: "evaluaciones finales" },
        { valor: 57, titulo: "entrevistas y encuestas válidas" },
        { valor: 4.58, decimales: 2, maximo: 5, titulo: "satisfacción media (de 5)" },
        { valor: 76, unidad: "%", maximo: 100, titulo: "intentos satisfactorios o dominados" },
        { valor: 223, titulo: "lanzamientos en el simulador" },
      ],
      nota: { titulo: "Lectura honesta", texto: "**Efecto techo**: el 49% de los intentos marcó 5 en todo, así que la satisfacción mide aceptación, no aprendizaje. Estudio exploratorio, sin grupo de control." },
    },
    // 6 · Simulador de fricción (≈ 2:00–2:25)
    {
      tipo: "simulador", tema: "naranja", seccion: "RESULTADOS",
      titulo: "Simulador de fricción: explorar no basta", globo: "uy, el Ejercicio 2…", personaje: "trianguloNaranja",
      grafica: {
        titulo: "Logro medio por componente del quiz (%)",
        minimo: 0, maximo: 100, marcas: [0, 25, 50, 75, 100], unidad: "%",
        series: [
          { nombre: "Valores medidos", valor: 88 },
          { nombre: "Ecuaciones", valor: 73 },
          { nombre: "Respuesta final", valor: 60 },
        ],
      },
      conclusion: {
        titulo: "Más lanzamientos, no más precisión",
        texto: "22 estudiantes hicieron **223 lanzamientos**, pero lanzar más no se asoció con menos error en el Ejercicio 1 (r ≈ −0,02). En el Ejercicio 2, **solo 1 de 10** fue completamente correcto. Hace falta **guía**.",
        personaje: "trianguloNaranja",
      },
    },
    // 7 · Qué piden y qué frena (≈ 2:25–2:55)
    {
      tipo: "hallazgos", tema: "amarillo", seccion: "RESULTADOS",
      titulo: "Lo que piden y lo que los frena", globo: "ojo con esto", personaje: "trianguloAmarillo",
      columnas: [
        {
          titulo: "LO QUE PIDEN LOS ESTUDIANTES",
          tarjetas: [
            { titulo: "Interfaz fácil", texto: "**46%** la pide; tras usarla, **11 de 13** la vieron sencilla.", personaje: "trianguloAzul" },
            { titulo: "Simular y ver", texto: "**8 de 13** destacan los simuladores; las explicaciones visuales sacaron **4,64/5**.", personaje: "carroRosa" },
            { titulo: "Entender el error", texto: "**7 de 39** piden explicaciones y **9 comentarios** valoran el paso a paso.", personaje: "trianguloMorado" },
          ],
        },
        {
          titulo: "LO QUE LOS FRENA",
          tarjetas: [
            { titulo: "Monotonía", texto: "**26%** la reporta; los docentes piden más variedad de actividades.", personaje: "cuadradoNaranja" },
            { titulo: "Información poco fiable y costo", texto: "**21%** cada una (el costo, aún provisional); los docentes exigen rigor.", personaje: "hexagonoAzul" },
            { titulo: "Sin guía ni acceso seguro", texto: "**3** piden un tutorial de inicio y se entra solo con el correo.", personaje: "circuloMorado" },
          ],
        },
      ],
    },
    // 8 · Triangulación: la falla de “unir” (≈ 2:55–3:25)
    {
      tipo: "triangulacion", tema: "morado", seccion: "RESULTADOS",
      titulo: "Cruzar fuentes: la falla de “unir”", globo: "dicen · hacen · fallan", personaje: "carroAzul",
      metricas: [
        { valor: 22, titulo: "comentarios de Química describen el fallo" },
        { valor: 63, titulo: "respuestas de “unir” con 0–20% de acierto" },
        { valor: 3, maximo: 4, titulo: "de 4 evaluaciones probablemente subestimadas" },
      ],
      tarjetas: [
        { titulo: "Lo que dicen", texto: "Entrevistas y comentarios: **22 comentarios** de Química cuentan que la selección no se veía o el ejercicio se trababa.", personaje: "cuadradoAzul" },
        { titulo: "Lo que hacen", texto: "Evaluaciones: las respuestas de “unir” acertaron **0–20%** en 3 de 4 pruebas; en opción múltiple, **73–82%**.", personaje: "circuloRosa" },
        { titulo: "Lo que falla", texto: "Reportes y revisión técnica: la pregunta **no guardaba su identificador**. Ya se corrigió; falta verificarla con una nueva aplicación.", personaje: "hexagonoAmarillo" },
      ],
    },
    // 9 · 18 criterios (≈ 3:25–4:00)
    {
      tipo: "criterios", tema: "azul", seccion: "RESULTADO FINAL",
      titulo: "18 criterios en tres dimensiones", globo: "¡6 + 6 + 6!", personaje: "circuloAzul",
      columnas: [
        {
          titulo: "PEDAGÓGICA · 6",
          criterios: [
            { codigo: "P1", texto: "Propósito alineado al currículo", alta: true },
            { codigo: "P2", texto: "Competencia siempre opcional", alta: true },
            { codigo: "P3", texto: "Explicar el error al instante", alta: true },
            { codigo: "P4", texto: "Simular y visualizar, con guía", alta: true },
            { codigo: "P5", texto: "Práctica repetible con variación", alta: true },
            { codigo: "P6", texto: "Rigor y variables definidas", alta: true },
          ],
        },
        {
          titulo: "FUNCIONAL · 6",
          criterios: [
            { codigo: "F1", texto: "Actividades que no fallan", alta: true },
            { codigo: "F2", texto: "Guardado automático" },
            { codigo: "F3", texto: "Panel útil para el docente", alta: true },
            { codigo: "F4", texto: "Acceso seguro y recuperable", alta: true },
            { codigo: "F5", texto: "Telemetría completa y consistente", alta: true },
            { codigo: "F6", texto: "Gratuita, liviana y sin publicidad" },
          ],
        },
        {
          titulo: "USABILIDAD · 6",
          criterios: [
            { codigo: "U1", texto: "Interfaz intuitiva + tutorial breve", alta: true },
            { codigo: "U2", texto: "Funciona en iOS, Android y PC", alta: true },
            { codigo: "U3", texto: "Sesiones breves: un tema por clase", alta: true },
            { codigo: "U4", texto: "Sonidos configurables, sin presión" },
            { codigo: "U5", texto: "Identidad visual cálida" },
            { codigo: "U6", texto: "Progreso visible y avisos controlables" },
          ],
        },
      ],
      leyenda: "Prioridad alta: **13 de 18** criterios · cada uno respaldado por **dos o más fuentes** de datos",
    },
    // 10 · Mejoras y siguientes pasos (≈ 4:00–4:20)
    {
      tipo: "siguientes", tema: "naranja", seccion: "SIGUIENTES PASOS",
      titulo: "Qué mejoramos y qué sigue", globo: "¿y ahora qué?", personaje: "cuadradoAzul",
      pasos: [
        { numero: "01", titulo: "Corregir la plataforma", texto: "Actividad de “unir” verificada, **tutorial de 30–60 s** y guardado automático.", personaje: "circuloRosa" },
        { numero: "02", titulo: "Acceso seguro y datos completos", texto: "Ingreso por enlace único o cuenta institucional y **eventos por actividad** en todos los módulos.", personaje: "hexagonoMorado" },
        { numero: "03", titulo: "Validar con docentes", texto: "Los 18 criterios, calificados en **relevancia y viabilidad** de 1 a 5.", personaje: "circuloNaranja" },
        { numero: "04", titulo: "Medir el efecto", texto: "Pretest–postest con **grupo de comparación**, en más cursos e instituciones.", personaje: "trianguloAmarillo" },
      ],
      pregunta: { titulo: "SIGUIENTE PASO", texto: "Medir el efecto en el aprendizaje con un diseño controlado." },
    },
    // 11 · Mensaje central (≈ 4:20–4:50)
    {
      tipo: "conclusiones", tema: "rosa", seccion: "CONCLUSIONES",
      titulo: "No es más juego, es mejor diseño", globo: "¡misión cumplida!", personaje: "trianguloRosa",
      puntos: [
        { numero: "01", texto: "La aceptación es alta (**4,58/5** con efecto techo; **76%** satisfactorio o dominado), pero **no prueba aprendizaje**." },
        { numero: "02", texto: "**Simular y visualizar** es el eje, pero explorar no basta: hacen falta **guía y explicación del error**." },
        { numero: "03", texto: "La gamificación **apoya la práctica, no la sustituye**: retos atados al objetivo y competencia siempre opcional." },
        { numero: "04", texto: "Los fallos técnicos **también amenazan la validez**: la calidad del instrumento digital es parte del estudio." },
      ],
    },
    // 12 · Cierre (≈ 4:50–5:00)
    {
      tipo: "gracias", tema: "cierre", titulo: "Gracias",
      nombre: "Brian David Pérez Herrera · Daniela Sophia Coavas Barboza",
      descripcion: "**Colaboradores:** Juan David Serrato Alvarado · Andrea Carolina Mora Lopez\nKaren Sofia Ovalle Morales · Ariana Guerrero Rios\nSemillero Smart Farming · Plataforma Elemental-W\nEstudio 2 · Criterios para la implementación de gamificación web en educación superior",
      globo: "¡gracias!", personaje: "carroAzul",
      personas: [
        { titulo: "LA IDEA CENTRAL", texto: "Una plataforma gamificada funciona por estar mejor diseñada, no por tener más juego." },
        { titulo: "¿TE INTERESA ALIARTE?", texto: "Buscamos más cursos, docentes e instituciones para validar los criterios." },
      ],
      personajes: ["trianguloRosa", "trianguloAzul", "trianguloMorado", "trianguloNaranja", "trianguloAmarillo"],
    },
  ],
};
