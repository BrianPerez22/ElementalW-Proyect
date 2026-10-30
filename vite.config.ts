import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * PÁGINAS DEL SITIO (multipágina)
 *  - `main`: el sitio principal (index.html).
 *  - `pitch-*`: cada pitch vive en su propio HTML dentro de pitch/<nombre>/index.html
 *    y se publica en /pitch/<nombre>/.
 * Para sumar un pitch nuevo agrega su línea aquí.
 * Ver el README, sección «Pitch».
 */
const paginas = {
  main: './index.html',
  'pitch-investigacion-1': './pitch/investigacion-1/index.html',
  'pitch-investigacion-2': './pitch/investigacion-2/index.html',
};

// base './' => funciona en GitHub Pages (https://usuario.github.io/repo/) sin configurar nada más.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: { input: paginas },
  },
});
