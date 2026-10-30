import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PointerEvent as EventoPuntero, RefObject } from 'react';

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

export interface OpcionesMazo {
  /** Número de escenas. */
  total: number;
  /** Tamaño del lienzo de diseño (px). El motor lo escala al tamaño de la ventana. */
  ancho: number;
  alto: number;
  /** Título de la pestaña. */
  titulo: string;
  /** Mensaje cuando el navegador no permite cambiar la pantalla completa. */
  errorCompleta: string;
  /** Teclas propias de un pitch (se suman a las comunes). Recibe `ir(destino)` y el total de escenas. */
  teclasExtra?: (ir: (destino: number) => void, total: number) => Partial<Record<string, () => void>>;
}

export interface Mazo {
  indice: number;
  /** 1 al avanzar, -1 al retroceder (sirve para orientar las transiciones). */
  sentido: number;
  /** Cambia de escena. Con `desdeUsuario` actualiza la URL y devuelve el foco al mazo. */
  ir: (destino: number, desdeUsuario?: boolean) => void;
  aviso: string | null;
  avisar: (mensaje: string, error?: unknown) => void;
  pantallaCompleta: boolean;
  puedePantallaCompleta: boolean;
  alternarPantallaCompleta: () => Promise<void>;
  /** Refs: `mazoRef` va en el contenedor que ocupa la ventana; `lienzoRef` en el lienzo de diseño. */
  mazoRef: RefObject<HTMLElement>;
  lienzoRef: RefObject<HTMLDivElement>;
  /** Deslizar o tocar los bordes (en pantalla completa) avanza y retrocede. */
  alPulsar: (evento: EventoPuntero) => void;
  alSoltar: (evento: EventoPuntero) => void;
}

/**
 * Comportamiento común de todos los pitches: escena actual, URL (#n), teclado, pantalla completa,
 * escala del lienzo, deslizamiento táctil y cursor oculto. No dibuja nada: cada pitch pone su aspecto.
 * Teclas comunes: ← → (y PageUp/PageDown, espacio) · Home/End · F (pantalla completa).
 */
export function useMazo({ total, ancho, alto, titulo, errorCompleta, teclasExtra }: OpcionesMazo): Mazo {
  const [indice, setIndice] = useState(() => indiceDesdeHash(total));
  const [sentido, setSentido] = useState(1);
  const [aviso, setAviso] = useState<string | null>(null);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);
  const puedePantallaCompleta = typeof document !== 'undefined' && document.fullscreenEnabled;

  const mazoRef = useRef<HTMLElement>(null);
  const lienzoRef = useRef<HTMLDivElement>(null);
  const indiceRef = useRef(indice);
  indiceRef.current = indice;
  const teclasExtraRef = useRef(teclasExtra);
  teclasExtraRef.current = teclasExtra;
  const toqueRef = useRef<{ x: number; y: number } | null>(null);

  const avisar = useCallback((mensaje: string, error?: unknown) => {
    console.error('[pitch]', mensaje, error ?? '');
    setAviso(mensaje);
  }, []);

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
    document.title = titulo;
  }, [titulo]);

  // Escala del lienzo al tamaño disponible.
  useLayoutEffect(() => {
    const mazo = mazoRef.current;
    const lienzo = lienzoRef.current;
    if (!mazo || !lienzo) return;
    const ajustar = () => {
      const caja = mazo.getBoundingClientRect();
      const escala = Math.min(caja.width / ancho, caja.height / alto);
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
  }, [ancho, alto]);

  const alternarPantallaCompleta = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    } catch (error) {
      avisar(errorCompleta, error);
    }
  }, [avisar, errorCompleta]);

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
        ...teclasExtraRef.current?.((destino) => ir(destino, true), total),
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

  return {
    indice, sentido, ir, aviso, avisar, pantallaCompleta, puedePantallaCompleta,
    alternarPantallaCompleta, mazoRef, lienzoRef, alPulsar, alSoltar,
  };
}
