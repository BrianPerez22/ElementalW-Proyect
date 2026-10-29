import { Fragment, useEffect } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { letra, marcador, palabra, SALIDA_EXPO } from './movimiento';
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
 * Con `resaltar`, la negrita se subraya con un marcador que se dibuja al entrar la tarjeta
 * (hereda la variante «visible» del elemento animado más cercano).
 */
export function Rico({ texto, resaltar = false }: { texto: string | number; resaltar?: boolean }) {
  return (
    <>
      {String(texto)
        .split('**')
        .map((parte, i) =>
          i % 2 ? (
            resaltar ? (
              <motion.strong key={i} className="marca" variants={marcador}>
                {parte}
              </motion.strong>
            ) : (
              <strong key={i}>{parte}</strong>
            )
          ) : (
            <Fragment key={i}>{parte}</Fragment>
          ),
        )}
    </>
  );
}

/** Titular que sube palabra por palabra desde una máscara. Respeta los **énfasis** del texto. */
export function Palabras({ texto, escalon = 0.045 }: { texto: string; escalon?: number }) {
  const tokens: { t: string; fuerte: boolean }[] = [];
  texto.split('**').forEach((parte, i) =>
    parte
      .split(/\s+/)
      .filter(Boolean)
      .forEach((t) => tokens.push({ t, fuerte: i % 2 === 1 })),
  );
  return (
    <motion.span
      className="palabras"
      aria-label={texto.replace(/\*\*/g, '')}
      variants={{ oculto: {}, visible: { transition: { staggerChildren: escalon } } }}
    >
      {tokens.map(({ t, fuerte }, i) => (
        <Fragment key={i}>
          <span className="palabra-mascara" aria-hidden="true">
            <motion.span className={fuerte ? 'palabra marca-fuerte' : 'palabra'} variants={palabra}>
              {t}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </motion.span>
  );
}

/** Titular que sube letra por letra (cierre y portada). */
export function Letras({ texto, escalon = 0.045 }: { texto: string; escalon?: number }) {
  return (
    <motion.span
      className="palabras"
      aria-label={texto}
      variants={{ oculto: {}, visible: { transition: { staggerChildren: escalon } } }}
    >
      {[...texto].map((c, i) => (
        <span key={i} className="palabra-mascara" aria-hidden="true">
          <motion.span className="palabra" variants={letra}>
            {c === ' ' ? '\u00a0' : c}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Número que cuenta desde cero hasta `valor` con la curva de salida del pitch. */
export function Contador({
  valor,
  ui,
  opciones,
  retraso = 0,
  duracion = 1.1,
}: {
  valor: number;
  ui: Interfaz;
  opciones: Partial<Metrica>;
  retraso?: number;
  duracion?: number;
}) {
  const reducido = useReducedMotion();
  const progreso = useMotionValue(reducido ? valor : 0);
  const texto = useTransform(progreso, (v) => formatear(v, ui, opciones));
  useEffect(() => {
    if (reducido) {
      progreso.set(valor);
      return;
    }
    const control = animate(progreso, valor, { duration: duracion, delay: retraso, ease: SALIDA_EXPO });
    return () => control.stop();
  }, [valor, retraso, duracion, reducido, progreso]);
  return <motion.span>{texto}</motion.span>;
}

/** Texto como «23 inscritos» o «35 experiencias»: el número inicial cuenta; el resto queda igual. */
export function TextoContado({ texto, ui, retraso = 0 }: { texto: string; ui: Interfaz; retraso?: number }) {
  const m = /^(\d+)(.*)$/s.exec(texto);
  if (!m) return <>{texto}</>;
  return (
    <>
      <Contador valor={Number(m[1])} ui={ui} opciones={{}} retraso={retraso} duracion={0.9} />
      {m[2]}
    </>
  );
}
