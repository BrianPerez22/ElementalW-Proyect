import { createContext, useContext } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { formatear, Rico } from './formato';
import { urlRecurso } from './recursos';
import type { Contenido, Escena, Grafica, Metrica, Tarjeta } from './tipos';

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

export function Personaje({ clave, clase = '', estilo }: { clave: string; clase?: string; estilo?: CSSProperties }) {
  const contenido = useContenido();
  const avisar = useContext(AvisoContext);
  const ruta = contenido.assets[clave];
  if (!ruta) throw new Error(`[pitch] Asset desconocido: ${clave}`);
  const url = urlRecurso(ruta);
  if (!url) throw new Error(`[pitch] No existe el archivo ${ruta} en src/pitch/recursos/.`);
  return (
    <img
      className={`character ${clase}`.trim()}
      src={url}
      alt=""
      draggable={false}
      style={estilo}
      onError={() => avisar(contenido.interfaz.errorImagen, url)}
    />
  );
}

export function TarjetaVista({
  item,
  clase = '',
  tras,
}: {
  item: Tarjeta;
  clase?: string;
  /** Contenido extra que va justo después del título (p. ej. el tamaño del grupo). */
  tras?: ReactNode;
}) {
  return (
    <article className={`card enter ${clase}`.trim()}>
      {item.numero ? <span className="number"><Rico texto={item.numero} /></span> : null}
      {item.personaje ? <Personaje clave={item.personaje} /> : null}
      <div className="card-copy">
        {item.titulo ? <h2><Rico texto={item.titulo} /></h2> : null}
        {tras}
        {item.texto ? <p><Rico texto={item.texto} /></p> : null}
      </div>
    </article>
  );
}

export function Tarjetas({ items, clase = '' }: { items: Tarjeta[]; clase?: string }) {
  return (
    <div className={`cards ${clase}`.trim()}>
      {items.map((item, i) => (
        <TarjetaVista key={i} item={item} />
      ))}
    </div>
  );
}

export function MetricaVista({ item, clase = '' }: { item: Metrica; clase?: string }) {
  const { interfaz } = useContenido();
  const final = formatear(item.valor, interfaz, item);
  return (
    <article className={`metric enter ${clase}`.trim()}>
      <strong
        className="metric-value"
        data-value={String(item.valor)}
        data-decimals={String(item.decimales ?? 0)}
        data-unit={item.unidad ?? ''}
        data-sign={String(Boolean(item.signo))}
      >
        <span className="counter-width" aria-hidden="true">{final}</span>
        <span className="counter-display" aria-hidden="true" data-final={final}>{final}</span>
        <span className="visually-hidden">{final}</span>
      </strong>
      <h2><Rico texto={item.titulo ?? ''} /></h2>
      {item.texto ? <p><Rico texto={item.texto} /></p> : null}
    </article>
  );
}

export function Simuladores() {
  const { simuladores } = useContenido();
  return (
    <ul className="simulator-list">
      {simuladores.map((item) => (
        <li key={item.codigo} className="simulator enter">
          <Personaje clave={item.personaje} />
          <span className="simulator-code">{item.codigo}</span>
          <span className="simulator-name">{item.nombre}</span>
        </li>
      ))}
    </ul>
  );
}

/** Personajes, estrellas y puntos de fondo de cada escena (solo dirección visual). */
export function Decoracion({ escena }: { escena: Escena }) {
  const diseno = useContenido().diseno[escena.tipo];
  return (
    <div className="decoration" aria-hidden="true">
      {diseno.decoracion.map(([clave, x, y, ancho], i) => (
        <Personaje key={`d${i}`} clave={clave} clase="deco" estilo={lugar(x, y, ancho)} />
      ))}
      {diseno.estrellas.map(([x, y, ancho, color, rotacion], i) => {
        const extra: Record<string, string> = {};
        if (color) extra['--star-fill'] = color;
        if (rotacion !== undefined) extra['--star-rotation'] = `${rotacion}deg`;
        return <i key={`e${i}`} className="star" style={lugar(x, y, ancho, extra)} />;
      })}
      {(diseno.puntos ?? []).map(([x, y, ancho, color], i) => (
        <i key={`p${i}`} className="design-dot" style={{ ...lugar(x, y, ancho), background: color }} />
      ))}
    </div>
  );
}

/** Globo de diálogo de Chispa. */
export function Globo({ escena, clase = '' }: { escena: Escena; clase?: string }) {
  const diseno = useContenido().diseno[escena.tipo];
  return (
    <aside className={`mascot enter ${clase}`.trim()}>
      <p className="bubble"><Rico texto={escena.globo} /></p>
      <Personaje clave={diseno.personaje ?? escena.personaje} />
    </aside>
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
  const descripcion = datos.series
    .map((serie) => `${serie.nombre}: ${formatear(serie.valor, interfaz, opciones(serie.valor))}`)
    .join('; ');
  const izquierda = 238;
  const derecha = 650;
  const x = (valor: number) =>
    izquierda + ((valor - datos.minimo) / (datos.maximo - datos.minimo)) * (derecha - izquierda);
  const paso = 348 / datos.series.length;
  const alto = Math.min(56, paso * 0.55);

  return (
    <figure className="chart-card enter chart-bars">
      <figcaption>{datos.titulo}</figcaption>
      <svg viewBox="0 0 720 430" role="img" aria-label={datos.titulo} aria-describedby="chart-description">
        <desc id="chart-description">{descripcion}</desc>
        {datos.marcas.map((valor) => (
          <g key={valor}>
            <line x1={x(valor)} x2={x(valor)} y1={30} y2={378} className={valor === 0 ? 'zero-line' : 'grid-line'} />
            <text x={x(valor)} y={407} textAnchor="middle" className="axis-label">{valor}</text>
          </g>
        ))}
        {datos.series.map((serie, i) => {
          const y = 30 + i * paso + (paso - alto) / 2;
          const positivo = serie.valor >= 0;
          const texto = formatear(serie.valor, interfaz, opciones(serie.valor));
          return (
            <g key={serie.nombre}>
              <text x={216} y={y + alto / 2 + 6} textAnchor="end" className="category-label">{serie.nombre}</text>
              <rect
                x={x(Math.min(serie.valor, 0))}
                y={y}
                width={Math.abs(x(serie.valor) - x(0))}
                height={alto}
                className={`chart-bar ${positivo ? 'gain' : 'loss'}`}
                style={{ transformOrigin: `${x(0)}px ${y}px` }}
              >
                <title>{`${serie.nombre}: ${texto}`}</title>
              </rect>
              <text x={(positivo ? x(serie.valor) : x(0)) + 10} y={y + alto / 2 + 6} textAnchor="start" className="bar-value">
                {texto}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
