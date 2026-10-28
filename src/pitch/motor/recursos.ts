/**
 * Ilustraciones de Chispa. Vite las procesa (rutas con hash y base relativa), así que funcionan
 * igual en desarrollo, en GitHub Pages y abriendo dist/ desde cualquier carpeta.
 */
const archivos = import.meta.glob('../recursos/chispa/**/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** `ruta` es la ruta dentro de src/pitch/recursos/, p. ej. "chispa/Circulo/chispa-circulo-rosa.svg". */
export function urlRecurso(ruta: string): string | undefined {
  return archivos[`../recursos/${ruta}`];
}
