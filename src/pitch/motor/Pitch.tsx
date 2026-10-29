import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as EventoPuntero } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import EscenaVista from './Escena';
import { RESORTE_SUAVE } from './movimiento';
import type { DireccionEscena } from './movimiento';
import { AvisoContext, ContenidoContext } from './piezas';
import type { Contenido } from './tipos';
import './pitch.css';
import '../recursos/fuentes/fuentes.css';

/** Lectura del número de escena desde la URL (#7 → índice 6). Si no es válido, la primera. */
function indiceDesdeHash(total: number): number {
  const hash = window.location.hash.slice(1);
  const valor = /^\d+$/.test(hash) ? Number(hash) : 1;
  return Number.isSafeInteger(valor) && valor >= 1 && valor <= total ? valor - 1 : 0;
}

/** ¿Está la página en pantalla completa? (API de pantalla completa o F11 del navegador). */
function enPantallaCompleta(): boolean {
  return Boolean(document.fullscreenElement) || matchMedia('(display-mode: fullscreen)').matches;
}

/**
 * Pitch a pantalla completa: escenas de 1280 × 720 escaladas al tamaño de la ventana,
 * transiciones y entradas con Framer Motion, navegación con teclado, clic, deslizamiento y botones.
 * En pantalla completa se ocultan por completo botones, índice y barra de progreso.
 */
export default function Pitch({ contenido }: { contenido: Contenido }) {
  const { escenas, interfaz: ui } = contenido;
  const total = escenas.length;
  const reducido = Boolean(useReducedMotion());

  const [indice, setIndice] = useState(() => indiceDesdeHash(total));
  const [sentido, setSentido] = useState(1);
  const [aviso, setAviso] = useState<string | null>(null);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);
  const puedePantallaCompleta = typeof document !== 'undefined' && document.fullscreenEnabled;

  const mazoRef = useRef<HTMLElement>(null);
  const lienzoRef = useRef<HTMLDivElement>(null);
  const indiceRef = useRef(indice);
  indiceRef.current = indice;
  const toqueRef = useRef<{ x: number; y: number } | null>(null);

  const avisar = useCallback((mensaje: string, error?: unknown) => {
    console.error('[pitch]', mensaje, error ?? '');
    setAviso(mensaje);
  }, []);

  /** Cambia de escena. Con `desdeUsuario` actualiza la URL y devuelve el foco al mazo. */
  const ir = useCallback(
    (destino: number, desdeUsuario = false) => {
      const meta = Math.max(0, Math.min(total - 1, destino));
      if (meta === indiceRef.current) return;
      setSentido(meta > indiceRef.current ? 1 : -1);
      if (desdeUsuario) {
        if (window.location.hash !== `#${meta + 1}`) window.location.hash = String(meta + 1);
        mazoRef.current?.focus({ preventScroll: true });
      }
      setIndice(meta);
    },
    [total],
  );

  // Título de la pestaña.
  useEffect(() => {
    document.title = ui.titulo;
  }, [ui]);

  // El color de la escena tiñe la página entera: así no hay franjas blancas ni cortes de color.
  const tema = escenas[indice]!.tema;
  useLayoutEffect(() => {
    document.body.dataset['tema'] = tema;
  }, [tema]);

  // Escala del lienzo al tamaño disponible.
  useLayoutEffect(() => {
    const mazo = mazoRef.current;
    const lienzo = lienzoRef.current;
    if (!mazo || !lienzo) return;
    const ajustar = () => {
      const caja = mazo.getBoundingClientRect();
      const escala = Math.min(caja.width / 1280, caja.height / 720);
      if (escala > 0) lienzo.style.setProperty('--scale', String(escala));
    };
    const observador = new ResizeObserver(ajustar);
    observador.observe(mazo);
    window.addEventListener('resize', ajustar);
    window.addEventListener('orientationchange', ajustar);
    window.visualViewport?.addEventListener('resize', ajustar);
    ajustar();
    return () => {
      observador.disconnect();
      window.removeEventListener('resize', ajustar);
      window.removeEventListener('orientationchange', ajustar);
      window.visualViewport?.removeEventListener('resize', ajustar);
    };
  }, []);

  const alternarPantallaCompleta = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    } catch (error) {
      avisar(ui.errorCompleta, error);
    }
  }, [avisar, ui]);

  // Teclado, hash de la URL y pantalla completa.
  useEffect(() => {
    const alTeclear = (evento: KeyboardEvent) => {
      if (
        evento.altKey ||
        evento.ctrlKey ||
        evento.metaKey ||
        (evento.target instanceof Element && evento.target.closest('input,textarea,select,[contenteditable]'))
      )
        return;
      const enBoton = evento.target instanceof Element && evento.target.closest('button');
      const acciones: Partial<Record<string, () => void>> = {
        ArrowRight: () => ir(indiceRef.current + 1, true),
        PageDown: () => ir(indiceRef.current + 1, true),
        ArrowLeft: () => ir(indiceRef.current - 1, true),
        PageUp: () => ir(indiceRef.current - 1, true),
        Home: () => ir(0, true),
        End: () => ir(total - 1, true),
        f: () => void alternarPantallaCompleta(),
        F: () => void alternarPantallaCompleta(),
        ...(enBoton ? {} : { ' ': () => ir(indiceRef.current + (evento.shiftKey ? -1 : 1), true) }),
      };
      const accion = acciones[evento.key];
      if (accion) {
        evento.preventDefault();
        accion();
      }
    };
    const alCambiarHash = () => {
      const destino = indiceDesdeHash(total);
      setSentido(destino >= indiceRef.current ? 1 : -1);
      setIndice(destino);
    };
    const pantalla = matchMedia('(display-mode: fullscreen)');
    const alCambiarPantalla = () => setPantallaCompleta(enPantallaCompleta());

    document.addEventListener('keydown', alTeclear);
    window.addEventListener('hashchange', alCambiarHash);
    document.addEventListener('fullscreenchange', alCambiarPantalla);
    pantalla.addEventListener('change', alCambiarPantalla);
    alCambiarPantalla();
    return () => {
      document.removeEventListener('keydown', alTeclear);
      window.removeEventListener('hashchange', alCambiarHash);
      document.removeEventListener('fullscreenchange', alCambiarPantalla);
      pantalla.removeEventListener('change', alCambiarPantalla);
    };
  }, [alternarPantallaCompleta, ir, total]);

  // Pantalla completa: sin controles, y el cursor se oculta tras 2 s sin moverse.
  useEffect(() => {
    document.body.classList.toggle('pantalla-completa', pantallaCompleta);
    if (!pantallaCompleta) {
      document.body.classList.remove('cursor-oculto');
      return;
    }
    let temporizador = 0;
    const despertar = () => {
      document.body.classList.remove('cursor-oculto');
      window.clearTimeout(temporizador);
      temporizador = window.setTimeout(() => document.body.classList.add('cursor-oculto'), 2000);
    };
    despertar();
    window.addEventListener('pointermove', despertar);
    return () => {
      window.removeEventListener('pointermove', despertar);
      window.clearTimeout(temporizador);
      document.body.classList.remove('cursor-oculto', 'pantalla-completa');
    };
  }, [pantallaCompleta]);

  // Sin botones a la vista: deslizar o tocar los bordes también avanza y retrocede.
  const alPulsar = (evento: EventoPuntero) => {
    toqueRef.current = { x: evento.clientX, y: evento.clientY };
  };
  const alSoltar = (evento: EventoPuntero) => {
    const inicio = toqueRef.current;
    toqueRef.current = null;
    if (!inicio) return;
    const dx = evento.clientX - inicio.x;
    const dy = evento.clientY - inicio.y;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 90) {
      ir(indiceRef.current + (dx < 0 ? 1 : -1), true);
    } else if (pantallaCompleta && Math.abs(dx) < 10 && Math.abs(dy) < 10 && !window.getSelection()?.toString()) {
      const caja = evento.currentTarget.getBoundingClientRect();
      const izquierda = evento.clientX - caja.left < caja.width * 0.3;
      ir(indiceRef.current + (izquierda ? -1 : 1), true);
    }
  };

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
