import { useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useMazo } from '../motor/useMazo';
import EscenaVista from './Escenas';
import type { DireccionEscena } from './piezas';
import type { Contenido } from './tipos';
import './estilos.css';
import '../recursos/fuentes/fuentes-oscuro.css';

/**
 * Pitch de tema oscuro a pantalla completa: escenas de 1920 × 1080 escaladas a la ventana.
 * La navegación (URL #n, teclado, pantalla completa, deslizamiento) es la misma de todos los pitches
 * (motor/useMazo.ts); aquí solo se dibuja el aspecto: fondo con brillos, contador, puntos y ayuda.
 * Teclas: ← → espacio · ↑ primera · ↓ última · 1–9 salta a esa escena · Home/End · F pantalla completa.
 */
export default function Presentacion({ contenido }: { contenido: Contenido }) {
  const { escenas, interfaz: ui } = contenido;
  const total = escenas.length;

  const { indice, sentido, ir, aviso, mazoRef, lienzoRef, alPulsar, alSoltar } = useMazo({
    total,
    ancho: 1920,
    alto: 1080,
    titulo: ui.titulo,
    errorCompleta: ui.errorCompleta,
    teclasExtra: (irA, n) => ({
      ArrowUp: () => irA(0),
      ArrowDown: () => irA(n - 1),
      ...Object.fromEntries(
        Array.from({ length: Math.min(9, n) }, (_, i) => [String(i + 1), () => irA(i)] as const),
      ),
    }),
  });

  // La escena con la que se abre la página aparece sin deslizarse; las siguientes entran por el lado
  // hacia el que se navega.
  const montada = useRef(false);
  useEffect(() => {
    montada.current = true;
  }, []);
  const direccion = useMemo<DireccionEscena>(() => ({ sentido, primera: !montada.current }), [sentido, indice]);

  const escena = escenas[indice]!;
  const dos = (n: number) => String(n).padStart(2, '0');

  return (
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
          <div className="bg-glow bg-glow--1" />
          <div className="bg-glow bg-glow--2" />
          <div className="bg-glow bg-glow--3" />

          <AnimatePresence custom={direccion} initial>
            <EscenaVista key={indice} escena={escena} indice={indice} direccion={direccion} />
          </AnimatePresence>

          <output id="slide-counter" aria-live="polite" aria-atomic="true">
            {`${dos(indice + 1)}${ui.separadorContador}${dos(total)}`}
          </output>
          <nav id="progress-dots" aria-label={ui.indice}>
            {escenas.map((item, i) => (
              <button
                key={i}
                type="button"
                className={i === indice ? 'dot active' : 'dot'}
                title={`${i + 1}. ${item.nombre}`}
                aria-label={`${i + 1}. ${item.nombre}`}
                aria-current={i === indice ? 'step' : undefined}
                onClick={() => ir(i, true)}
              />
            ))}
          </nav>
          <div id="nav-hints" aria-hidden="true">
            <span className="nav-key">←</span>
            <span className="nav-key">→</span>
            <span style={{ color: 'var(--grey2)' }}>{ui.navegar}</span>
          </div>
        </div>
      </main>
      <p id="notice" role="alert" hidden={aviso === null}>
        {aviso}
      </p>
    </MotionConfig>
  );
}
