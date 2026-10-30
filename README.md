# Elemental W · Sitio de presentación

Sitio web que presenta **Elemental W**, una aplicación web para la enseñanza de ciencias básicas e investigación con estudiantes y profesores, y las investigaciones realizadas con ella.

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
index.html                                  ← sitio principal
pitch/
  investigacion-1/index.html                ← página del pitch de la Investigación 1 (solo el pitch)
  investigacion-2/index.html                ← página del pitch de la Investigación 2 (solo el pitch)
public/
  investigacion-1/poster.pdf, poster.png    ← póster de la Investigación 1
  investigacion-2/poster.pdf, poster.png    ← póster de la Investigación 2 (V EISI 2026)
  app-preview.png, favicon.svg
docs/
  pitch-investigacion-2.md                  ← diseño del pitch y trazabilidad de sus cifras
src/
  types.ts                  ← modelo de datos (Research, Pitch, bloques de contenido)
  data/
    site.ts                 ← textos del sitio (descripción, pilares)
    metricas.ts             ← métricas globales (panorama de las dos investigaciones)
    investigaciones/
      index.ts              ← REGISTRO de investigaciones
      investigacion-1.ts    ← póster Research Summit 2026 (pre-test / post-test)
      investigacion-2.ts    ← póster V EISI 2026 (estudio mixto, 18 criterios) + enlace al pitch
  components/               ← secciones, tarjetas, modal, gráfico
  pitch/
    motor/                  ← motor compartido: useMazo.ts (navegación, URL, teclado, pantalla completa, escala)
                              y Pitch/Escena (aspecto del pitch 2)
    recursos/               ← ilustraciones de Chispa y fuentes del pitch
    investigacion-1/        ← pitch oscuro (1920×1080): contenido.ts, Escenas.tsx, iconos.tsx, estilos.css, main.tsx
    investigacion-2/        ← contenido.ts (textos y cifras) y main.tsx del pitch 2
```

## Agregar una nueva investigación

1. Copia `src/data/investigaciones/investigacion-2.ts` como `investigacion-3.ts` y cambia `id`, `number`, textos y `blocks`.
2. (Opcional) Crea `public/investigacion-3/` con `poster.pdf` y `poster.png` y rellena el campo `poster`.
3. En `src/data/investigaciones/index.ts` impórtala y añádela al arreglo `investigaciones`.

La tarjeta, el contador, el modal y el enlace directo (`#investigacion-3`) aparecen solos.

Bloques disponibles en `blocks`: `paragraph`, `callout`, `stats`, `comparison` (gráfico de barras de dos series), `bars` (barras de una serie, en %), `table`, `list` y `references`.

Cuando una investigación en progreso termine, cambia `status` a `'completada'` y actualiza `metricas.ts` si quieres mostrar sus cifras.

## Pitch (presentación corta de una investigación)

Cada pitch es una página **aparte** (su propio HTML) que muestra únicamente la presentación; el sitio
principal solo enlaza a ella desde un botón en la tarjeta de la investigación.

- **Investigación 1:** `pitch/investigacion-1/` → en el sitio publicado, `/pitch/investigacion-1/` (15 escenas, tema oscuro).
- **Investigación 2:** `pitch/investigacion-2/` → en el sitio publicado, `/pitch/investigacion-2/`.
  12 escenas, ≈ 5 minutos. Teclas: `←` `→` (escena anterior/siguiente), `Home`/`End`, `F` (pantalla completa)
  y `#7` en la URL abre directo la escena 7.
- **Editar el texto o las cifras:** solo `src/pitch/investigacion-N/contenido.ts` (el pitch 1 usa marcas `**acento**`, `__blanco__`, `{{verde:…}}`; están al inicio de su `tipos.ts`)
  (`**negrita**` para destacar, `\n` para salto de línea, sin HTML). Trazabilidad de cada cifra en
  `docs/pitch-investigacion-2.md`.
- **El motor** (`src/pitch/motor/`) no tiene texto propio: dibuja cualquier `Contenido` (ver `tipos.ts`).

### Agregar el pitch de otra investigación

1. Crea `src/pitch/investigacion-N/` con `contenido.ts` (`export const contenido: Contenido = {...}`,
   puedes partir de `../investigacion-2/contenido.ts`; si necesita otro aspecto, hazlo como el pitch 1 y reutiliza `useMazo`) y `main.tsx` (cópialo del pitch 2 y cambia el import).
2. Crea `pitch/investigacion-1/index.html` (cópialo de `pitch/investigacion-2/index.html` y cambia el título
   y la ruta del script a `/src/pitch/investigacion-1/main.tsx`).
3. En `vite.config.ts` agrega `'pitch-investigacion-1': './pitch/investigacion-1/index.html'` a `paginas`.
4. En `src/data/investigaciones/investigacion-1.ts` agrega el campo
   `pitch: { href: 'pitch/investigacion-1/', label: 'Abrir pitch', detail: '…' }`.
   El botón aparece solo en la tarjeta.

Las ilustraciones nuevas van en `src/pitch/recursos/chispa/` y se referencian en `assets` del contenido.

## Publicar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub (rama `main`).
2. En **Settings → Pages → Source** elige **GitHub Actions**.
3. Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica el sitio.

> Antes de hacer el repositorio público: el PDF del póster quedará accesible para cualquiera. Confirma que tienes autorización para publicarlo.
