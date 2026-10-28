# Elemental W · Sitio de presentación

Sitio web (borrador) que presenta **Elemental W**, una aplicación web para la enseñanza de ciencias básicas e investigación con estudiantes y profesores, y las investigaciones realizadas con ella.

Stack: **React 18 + TypeScript + Vite + Tailwind CSS + lucide-react**. Solo front-end, sin backend.

## Ejecutar

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # genera dist/ (verifica tipos antes)
npm run preview    # prueba local del build
```

## Estructura

```
public/
  investigacion-1/poster.pdf, poster.png   ← póster de la Investigación 1
  app-preview.png, favicon.svg
src/
  types.ts                  ← modelo de datos (Research, bloques de contenido)
  data/
    site.ts                 ← textos del sitio (descripción, pilares)
    metricas.ts             ← métricas globales
    investigaciones/
      index.ts              ← REGISTRO de investigaciones
      investigacion-1.ts    ← póster Research Summit 2026
      investigacion-2.ts    ← en progreso (encuestas/entrevistas + telemetría)
  components/               ← secciones, tarjetas, modal, gráfico
```

## Agregar una nueva investigación

1. Copia `src/data/investigaciones/investigacion-2.ts` como `investigacion-3.ts` y cambia `id`, `number`, textos y `blocks`.
2. (Opcional) Crea `public/investigacion-3/` con `poster.pdf` y `poster.png` y rellena el campo `poster`.
3. En `src/data/investigaciones/index.ts` impórtala y añádela al arreglo `investigaciones`.

La tarjeta, el contador, el modal y el enlace directo (`#investigacion-3`) aparecen solos.

Bloques disponibles en `blocks`: `paragraph`, `callout`, `stats`, `comparison` (gráfico de barras de dos series), `table`, `list` y `references`.

Cuando una investigación en progreso termine, cambia `status` a `'completada'` y actualiza `metricas.ts` si quieres mostrar sus cifras.

## Publicar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub (rama `main`).
2. En **Settings → Pages → Source** elige **GitHub Actions**.
3. Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica el sitio.

> Antes de hacer el repositorio público: el PDF del póster quedará accesible para cualquiera. Confirma que tienes autorización para publicarlo.
