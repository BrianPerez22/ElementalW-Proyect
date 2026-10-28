# Pitch de la Investigación 2 (Estudio 2) — diseño y contenido

Vive en `pitch/investigacion-2/` (HTML aparte) y su contenido en `src/pitch/investigacion-2/contenido.ts`.
Reutiliza el sistema visual de la presentación anterior de Elemental-W: paletas por escena,
tarjetas, métricas con contador, gráfica de barras, Chispa en globos de diálogo y las
constelaciones decorativas. El contenido y el orden son nuevos y salen del
**Informe final del Estudio 2**.

## Tipos de escena

| `tipo` | Composición | Usada en |
| --- | --- | --- |
| `portada` | Título, subtítulo, cuatro datos y Chispa grande | 1 |
| `pregunta` | Pregunta en tarjeta grande + tres tarjetas de contexto | 2 |
| `herramienta` | Resumen, cuatro funciones, banda de contenido y lista de 6 simuladores | 3 |
| `metodo` | Tres pasos, dos cursos y tarjeta de diseño | 4 |
| `cifras` | Seis métricas animadas + nota de lectura | 5 |
| `simulador` | Barras horizontales + tarjeta de conclusión | 6 |
| `hallazgos` | Dos columnas de tres tarjetas | 7 |
| `triangulacion` | Tres métricas + tres tarjetas (dicen · hacen · fallan) | 8 |
| `criterios` | Tres columnas de seis criterios; punto = prioridad alta | 9 |
| `siguientes` | Cuatro pasos + tarjeta oscura de siguiente paso | 10 |
| `conclusiones` | Cuatro puntos numerados + Chispa | 11 |
| `gracias` | Cierre oscuro con desfile de Chispas | 12 |

## Trazabilidad de datos (escena → informe)

| Escena | Dato | Dónde está en el informe |
| --- | --- | --- |
| 1, 4 | 46 estudiantes con actividad de 50 registrados; 4 docentes; 23 y 21 inscritos | 3.1, 4.1 |
| 3 | 7 mecánicas, 6 simuladores, 35 + 35 experiencias, Chispa, práctica infinita | 3.2 |
| 4 | Fechas 16 y 17 de septiembre y 26 de octubre; cinco fuentes; diseño mixto convergente | 3.1, 3.3, 3.4 |
| 4 | 22 intentos de Física y 68 de Química (90 en total) | 4.1, Tabla 1 |
| 5 | 90 evaluaciones, 57 entrevistas y encuestas válidas | 4.1 |
| 5 | Satisfacción 4,58; 76% satisfactorio o dominado; 49% marcó 5 en todo | 4.3 (satisfacción y “Cómo leer estos datos”) |
| 5, 6 | 223 lanzamientos de 22 estudiantes | 4.3 (simulador de fricción) |
| 6 | Logro: valores medidos 88%, ecuaciones 73%, respuesta final 60% | Figura 12 |
| 6 | 1 de 10 completamente correcto en el Ejercicio 2; r ≈ −0,02 (Ejercicio 1) | 4.3 |
| 7 | 46% pide interfaz intuitiva; 11 de 13 la ven fácil; 8 de 13 simuladores; 4,64 | 4.2, 4.3, 4.4 |
| 7 | 7 de 39 piden explicación del error; 9 comentarios; 3 piden tutorial | 4.2, 4.3, 4.4 |
| 7 | Monotonía 26%; información errónea 21%; costo 21% (provisional) | Figura 6 y recuadro de encuesta pública |
| 8 | 22 comentarios; 63 respuestas de “unir”; 0–20% frente a 73–82% en opción múltiple; corrección del 4 de octubre | 4.3 (hallazgo sobre “unir”), Figura 9 |
| 9 | 18 criterios, 13 de prioridad alta | Tabla 2 |
| 10 | Tutorial de 30–60 s, acceso por enlace único u OIDC, relevancia y viabilidad 1–5 | 9, 11.1, Anexo C |
| 11 | Cuatro primeras ideas de la discusión | 5 (puntos 1–4) |

## Por qué la escena 8 usa “73–82%” y no “22 + 18 + 15 + 6”

El texto del informe habla de 63 respuestas de “unir”, mientras que las barras de la Figura 9
suman 61. La presentación solo usa las cifras que el informe afirma de forma explícita (63,
0–20%, 22 comentarios) y no suma las barras.

## Frases a evitar en la exposición

- No decir “mejoró el aprendizaje”: el estudio no mide efecto causal.
- No decir que la satisfacción fue “altísima” sin mencionar el efecto techo.
- Costo y conectividad vienen de la encuesta pública con nueve envíos atípicos: son provisionales.
