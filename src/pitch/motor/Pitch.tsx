import { useLayoutEffect, useMemo } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import EscenaVista from './Escena';
import { RESORTE_SUAVE } from './movimiento';
import type { DireccionEscena } from './movimiento';
import { AvisoContext, ContenidoContext } from './piezas';
import type { Contenido } from './tipos';
import { useMazo } from './useMazo';
import './pitch.css';
import '../recursos/fuentes/fuentes.css';

/**
 * Pitch a pantalla completa: escenas de 1280 × 720 escaladas al tamaño de la ventana,
 * transiciones y entradas con Framer Motion, navegación con teclado, clic, deslizamiento y botones.
 * En pantalla completa se ocultan por completo botones, índice y barra de progreso.
 * La navegación (escena actual, URL, teclado, pantalla completa, escala) vive en useMazo.ts.
 */
export default function Pitch({ contenido }: { contenido: Contenido }) {
  const { escenas, interfaz: ui } = contenido;
  const total = escenas.length;
  const reducido = Boolean(useReducedMotion());

  const {
    indice, sentido, ir, aviso, avisar, pantallaCompleta, puedePantallaCompleta,
    alternarPantallaCompleta, mazoRef, lienzoRef, alPulsar, alSoltar,
  } = useMazo({ total, ancho: 1280, alto: 720, titulo: ui.titulo, errorCompleta: ui.errorCompleta });

  // El color de la escena tiñe la página entera: así no hay franjas blancas ni cortes de color.
  const tema = escenas[indice]!.tema;
  useLayoutEffect(() => {
    document.body.dataset['tema'] = tema;
  }, [tema]);

  const direccion = useMemo<DireccionEscena>(() => ({ sentido, reducido }), [sentido, reducido]);
  const escena = escenas[indice]!;

  return (
    <ContenidoContext.Provider value={contenido}>
      <AvisoContext.Provider value={avisar}>
        <MotionConfig reducedMotion="user">
          <main
            id="deck"
            ref={mazoRef}
            tabIndex={-1}
            aria-label={ui.presentacion}
            onPointerDown={alPulsar}
            onPointerUp={alSoltar}
          >
            <div id="canvas" ref={lienzoRef}>
              <AnimatePresence custom={direccion} initial>
                <EscenaVista key={indice} escena={escena} indice={indice} direccion={direccion} />
              </AnimatePresence>
            </div>
          </main>

          <footer className="controls">
            <button id="previous" type="button" aria-label={ui.anterior} disabled={indice === 0} onClick={() => ir(indice - 1, true)}>
              <span aria-hidden="true">←</span>
            </button>
            <output id="counter" aria-live="polite" aria-atomic="true">
              {`${String(indice + 1).padStart(2, '0')}${ui.separadorContador}${total}`}
            </output>
            <nav id="scene-nav" aria-label={ui.indice}>
              {escenas.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className="scene-dot"
                  title={`${i + 1}. ${item.titulo}`}
                  aria-label={`${i + 1}. ${item.titulo}`}
                  aria-current={i === indice ? 'step' : undefined}
                  onClick={() => ir(i, true)}
                >
                  {i === indice ? <motion.span layoutId="punto-activo" className="dot-active" transition={RESORTE_SUAVE} /> : null}
                </button>
              ))}
            </nav>
            <span id="keyboard-help">{ui.ayuda}</span>
            <button
              id="fullscreen"
              type="button"
              aria-pressed={pantallaCompleta}
              hidden={!puedePantallaCompleta}
              onClick={() => void alternarPantallaCompleta()}
            >
              {pantallaCompleta ? ui.salirCompleta : ui.completa}
            </button>
            <button id="next" type="button" aria-label={ui.siguiente} disabled={indice === total - 1} onClick={() => ir(indice + 1, true)}>
              <span aria-hidden="true">→</span>
            </button>
            <div
              id="progress"
              role="progressbar"
              aria-label={ui.progreso}
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={indice + 1}
            >
              <motion.span initial={false} animate={{ scaleX: (indice + 1) / total }} transition={RESORTE_SUAVE} />
            </div>
          </footer>

          <p id="notice" role="alert" hidden={aviso === null}>{aviso}</p>
        </MotionConfig>
      </AvisoContext.Provider>
    </ContenidoContext.Provider>
  );
}
