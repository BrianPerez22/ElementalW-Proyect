/** Resuelve una ruta de /public respetando la base de Vite (necesario en GitHub Pages). */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
