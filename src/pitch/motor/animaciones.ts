import { formatear } from './formato';
import type { Interfaz, Metrica, Tipo } from './tipos';

type Efecto = 'rise' | 'fade' | 'step' | 'scale';

interface Contador {
  pantalla: HTMLElement;
  opciones: Partial<Metrica>;
  meta: number;
  retraso: number;
}

const FOTOGRAMAS: Record<Efecto, Keyframe[]> = {
  rise: [
    { opacity: 0, transform: 'translateY(12px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ],
  fade: [{ opacity: 0 }, { opacity: 1 }],
  step: [
    { opacity: 0, transform: 'translateX(-16px)' },
    { opacity: 1, transform: 'translateX(0)' },
  ],
  scale: [
    { opacity: 0, transform: 'scale(.96)' },
    { opacity: 1, transform: 'scale(1)' },
  ],
};

/**
 * Animaciones de entrada de cada escena (Web Animations API).
 * Trabaja sobre el DOM que dibuja React, sin tocar su estado: es el mismo motor de la
 * presentación original, pasado a TypeScript.
 */
export class Animador {
  private animaciones: Animation[] = [];
  private cuadroContador: number | null = null;
  private contadores: Contador[] = [];

  constructor(
    private readonly ui: Interfaz,
    private readonly movimientoReducido: MediaQueryList,
  ) {}

  cancelar(): void {
    this.animaciones.forEach((a) => a.cancel());
    this.animaciones = [];
    if (this.cuadroContador !== null) cancelAnimationFrame(this.cuadroContador);
    this.cuadroContador = null;
    this.contadores.forEach(({ pantalla }) => {
      pantalla.textContent = pantalla.dataset['final'] ?? '';
    });
    this.contadores = [];
  }

  private revelar(escena: HTMLElement, selector: string, inicio: number, escalon = 0, efecto: Efecto = 'rise') {
    escena.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
      this.animaciones.push(
        el.animate(FOTOGRAMAS[efecto], {
          duration: efecto === 'fade' ? 260 : 360,
          delay: inicio + i * escalon,
          easing: 'cubic-bezier(.2,.7,.2,1)',
          fill: 'backwards',
        }),
      );
    });
  }

  private contar(escena: HTMLElement, selector: string, retraso: number, escalon = 0) {
    escena.querySelectorAll<HTMLElement>(selector).forEach((valor, i) => {
      const pantalla = valor.querySelector<HTMLElement>('.counter-display');
      if (!pantalla) return;
      const opciones: Partial<Metrica> = {
        decimales: Number(valor.dataset['decimals']),
        unidad: valor.dataset['unit'] ?? '',
        signo: valor.dataset['sign'] === 'true',
      };
      pantalla.textContent = formatear(0, this.ui, opciones);
      this.contadores.push({
        pantalla,
        opciones,
        meta: Number(valor.dataset['value']),
        retraso: retraso + i * escalon,
      });
    });
  }

  private crecerBarras(escena: HTMLElement, inicio: number, escalon: number) {
    escena.querySelectorAll('.chart-bar').forEach((barra, i) => {
      this.animaciones.push(
        barra.animate([{ transform: 'scaleX(0)' }, { transform: 'scale(1)' }], {
          duration: 650,
          delay: inicio + i * escalon,
          easing: 'cubic-bezier(.2,.7,.2,1)',
          fill: 'backwards',
        }),
      );
    });
  }

  private movimientoAmbiente(escena: HTMLElement) {
    escena.querySelectorAll('.decoration .character').forEach((personaje, i) => {
      const sentido = i % 2 === 0 ? 1 : -1;
      this.animaciones.push(
        personaje.animate(
          [
            { translate: '0 0', rotate: '0deg' },
            { translate: `${sentido * 2}px -4px`, rotate: `${sentido * 0.7}deg`, offset: 0.5 },
            { translate: '0 0', rotate: '0deg' },
          ],
          {
            duration: 8000 + (i % 4) * 1100,
            delay: 1500 + i * 170,
            iterations: Infinity,
            easing: 'ease-in-out',
          },
        ),
      );
    });
    escena.querySelectorAll('.mascot > .character').forEach((personaje) => {
      this.animaciones.push(
        personaje.animate([{ translate: '0 0' }, { translate: '0 -3px', offset: 0.5 }, { translate: '0 0' }], {
          duration: 10500,
          delay: 1500,
          iterations: Infinity,
          easing: 'ease-in-out',
        }),
      );
    });
    escena.querySelectorAll('.star,.design-dot').forEach((adorno, i) => {
      this.animaciones.push(
        adorno.animate(
          [
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0.82, transform: 'scale(1.08)', offset: 0.5 },
            { opacity: 1, transform: 'scale(1)' },
          ],
          {
            duration: 5200 + (i % 3) * 700,
            delay: 1000 + i * 380,
            iterations: Infinity,
            easing: 'ease-in-out',
          },
        ),
      );
    });
  }

  /** Entradas rápidas: un pitch de 5 minutos no puede esperar a las animaciones. */
  private secuencia(tipo: Tipo, e: HTMLElement) {
    switch (tipo) {
      case 'portada':
        this.revelar(e, '.cover-brand,.cover-tag', 60, 70, 'fade');
        this.revelar(e, 'h1', 150);
        this.revelar(e, '.cover-subtitle', 350);
        this.revelar(e, '.cover-data .card', 520, 90, 'fade');
        this.revelar(e, '.decoration .character', 380, 85, 'scale');
        break;
      case 'pregunta':
        this.revelar(e, '.question-card', 200, 0, 'scale');
        this.revelar(e, '.question-chips .card', 500, 130);
        break;
      case 'herramienta':
        this.revelar(e, '.solution-intro', 200);
        this.revelar(e, '.solution-features > .cards:first-child .card', 380, 90);
        this.revelar(e, '.activity-strip .card', 760, 60, 'fade');
        this.revelar(e, '.solution-simulators', 480, 0, 'fade');
        this.revelar(e, '.simulator-list .simulator', 580, 60, 'fade');
        break;
      case 'metodo':
        this.revelar(e, '.method-steps .card', 220, 180, 'step');
        this.revelar(e, '.method-bottom .card', 850, 100, 'fade');
        break;
      case 'cifras':
        this.revelar(e, '.figures-grid .metric', 200, 110, 'scale');
        this.contar(e, '.figures-grid .metric-value', 280, 110);
        this.revelar(e, '.figures-note', 1000);
        break;
      case 'simulador':
        this.revelar(e, '.chart-card', 200, 0, 'fade');
        this.crecerBarras(e, 350, 160);
        this.revelar(e, '.bar-value', 900, 160, 'fade');
        this.revelar(e, '.simulator-note', 1300);
        break;
      case 'hallazgos':
        this.revelar(e, '.column-title', 200, 100, 'fade');
        for (let fila = 1; fila <= 3; fila += 1) {
          this.revelar(e, `.findings-column .card:nth-child(${fila})`, 350 + (fila - 1) * 200, 100);
        }
        break;
      case 'triangulacion':
        this.revelar(e, '.triangle-metrics .metric', 200, 150, 'scale');
        this.contar(e, '.triangle-metrics .metric-value', 300, 150);
        this.revelar(e, '.triangle-notes .card', 300, 150);
        break;
      case 'criterios':
        this.revelar(e, '.column-title', 200, 120, 'fade');
        for (let col = 1; col <= 3; col += 1) {
          this.revelar(e, `.criteria-column:nth-child(${col}) .criterion`, 300 + (col - 1) * 130, 60, 'fade');
        }
        this.revelar(e, '.criteria-legend', 900, 0, 'fade');
        break;
      case 'siguientes':
        this.revelar(e, '.next-steps .card', 220, 170, 'step');
        this.revelar(e, '.open-question', 1000);
        break;
      case 'conclusiones':
        this.revelar(e, '.conclusion-list .card', 220, 180, 'step');
        break;
      case 'gracias':
        this.revelar(e, '.thanks-name,.thanks-description', 260, 140, 'fade');
        this.revelar(e, '.thanks-people .card', 620, 140, 'fade');
        this.revelar(e, '.thanks-parade .character', 800, 100, 'scale');
        break;
    }
  }

  /** Anima la entrada de una escena. `sentido` es 1 al avanzar y −1 al retroceder. */
  entrar(escena: HTMLElement, tipo: Tipo, sentido: number): void {
    if (this.movimientoReducido.matches) return;
    this.animaciones.push(
      escena.animate(
        [
          { opacity: 0.6, transform: `translateX(${sentido * 28}px)` },
          { opacity: 1, transform: 'translateX(0)' },
        ],
        { duration: 230, easing: 'ease-out' },
      ),
    );
    if (tipo !== 'portada') {
      this.revelar(escena, '.slide-heading .section-tag', 30, 0, 'fade');
      this.revelar(escena, '.slide-heading h1', 90);
    }
    this.secuencia(tipo, escena);
    this.movimientoAmbiente(escena);
    const tiempoMascota = ['portada', 'pregunta', 'conclusiones'].includes(tipo) ? 450 : 180;
    this.revelar(escena, '.mascot', tiempoMascota, 0, 'fade');
    escena.querySelectorAll('.mascot > .character').forEach((img) => {
      this.animaciones.push(
        img.animate(
          [
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-4deg) scale(1.035)', offset: 0.4 },
            { transform: 'rotate(0deg) scale(1)' },
          ],
          { duration: 640, delay: tiempoMascota + 130, easing: 'ease-in-out' },
        ),
      );
    });
    if (this.contadores.length) {
      const inicio = performance.now();
      const paso = (ahora: number) => {
        let activo = false;
        this.contadores.forEach(({ pantalla, opciones, meta, retraso }) => {
          const progreso = Math.max(0, Math.min(1, (ahora - inicio - retraso) / 720));
          pantalla.textContent =
            progreso === 1
              ? (pantalla.dataset['final'] ?? '')
              : formatear(meta * (1 - (1 - progreso) ** 3), this.ui, opciones);
          activo ||= progreso < 1;
        });
        this.cuadroContador = activo ? requestAnimationFrame(paso) : null;
      };
      this.cuadroContador = requestAnimationFrame(paso);
    }
  }
}
