import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Animador } from './animaciones';
import EscenaVista from './Escena';
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

/**
 * Pitch a pantalla completa: escenas de 1280 × 720 escaladas al tamaño de la ventana,
 * navegación con teclado, botones, índice por puntos y pantalla completa.
 */
export default function Pitch({ contenido }: { contenido: Contenido }) {
  const { escenas, interfaz: ui } = contenido;
  const total = escenas.length;

  const [indice, setIndice] = useState(() => indiceDesdeHash(total));
  const [aviso, setAviso] = useState<string | null>(null);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);
  const puedePantallaCompleta = typeof document !== 'undefined' && document.fullscreenEnabled;

  const mazoRef = useRef<HTMLElement>(null);
  const lienzoRef = useRef<HTMLDivElement>(null);
  const escenasRef = useRef<(HTMLElement | null)[]>([]);
  const anteriorRef = useRef(-1);
  const indiceRef = useRef(indice);
  indiceRef.current = indice;

  const avisar = useCallback((mensaje: string, error?: unknown) => {
    console.error('[pitch]', mensaje, error ?? '');
    setAviso(mensaje);
  }, []);

  /** Cambia de escena. Con `desdeUsuario` actualiza la URL y devuelve el foco al mazo. */
  const ir = useCallback(
    (destino: number, desdeUsuario = false) => {
      const meta = Math.max(0, Math.min(total - 1, destino));
      if (desdeUsuario) {
        if (window.location.hash !== `#${meta + 1}`) window.location.hash = String(meta + 1);
        mazoRef.current?.focus({ preventScroll: true });
      }
      setIndice(meta);
    },
    [total],
  );

  // Un solo animador por página (se crea antes del primer efecto de animación).
  const animador = useMemo(() => new Animador(ui, matchMedia('(prefers-reduced-motion: reduce)')), [ui]);

  // Título de la pestaña.
  useEffect(() => {
    document.title = ui.titulo;
    return () => animador.cancelar();
  }, [ui, animador]);

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
    // Giro del dispositivo y barras del navegador móvil: reajusta a lo realmente visible.
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

  // Animación de entrada cada vez que cambia la escena (antes de pintar, sin parpadeo).
  useLayoutEffect(() => {
    const escena = escenasRef.current[indice];
    if (!escena) return;
    const sentido = anteriorRef.current < 0 || indice > anteriorRef.current ? 1 : -1;
    anteriorRef.current = indice;
    animador.cancelar();
    animador.entrar(escena, escenas[indice]!.tipo, sentido);
  }, [indice, escenas, animador]);

  const alternarPantallaCompleta = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (error) {
      avisar(ui.errorCompleta, error);
    }
  }, [avisar, ui]);

  // Teclado, hash de la URL, pantalla completa y pestaña oculta.
  useEffect(() => {
    const alTeclear = (evento: KeyboardEvent) => {
      if (
        evento.altKey ||
        evento.ctrlKey ||
        evento.metaKey ||
        (evento.target instanceof Element && evento.target.closest('input,textarea,select,[contenteditable]'))
      )
        return;
      const acciones: Partial<Record<string, () => void>> = {
        ArrowRight: () => ir(indiceRef.current + 1, true),
        PageDown: () => ir(indiceRef.current + 1, true),
        ArrowLeft: () => ir(indiceRef.current - 1, true),
        PageUp: () => ir(indiceRef.current - 1, true),
        Home: () => ir(0, true),
        End: () => ir(total - 1, true),
        f: () => void alternarPantallaCompleta(),
        F: () => void alternarPantallaCompleta(),
      };
      const accion = acciones[evento.key];
      if (accion) {
        evento.preventDefault();
        accion();
      }
    };
    const alCambiarHash = () => setIndice(indiceDesdeHash(total));
    const alCambiarPantalla = () => setPantallaCompleta(Boolean(document.fullscreenElement));
    const alCambiarVisibilidad = () => {
      if (document.hidden) animador.cancelar();
    };
    const movimiento = matchMedia('(prefers-reduced-motion: reduce)');
    const alCambiarMovimiento = () => animador.cancelar();

    document.addEventListener('keydown', alTeclear);
    window.addEventListener('hashchange', alCambiarHash);
    document.addEventListener('fullscreenchange', alCambiarPantalla);
    document.addEventListener('visibilitychange', alCambiarVisibilidad);
    movimiento.addEventListener('change', alCambiarMovimiento);
    return () => {
      document.removeEventListener('keydown', alTeclear);
      window.removeEventListener('hashchange', alCambiarHash);
      document.removeEventListener('fullscreenchange', alCambiarPantalla);
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      movimiento.removeEventListener('change', alCambiarMovimiento);
    };
  }, [alternarPantallaCompleta, animador, ir, total]);

  return (
    <ContenidoContext.Provider value={contenido}>
      <AvisoContext.Provider value={avisar}>
        <main id="deck" ref={mazoRef} tabIndex={-1} aria-label={ui.presentacion}>
          <div id="canvas" ref={lienzoRef}>
            {escenas.map((escena, i) => (
              <EscenaVista
                key={i}
                ref={(el) => {
                  escenasRef.current[i] = el;
                }}
                escena={escena}
                indice={i}
                activa={i === indice}
              />
            ))}
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
            {escenas.map((escena, i) => (
              <button
                key={i}
                type="button"
                className="scene-dot"
                title={`${i + 1}. ${escena.titulo}`}
                aria-label={`${i + 1}. ${escena.titulo}`}
                aria-current={i === indice ? 'step' : undefined}
                onClick={() => ir(i, true)}
              />
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
            <span style={{ transform: `scaleX(${(indice + 1) / total})` }} />
          </div>
        </footer>

        <p id="notice" role="alert" hidden={aviso === null}>{aviso}</p>
      </AvisoContext.Provider>
    </ContenidoContext.Provider>
  );
}
