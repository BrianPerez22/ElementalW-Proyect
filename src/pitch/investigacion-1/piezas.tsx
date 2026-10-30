import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

/**
 * Piezas del pitch oscuro: texto con marcas, entrada escalonada y barras que se llenan.
 * Los tiempos y curvas son los del pitch original (HTML aparte) para que se vea y se sienta igual.
 */

/** Curvas del pitch original: `ease` de CSS (contenido), entrada y salida de escena. */
const EASE_CSS = [0.25, 0.1, 0.25, 1] as const;
const ENTRADA = [0.25, 0.46, 0.45, 0.94] as const;
const SALIDA = [0.55, 0, 1, 0.45] as const;

/** Qué se necesita para orientar la transición de escena. `primera`: carga inicial (sin deslizamiento). */
export interface DireccionEscena {
  sentido: number;
  primera: boolean;
}

/** Escena: se desliza 60 px (entra por el lado hacia el que se navega) y, al terminar, entra su contenido. */
export const escenaRaiz: Variants = {
  oculto: ({ sentido, primera }: DireccionEscena) =>
    primera ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 * sentido },
  visible: ({ primera }: DireccionEscena) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: ENTRADA, delayChildren: primera ? 0 : 0.52 },
  }),
  salida: ({ sentido }: DireccionEscena) => ({
    opacity: 0,
    x: -60 * sentido,
    transition: { duration: 0.45, ease: SALIDA },
  }),
};

/** Hijo de un grupo: sube 20 px y aparece. Al salir de la escena se desvanece. */
export const hijo: Variants = {
  oculto: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_CSS } },
  salida: { opacity: 0, y: 20, transition: { duration: 0.6, ease: EASE_CSS } },
};

const grupo: Variants = {
  oculto: {},
  visible: { transition: { delayChildren: 0.05, staggerChildren: 0.1 } },
  salida: {},
};

/** Contenedor que escalona a sus hijos (0,05 s + 0,1 s por hijo). Sus hijos directos son `Hijo` o `motion.* variants={hijo}`. */
export function Grupo({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} variants={grupo}>
      {children}
    </motion.div>
  );
}

export function Hijo({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <motion.div className={className} variants={hijo}>
      {children}
    </motion.div>
  );
}

/** Relleno de una barra: crece de 0 al `ancho` (%) cuando la escena ya terminó de entrar. */
export function Relleno({ ancho, clase }: { ancho: number; clase: string }) {
  return (
    <motion.div
      className={clase}
      initial={{ width: '0%' }}
      animate={{ width: `${ancho}%` }}
      transition={{ duration: 1.4, delay: 0.92, ease: ENTRADA }}
    />
  );
}

const MARCAS = /(\*\*[\s\S]+?\*\*|__[\s\S]+?__|\{\{(?:verde|naranja):[\s\S]+?\}\})/;

function partes(linea: string): ReactNode[] {
  return linea.split(MARCAS).map((parte, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{parte}</Fragment>;
    if (parte.startsWith('**')) return <em key={i}>{parte.slice(2, -2)}</em>;
    if (parte.startsWith('__')) return <strong key={i}>{parte.slice(2, -2)}</strong>;
    const [, tono, texto] = /^\{\{(verde|naranja):([\s\S]+)\}\}$/.exec(parte)!;
    return (
      <span key={i} className={tono === 'verde' ? 'accent' : 'warn'}>
        {texto}
      </span>
    );
  });
}

/**
 * Texto con marcas: **acento** (em), __blanco__ (strong), {{verde:…}} y {{naranja:…}}; \n = salto de línea.
 * Solo se interpretan estas marcas, nunca HTML del archivo de contenido.
 */
export function Texto({ texto }: { texto: string }) {
  return (
    <>
      {texto.split('\n').map((linea, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {partes(linea)}
        </Fragment>
      ))}
    </>
  );
}

export const cls = (...clases: (string | false | undefined)[]): string => clases.filter(Boolean).join(' ');
