import { createContext, useContext, useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { Contador, formatear, Rico, TextoContado } from './formato';
import {
  anidado,
  desdeDerecha,
  globo,
  grupo,
  INICIO_CONTENIDO,
  mascota,
  pop,
  riel,
  SALIDA_EXPO,
  sello,
  subir,
  tarjeta,
} from './movimiento';
import { urlRecurso } from './recursos';
import type { Contenido, Escena, Grafica, Metrica, Tarjeta } from './tipos';
import type { Variants } from 'framer-motion';

/** Contenido del pitch y aviso de errores, disponibles para todas las piezas. */
export const ContenidoContext = createContext<Contenido | null>(null);
export const AvisoContext = createContext<(mensaje: string, error?: unknown) => void>(() => {});

export function useContenido(): Contenido {
  const contenido = useContext(ContenidoContext);
  if (!contenido) throw new Error('[pitch] Falta el contenido del pitch.');
  return contenido;
}

/** Variables CSS de posición (--x, --y, --w) que usan la decoración y las estrellas. */
const lugar = (x: number, y: number, ancho: number, extra: Record<string, string> = {}): CSSProperties =>
  ({ '--x': `${x}px`, '--y': `${y}px`, '--w': `${ancho}px`, ...extra }) as CSSProperties;

/** Ilustración de Chispa. Entra con rebote (hereda la variante de su tarjeta) y flota con CSS. */
export function Personaje({
  clave,
  clase = '',
  estilo,
  variantes = pop,
}: {
  clave: string;
  clase?: string;
  estilo?: CSSProperties;
  variantes?: Variants;
}) {
  const contenido = useContenido();
  const avisar = useContext(AvisoContext);
  const ruta = contenido.assets[clave];
  if (!ruta) throw new Error(`[pitch] Asset desconocido: ${clave}`);
  const url = urlRecurso(ruta);
  if (!url) throw new Error(`[pitch] No existe el archivo ${ruta} en src/pitch/recursos/.`);
  return (
    <motion.img
      className={`character ${clase}`.trim()}
      src={url}
      alt=""
      draggable={false}
      style={estilo}
      variants={variantes}
      onError={() => avisar(contenido.interfaz.errorImagen, url)}
    />
  );
}

export function TarjetaVista({
  item,
  clase = '',
  tras,
  indice = 0,
  conRiel = false,
  contar = false,
  variantes = tarjeta,
}: {
  item: Tarjeta;
  clase?: string;
  /** Contenido extra que va justo después del título (p. ej. el tamaño del grupo). */
  tras?: ReactNode;
  indice?: number;
  /** Línea de progreso en la base de la tarjeta (pasos de un método). */
  conRiel?: boolean;
  /** El número con el que empieza el título cuenta desde cero («35 experiencias»). */
  contar?: boolean;
  variantes?: Variants;
}) {
  const { interfaz } = useContenido();
  return (
    <motion.article
      className={`card ${clase}`.trim()}
      style={{ '--i': indice } as CSSProperties}
      variants={variantes}
    >
      {item.numero ? (
        <motion.span className="number" variants={sello}>
          <Rico texto={item.numero} />
        </motion.span>
      ) : null}
      {item.personaje ? <Personaje clave={item.personaje} /> : null}
      <div className="card-copy">
        {item.titulo ? (
          <h2>
            {contar ? <TextoContado texto={item.titulo} ui={interfaz} retraso={INICIO_CONTENIDO + 0.5 + indice * 0.1} /> : <Rico texto={item.titulo} />}
          </h2>
        ) : null}
        {tras}
        {item.texto ? <p><Rico texto={item.texto} resaltar /></p> : null}
      </div>
      {conRiel ? <motion.i className="card-rail" variants={riel} aria-hidden="true" /> : null}
    </motion.article>
  );
}

export function Tarjetas({
  items,
  clase = '',
  retraso = 0,
  escalon = 0.1,
  conRiel = false,
  contar = false,
  variantes,
  hijos,
}: {
  items: Tarjeta[];
  clase?: string;
  retraso?: number;
  escalon?: number;
  conRiel?: boolean;
  contar?: boolean;
  variantes?: Variants;
  /** Piezas extra dentro del grupo (p. ej. nodos de conexión). */
  hijos?: ReactNode;
}) {
  return (
    <motion.div className={`cards ${clase}`.trim()} variants={anidado(retraso, escalon)}>
      {items.map((item, i) => (
        <TarjetaVista key={i} item={item} indice={i} conRiel={conRiel} contar={contar} {...(variantes ? { variantes } : {})} />
      ))}
      {hijos}
    </motion.div>
  );
}

/** Medidor de una métrica con `maximo`: anillo que se dibuja, o casillas que se encienden una a una. */
function Medidor({ item, forma, retraso }: { item: Metrica; forma: 'anillo' | 'puntos'; retraso: number }) {
  const maximo = item.maximo ?? 0;
  if (!maximo) return null;
  const fraccion = Math.max(0, Math.min(1, item.valor / maximo));

  if (forma === 'puntos') {
    const casillas = Math.round(maximo);
    const llenas = Math.round(item.valor);
    return (
      <span className="meter-pips" aria-hidden="true">
        {Array.from({ length: casillas }, (_, i) => (
          <motion.i
            key={i}
            className={i < llenas ? 'on' : ''}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 16, delay: retraso + 0.25 + i * 0.12 }}
          />
        ))}
      </span>
    );
  }

  const radio = 34;
  const mostrarMaximo = item.unidad !== '%';
  return (
    <svg className="meter-ring" viewBox="0 0 84 84" aria-hidden="true">
      <circle cx="42" cy="42" r={radio} className="ring-track" />
      <motion.circle
        cx="42"
        cy="42"
        r={radio}
        className="ring-fill"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: fraccion }}
        transition={{ duration: 1.3, ease: SALIDA_EXPO, delay: retraso + 0.15 }}
      />
      {mostrarMaximo ? (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: retraso + 0.6, duration: 0.4 }}
        >
          <text x="42" y="38" textAnchor="middle" className="ring-small">de</text>
          <text x="42" y="56" textAnchor="middle" className="ring-big">{maximo}</text>
        </motion.g>
      ) : null}
    </svg>
  );
}

export function MetricaVista({
  item,
  clase = '',
  retraso = 0,
  medidor = 'anillo',
}: {
  item: Metrica;
  clase?: string;
  /** Segundos desde que empieza la escena hasta que arranca su contador. */
  retraso?: number;
  medidor?: 'anillo' | 'puntos';
}) {
  const { interfaz } = useContenido();
  const final = formatear(item.valor, interfaz, item);
  return (
    <motion.article className={`metric ${clase} ${item.maximo ? `has-meter meter-${medidor}` : ''}`.trim()} variants={tarjeta}>
      <strong className="metric-value">
        <span className="counter-width" aria-hidden="true">{final}</span>
        <span className="counter-display" aria-hidden="true">
          <Contador valor={item.valor} ui={interfaz} opciones={item} retraso={retraso} />
        </span>
        <span className="visually-hidden">{final}</span>
      </strong>
      <h2><Rico texto={item.titulo ?? ''} /></h2>
      {item.texto ? <p><Rico texto={item.texto} resaltar /></p> : null}
      <Medidor item={item} forma={medidor} retraso={retraso} />
    </motion.article>
  );
}

export function Simuladores() {
  const { simuladores } = useContenido();
  return (
    <motion.ul className="simulator-list" variants={anidado(0.2, 0.07)}>
      {simuladores.map((item) => (
        <motion.li key={item.codigo} className="simulator" variants={desdeDerecha}>
          <Personaje clave={item.personaje} />
          <span className="simulator-code">{item.codigo}</span>
          <span className="simulator-name">{item.nombre}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** Personajes, estrellas y puntos de fondo de cada escena (solo dirección visual). */
export function Decoracion({ escena }: { escena: Escena }) {
  const diseno = useContenido().diseno[escena.tipo];
  return (
    <motion.div className="decoration" aria-hidden="true" variants={grupo(0.05, 0.06)}>
      {diseno.decoracion.map(([clave, x, y, ancho], i) => (
        <Personaje
          key={`d${i}`}
          clave={clave}
          clase="deco flota"
          estilo={{ ...lugar(x, y, ancho), '--n': i } as CSSProperties}
        />
      ))}
      {diseno.estrellas.map(([x, y, ancho, color, rotacion], i) => {
        const extra: Record<string, string> = { '--n': String(i) };
        if (color) extra['--star-fill'] = color;
        if (rotacion !== undefined) extra['--star-rotation'] = `${rotacion}deg`;
        return <motion.i key={`e${i}`} className="star titila" style={lugar(x, y, ancho, extra)} variants={pop} />;
      })}
      {(diseno.puntos ?? []).map(([x, y, ancho, color], i) => (
        <motion.i
          key={`p${i}`}
          className="design-dot titila"
          style={{ ...lugar(x, y, ancho, { '--n': String(i + 3) }), background: color }}
          variants={pop}
        />
      ))}
    </motion.div>
  );
}

/** Globo de diálogo de Chispa. */
export function Globo({ escena, clase = '' }: { escena: Escena; clase?: string }) {
  const diseno = useContenido().diseno[escena.tipo];
  return (
    <motion.aside className={`mascot ${clase}`.trim()} variants={grupo(0.1, 0.12)}>
      <motion.p className="bubble" variants={globo}>
        <Rico texto={escena.globo} />
      </motion.p>
      <Personaje clave={diseno.personaje ?? escena.personaje} clase="flota-lento" variantes={mascota} />
    </motion.aside>
  );
}

/** Una barra: crece con un solo progreso (0→1) que mueve el ancho, la etiqueta y el número. */
function Barra({
  serie,
  fila,
  y,
  alto,
  x,
  texto,
  enfoque,
  retraso,
  minimo,
  maximo,
}: {
  serie: { nombre: string; valor: number };
  fila: number;
  y: number;
  alto: number;
  x: (valor: number) => number;
  texto: (valor: number) => string;
  enfoque: boolean;
  retraso: number;
  minimo: number;
  maximo: number;
}) {
  const progreso = useMotionValue(0);
  useEffect(() => {
    const control = animate(progreso, 1, { duration: 1.15, delay: retraso, ease: SALIDA_EXPO });
    return () => control.stop();
  }, [progreso, retraso]);

  const positivo = serie.valor >= 0;
  const cero = x(0);
  const fin = x(serie.valor);
  const ancho = Math.abs(fin - cero);
  const dentro = ancho > 92;

  const anchoActual = useTransform(progreso, (v) => v * ancho);
  const xBarra = useTransform(progreso, (v) => (positivo ? cero : cero - v * ancho));
  const xEtiqueta = useTransform(progreso, (v) => {
    const borde = positivo ? cero + v * ancho : cero - v * ancho;
    return dentro ? borde + (positivo ? -14 : 14) : borde + (positivo ? 12 : -12);
  });
  const numero = useTransform(progreso, (v) => texto(serie.valor * v));

  return (
    <g>
      <motion.text
        x={216}
        y={y + alto / 2 + 6}
        textAnchor="end"
        className={`category-label${enfoque ? ' is-focus' : ''}`}
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: SALIDA_EXPO, delay: retraso - 0.1 }}
      >
        {serie.nombre}
      </motion.text>
      <motion.rect
        x={x(minimo)}
        y={y}
        width={x(maximo) - x(minimo)}
        height={alto}
        rx={alto / 2}
        className="bar-track"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: retraso - 0.1 }}
      />
      <motion.rect
        x={xBarra}
        y={y}
        width={anchoActual}
        height={alto}
        rx={alto / 2}
        className={`chart-bar ${positivo ? 'gain' : 'loss'}${enfoque ? ' focus' : ''}`}
      >
        <title>{`${serie.nombre}: ${texto(serie.valor)}`}</title>
      </motion.rect>
      <motion.text
        x={xEtiqueta}
        y={y + alto / 2 + 7}
        textAnchor={positivo === dentro ? 'end' : 'start'}
        className={`bar-value${dentro ? ' inside' : ''}`}
        data-fila={fila}
      >
        {numero}
      </motion.text>
    </g>
  );
}

/** Barras horizontales desde el eje cero (admite valores negativos). */
export function GraficaBarras({ datos }: { datos: Grafica }) {
  const { interfaz } = useContenido();
  const opciones = (valor: number) => ({
    decimales: Number.isInteger(valor) ? 0 : 1,
    unidad: datos.unidad ?? '',
    signo: datos.signo ?? false,
  });
  const texto = (valor: number) => formatear(Math.round(valor * 10) / 10, interfaz, opciones(valor));
  const descripcion = datos.series
    .map((serie) => `${serie.nombre}: ${formatear(serie.valor, interfaz, opciones(serie.valor))}`)
    .join('; ');
  const izquierda = 238;
  const derecha = 650;
  const x = (valor: number) =>
    izquierda + ((valor - datos.minimo) / (datos.maximo - datos.minimo)) * (derecha - izquierda);
  const paso = 348 / datos.series.length;
  const alto = Math.min(56, paso * 0.55);
  const yFila = (i: number) => 30 + i * paso + (paso - alto) / 2;

  // Referencia: la mejor serie. Enfoque: la más baja. La distancia entre ambas es la lectura clave.
  const valores = datos.series.map((s) => s.valor);
  const mejor = Math.max(...valores);
  const peor = Math.min(...valores);
  const iPeor = valores.indexOf(peor);
  const hayBrecha = datos.series.length > 1 && mejor !== peor;
  const brecha = peor - mejor;
  const retrasoBarra = (i: number) => INICIO_CONTENIDO + 0.35 + i * 0.22;
  const retrasoBrecha = retrasoBarra(datos.series.length - 1) + 1.05;
  const centroBrecha = (x(peor) + x(mejor)) / 2;

  return (
    <motion.figure className="chart-card chart-bars" variants={subir}>
      <figcaption>{datos.titulo}</figcaption>
      <svg viewBox="0 0 720 430" role="img" aria-label={datos.titulo} aria-describedby="chart-description">
        <desc id="chart-description">{descripcion}</desc>
        {datos.marcas.map((valor, i) => (
          <g key={valor}>
            <motion.line
              x1={x(valor)}
              x2={x(valor)}
              y1={30}
              y2={378}
              className={valor === 0 ? 'zero-line' : 'grid-line'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: SALIDA_EXPO, delay: INICIO_CONTENIDO + i * 0.06 }}
            />
            <motion.text
              x={x(valor)}
              y={407}
              textAnchor="middle"
              className="axis-label"
              initial={{ opacity: 0, y: 414 }}
              animate={{ opacity: 1, y: 407 }}
              transition={{ duration: 0.45, delay: INICIO_CONTENIDO + 0.2 + i * 0.06 }}
            >
              {valor}
            </motion.text>
          </g>
        ))}
        {datos.series.map((serie, i) => (
          <Barra
            key={serie.nombre}
            serie={serie}
            fila={i}
            y={yFila(i)}
            alto={alto}
            x={x}
            texto={texto}
            enfoque={hayBrecha && i === iPeor}
            retraso={retrasoBarra(i)}
            minimo={datos.minimo}
            maximo={datos.maximo}
          />
        ))}
        {hayBrecha ? (
          <g>
            <motion.line
              x1={x(mejor)}
              x2={x(mejor)}
              y1={22}
              y2={386}
              className="reference-line"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: SALIDA_EXPO, delay: retrasoBrecha - 0.3 }}
            />
            <motion.g
              style={{ transformOrigin: `${centroBrecha}px ${yFila(iPeor) + alto / 2}px`, transformBox: 'view-box' }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 15, delay: retrasoBrecha }}
            >
              <rect
                x={centroBrecha - 54}
                y={yFila(iPeor) + alto / 2 - 20}
                width={108}
                height={40}
                rx={20}
                className="gap-chip"
              />
              <text x={centroBrecha} y={yFila(iPeor) + alto / 2 + 7} textAnchor="middle" className="gap-text">
                {formatear(brecha, interfaz, { unidad: 'pp', signo: true })}
              </text>
            </motion.g>
          </g>
        ) : null}
      </svg>
    </motion.figure>
  );
}
