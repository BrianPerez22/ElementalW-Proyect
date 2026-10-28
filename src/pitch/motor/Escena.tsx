import { forwardRef } from 'react';
import { Rico } from './formato';
import {
  Decoracion,
  Globo,
  GraficaBarras,
  MetricaVista,
  Personaje,
  Simuladores,
  TarjetaVista,
  Tarjetas,
  useContenido,
} from './piezas';
import type { Escena } from './tipos';

/** Escenas que dibujan su propio globo de Chispa (el resto lo recibe en la cabecera). */
const GLOBO_PROPIO = ['portada', 'pregunta', 'conclusiones', 'gracias'];

/** Cuerpo de cada escena: una composición por `tipo`. */
function Cuerpo({ escena }: { escena: Escena }) {
  switch (escena.tipo) {
    case 'portada':
      return (
        <>
          <p className="cover-subtitle enter"><Rico texto={escena.subtitulo} /></p>
          <Tarjetas items={escena.datos} clase="cover-data" />
        </>
      );

    case 'pregunta':
      return (
        <>
          <blockquote className="question-card enter">
            <p><Rico texto={escena.pregunta} /></p>
          </blockquote>
          <Tarjetas items={escena.tarjetas} clase="question-chips" />
        </>
      );

    case 'herramienta':
      return (
        <>
          <p className="solution-intro enter"><Rico texto={escena.resumen} /></p>
          <div className="solution-main">
            <div className="solution-features">
              <Tarjetas items={escena.tarjetas} />
              <Tarjetas items={escena.actividades} clase="activity-strip" />
            </div>
            <aside className="solution-simulators enter">
              <h2><Rico texto={escena.tituloSimuladores} /></h2>
              <Simuladores />
            </aside>
          </div>
        </>
      );

    case 'metodo':
      return (
        <>
          <Tarjetas items={escena.pasos} clase="method-steps" />
          <div className="method-bottom">
            {escena.grupos.map((grupo, i) => (
              <TarjetaVista
                key={i}
                item={grupo}
                clase="group-card"
                tras={<strong className="group-size"><Rico texto={grupo.valor} /></strong>}
              />
            ))}
            <TarjetaVista item={escena.metrica} clase="method-metric" />
          </div>
        </>
      );

    case 'cifras':
      return (
        <>
          <div className="figures-grid">
            {escena.metricas.map((item, i) => (
              <MetricaVista key={i} item={item} clase={i % 2 ? 'tint' : ''} />
            ))}
          </div>
          <TarjetaVista item={escena.nota} clase="dark figures-note" />
        </>
      );

    case 'simulador':
      return (
        <>
          <GraficaBarras datos={escena.grafica} />
          <TarjetaVista item={escena.conclusion} clase="simulator-note tint" />
        </>
      );

    case 'hallazgos':
      return (
        <>
          {escena.columnas.map((columna, i) => (
            <div key={i} className={`findings-column column-${i}`}>
              <h2 className="column-title enter"><Rico texto={columna.titulo} /></h2>
              <Tarjetas items={columna.tarjetas} />
            </div>
          ))}
        </>
      );

    case 'triangulacion':
      return (
        <>
          <div className="triangle-metrics">
            {escena.metricas.map((item, i) => (
              <MetricaVista key={i} item={item} clase={i < 2 ? 'solid' : 'muted'} />
            ))}
          </div>
          <Tarjetas items={escena.tarjetas} clase="triangle-notes" />
        </>
      );

    case 'criterios':
      return (
        <>
          <div className="criteria-columns">
            {escena.columnas.map((columna, i) => (
              <div key={i} className={`criteria-column column-${i}`}>
                <h2 className="column-title enter"><Rico texto={columna.titulo} /></h2>
                <ul className="criteria-list">
                  {columna.criterios.map((criterio) => (
                    <li key={criterio.codigo} className={`criterion enter${criterio.alta ? ' high' : ''}`}>
                      <span className="criterion-code">{criterio.codigo}</span>
                      <span className="criterion-text"><Rico texto={criterio.texto} /></span>
                      {criterio.alta ? <i className="criterion-flag" role="img" aria-label="prioridad alta" /> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="criteria-legend enter">
            <i className="legend-dot" />
            <span><Rico texto={escena.leyenda} /></span>
          </p>
        </>
      );

    case 'siguientes':
      return (
        <>
          <Tarjetas items={escena.pasos} clase="next-steps" />
          <TarjetaVista item={escena.pregunta} clase="dark open-question" />
        </>
      );

    case 'conclusiones':
      return <Tarjetas items={escena.puntos} clase="conclusion-list" />;

    case 'gracias':
      return (
        <>
          <h2 className="thanks-name enter"><Rico texto={escena.nombre} /></h2>
          <p className="thanks-description enter"><Rico texto={escena.descripcion} /></p>
          <Tarjetas items={escena.personas} clase="thanks-people" />
        </>
      );
  }
}

/** Piezas que se añaden al final de la escena, fuera de `.scene-body` (globos y desfile). */
function Extras({ escena }: { escena: Escena }) {
  switch (escena.tipo) {
    case 'portada':
      return <Globo escena={escena} clase="cover-mascot" />;
    case 'pregunta':
      return <Globo escena={escena} clase="question-mascot" />;
    case 'conclusiones':
      return <Globo escena={escena} clase="conclusion-mascot" />;
    case 'gracias':
      return (
        <>
          <Globo escena={escena} clase="thanks-mascot" />
          <div className="thanks-parade">
            {escena.personajes.map((clave, i) => (
              <Personaje key={`${clave}-${i}`} clave={clave} clase="enter" />
            ))}
          </div>
        </>
      );
    default:
      return null;
  }
}

interface Props {
  escena: Escena;
  indice: number;
  activa: boolean;
}

/** Una escena completa: decoración, cabecera, cuerpo y pie. */
const EscenaVista = forwardRef<HTMLElement, Props>(function EscenaVista({ escena, indice, activa }, ref) {
  const { interfaz } = useContenido();
  const esPortada = escena.tipo === 'portada';
  return (
    <section
      ref={ref}
      className={`slide slide--${escena.tipo} theme-${escena.tema}`}
      hidden={!activa}
      aria-labelledby={`title-${indice}`}
    >
      <Decoracion escena={escena} />
      <header className="slide-heading">
        {esPortada ? <p className="cover-brand enter">{interfaz.marca}</p> : null}
        {escena.seccion ? <span className="section-tag enter">{escena.seccion}</span> : null}
        {escena.tipo === 'portada' ? <p className="cover-tag enter">{escena.etiqueta}</p> : null}
        <h1 id={`title-${indice}`} className="enter"><Rico texto={escena.titulo} /></h1>
      </header>
      {GLOBO_PROPIO.includes(escena.tipo) ? null : <Globo escena={escena} />}
      <div className="scene-body">
        <Cuerpo escena={escena} />
      </div>
      <div className="slide-footer">
        <span>{interfaz.pie}</span>
        <span>{indice + 1}</span>
      </div>
      <Extras escena={escena} />
    </section>
  );
});

export default EscenaVista;
