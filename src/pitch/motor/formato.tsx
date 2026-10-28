import { Fragment } from 'react';
import type { Interfaz, Metrica } from './tipos';

/** Formatea un número según la configuración regional del pitch (coma decimal, signos, % y pp). */
export function formatear(valor: number, ui: Interfaz, metrica: Partial<Metrica> = {}): string {
  const numero = Math.abs(valor)
    .toFixed(metrica.decimales ?? 0)
    .replace('.', ui.decimal);
  const signo = valor < 0 ? ui.negativo : metrica.signo && valor > 0 ? ui.positivo : '';
  const unidad = metrica.unidad === 'pp' ? ui.puntos : metrica.unidad === '%' ? ui.porcentaje : '';
  return `${signo}${numero}${unidad}`;
}

/**
 * Texto con énfasis: lo que va entre **dobles asteriscos** se muestra en negrita.
 * Solo se interpreta ese énfasis, nunca HTML del archivo de contenido.
 */
export function Rico({ texto }: { texto: string | number }) {
  return (
    <>
      {String(texto)
        .split('**')
        .map((parte, i) => (i % 2 ? <strong key={i}>{parte}</strong> : <Fragment key={i}>{parte}</Fragment>))}
    </>
  );
}
