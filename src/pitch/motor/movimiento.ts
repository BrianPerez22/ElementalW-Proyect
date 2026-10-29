import type { Transition, Variants } from 'framer-motion';

/**
 * Lenguaje de movimiento del pitch (Framer Motion).
 * Todas las escenas usan los mismos resortes, curvas y variantes, así que el pitch se siente
 * como una sola pieza. Para cambiar el «carácter» de toda la presentación, edita este archivo.
 */

/** Curvas (cubic-bezier) */
export const SALIDA_EXPO = [0.16, 1, 0.3, 1] as const; // llega rápido y frena suave
export const ENTRADA_SALIDA = [0.76, 0, 0.24, 1] as const; // transición de escena

/** Resortes */
export const RESORTE: Transition = { type: 'spring', stiffness: 280, damping: 26, mass: 0.85 };
export const RESORTE_ELASTICO: Transition = { type: 'spring', stiffness: 420, damping: 15, mass: 0.7 };
export const RESORTE_SUAVE: Transition = { type: 'spring', stiffness: 120, damping: 20, mass: 1 };

/** Duración total de la transición entre escenas (s) y momento en que empieza el contenido. */
export const DURACION_ESCENA = 0.72;
export const INICIO_CONTENIDO = 0.3;

/** Tarjeta: entra con un resorte y luego escalona su contenido (número, ilustración, texto). */
export const tarjeta: Variants = {
  oculto: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { ...RESORTE, delayChildren: 0.1, staggerChildren: 0.07 } },
};
/** Chispa dentro del globo/mascota: llega con rebote y saluda. */
export const mascota: Variants = {
  oculto: { opacity: 0, y: 36, scale: 0.4, rotate: -14 },
  visible: {
    opacity: 1, y: 0, scale: [0.4, 1.1, 1], rotate: [-14, 7, -3, 0],
    transition: { duration: 0.95, ease: SALIDA_EXPO, delay: 0.1 },
  },
};
/** Globo de diálogo: brota desde su cola. */
export const globo: Variants = {
  oculto: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 360, damping: 17, delay: 0.35 } },
};

/** Contenedor que escalona a sus hijos. */
export const grupo = (retraso = 0, escalon = 0.09): Variants => ({
  oculto: {},
  visible: { transition: { delayChildren: INICIO_CONTENIDO + retraso, staggerChildren: escalon } },
});

/** Grupo dentro de otro grupo: el retraso base ya lo puso el contenedor de la escena. */
export const anidado = (retraso = 0, escalon = 0.09): Variants => ({
  oculto: {},
  visible: { transition: { delayChildren: retraso, staggerChildren: escalon } },
});

/** Columna que entra desde un lado y escalona sus tarjetas. */
export const columna = (lado: -1 | 1): Variants => ({
  oculto: { opacity: 0, x: lado * 60 },
  visible: { opacity: 1, x: 0, transition: { ...RESORTE, delayChildren: 0.18, staggerChildren: 0.11 } },
});
/** Bandera de prioridad: aparece con rebote después de su fila. */
export const bandera: Variants = {
  oculto: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 460, damping: 14, delay: 0.55 } },
};
/** Personajes del cierre: saltan desde abajo. */
export const salto: Variants = {
  oculto: { y: 190, opacity: 0, scale: 0.6 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 240, damping: 11 } },
};

/** Transición de escena (círculo de color que se abre). `custom` = { sentido, reducido }. */
export interface DireccionEscena {
  sentido: number;
  reducido: boolean;
}

/** Variantes de entrada para tarjetas, piezas y textos. */
export const subir: Variants = {
  oculto: { opacity: 0, y: 26, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: RESORTE },
};
export const aparecer: Variants = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};
export const pop: Variants = {
  oculto: { opacity: 0, scale: 0.55, rotate: -8 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: RESORTE_ELASTICO },
};
export const desdeIzquierda: Variants = {
  oculto: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: RESORTE },
};
export const desdeDerecha: Variants = {
  oculto: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: RESORTE },
};
/** Píldoras y etiquetas: se abren desde el centro. */
export const abrir: Variants = {
  oculto: { opacity: 0, scaleX: 0.2 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5, ease: SALIDA_EXPO } },
};
/** Sello: el número cae encima de la tarjeta. */
export const sello: Variants = {
  oculto: { opacity: 0, scale: 1.9, rotate: -14 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 380, damping: 20, delay: 0.12 } },
};
/** Resaltador bajo las cifras en negrita. */
export const marcador: Variants = {
  oculto: { backgroundSize: '0% 100%' },
  visible: { backgroundSize: '100% 100%', transition: { duration: 0.6, ease: SALIDA_EXPO, delay: 0.45 } },
};
/** Línea que se dibuja de izquierda a derecha. */
export const riel: Variants = {
  oculto: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: SALIDA_EXPO, delay: 0.25 } },
};
/** Palabra que sube desde una máscara (titulares). */
export const palabra: Variants = {
  oculto: { y: '115%', rotate: 3 },
  visible: { y: '0%', rotate: 0, transition: { duration: 0.65, ease: SALIDA_EXPO } },
};
export const letra: Variants = {
  oculto: { y: '120%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 18 } },
};

/** Transición de escena: un círculo de color se abre desde la esquina hacia la que se navega. */
const origenCirculo = (sentido: number) => (sentido >= 0 ? '90% 92%' : '10% 92%');
export const escenaRaiz: Variants = {
  oculto: ({ sentido, reducido }: DireccionEscena) =>
    reducido ? { opacity: 0 } : { clipPath: `circle(0px at ${origenCirculo(sentido)})` },
  visible: ({ sentido, reducido }: DireccionEscena) =>
    reducido
      ? { opacity: 1, transition: { duration: 0.2 } }
      : {
          clipPath: `circle(5200px at ${origenCirculo(sentido)})`,
          transition: { duration: DURACION_ESCENA, ease: ENTRADA_SALIDA },
        },
  salida: ({ reducido }: DireccionEscena) =>
    reducido
      ? { opacity: 0, transition: { duration: 0.2 } }
      : { scale: 0.965, opacity: 0.55, transition: { duration: DURACION_ESCENA, ease: ENTRADA_SALIDA } },
};
