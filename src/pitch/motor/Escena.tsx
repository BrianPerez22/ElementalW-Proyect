import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Letras, Palabras, Rico, TextoContado } from './formato';
import {
  abrir,
  aparecer,
  bandera,
  columna,
  desdeIzquierda,
  escenaRaiz,
  grupo,
  INICIO_CONTENIDO,
  pop,
  RESORTE_SUAVE,
  salto,
  subir,
  tarjeta,
} from './movimiento';
import type { DireccionEscena } from './movimiento';
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

/** Cuándo arranca el contador de la métrica `i` (segundos desde que empieza la escena). */
const retrasoMetrica = (i: number, escalon = 0.12) => INICIO_CONTENIDO + 0.2 + i * escalon;

/** Nodo circular que conecta dos tarjetas (flecha). `x` e `y` son el centro, en px del contenedor. */
function Nodo({ x, y }: { x: number; y: number }) {
  return (
    <motion.i
      className="link-node"
      style={{ left: x - 15, top: y - 15 } as CSSProperties}
      variants={pop}
      aria-hidden="true"
    />
  );
}

/** Cuerpo de cada escena: una composición por `tipo`. */
function Cuerpo({ escena }: { escena: Escena }) {
  const { interfaz } = useContenido();
  switch (escena.tipo) {
    case 'portada':
      return (
        <>
          <motion.p className="cover-subtitle" variants={subir}><Rico texto={escena.subtitulo} /></motion.p>
          <Tarjetas items={escena.datos} clase="cover-data" escalon={0.1} variantes={subir} />
        </>
      );

    case 'pregunta':
      return (
        <>
          <motion.blockquote className="question-card" variants={tarjeta}>
            <p><Palabras texto={escena.pregunta} escalon={0.028} /></p>
          </motion.blockquote>
          <Tarjetas items={escena.tarjetas} clase="question-chips" retraso={0.45} escalon={0.16} />
        </>
      );

    case 'herramienta':
      return (
        <>
          <motion.p className="solution-intro" variants={subir}><Rico texto={escena.resumen} resaltar /></motion.p>
          <div className="solution-main">
            <div className="solution-features">
              <Tarjetas items={escena.tarjetas} escalon={0.1} retraso={0.15} />
              <Tarjetas items={escena.actividades} clase="activity-strip" escalon={0.08} retraso={0.5} contar />
            </div>
            <motion.aside className="solution-simulators" variants={{ ...columna(1), visible: { opacity: 1, x: 0, transition: { ...RESORTE_SUAVE, delayChildren: 0.1 } } }}>
              <h2><TextoContado texto={escena.tituloSimuladores} ui={interfaz} retraso={INICIO_CONTENIDO + 0.4} /></h2>
              <Simuladores />
            </motion.aside>
          </div>
        </>
      );

    case 'metodo':
      return (
        <>
          <Tarjetas items={escena.pasos} clase="method-steps" escalon={0.28} conRiel variantes={desdeIzquierda} />
          <div className="method-bottom">
            {escena.grupos.map((grupoItem, i) => (
              <TarjetaVista
                key={i}
                item={grupoItem}
                indice={i}
                clase="group-card"
                tras={
                  <strong className="group-size">
                    <TextoContado texto={grupoItem.valor} ui={interfaz} retraso={INICIO_CONTENIDO + 1.1 + i * 0.12} />
                  </strong>
                }
              />
            ))}
            <TarjetaVista item={escena.metrica} indice={2} clase="method-metric" />
          </div>
        </>
      );

    case 'cifras':
      return (
        <>
          <div className="figures-grid">
            {escena.metricas.map((item, i) => (
              <MetricaVista key={i} item={item} clase={i % 2 ? 'tint' : ''} retraso={retrasoMetrica(i)} />
            ))}
          </div>
          <TarjetaVista item={escena.nota} indice={6} clase="dark figures-note" />
        </>
      );

    case 'simulador':
      return (
        <>
          <GraficaBarras datos={escena.grafica} />
          <TarjetaVista item={escena.conclusion} clase="simulator-note tint" variantes={{ ...tarjeta, oculto: { opacity: 0, x: 60 } }} />
        </>
      );

    case 'hallazgos':
      return (
        <>
          {escena.columnas.map((col, i) => (
            <motion.div key={i} className={`findings-column column-${i}`} variants={columna(i === 0 ? -1 : 1)}>
              <motion.h2 className="column-title" variants={abrir}><Rico texto={col.titulo} /></motion.h2>
              <Tarjetas items={col.tarjetas} escalon={0.12} retraso={0.1} />
            </motion.div>
          ))}
        </>
      );

    case 'triangulacion':
      return (
        <>
          <div className="triangle-metrics">
            {escena.metricas.map((item, i) => (
              <MetricaVista
                key={i}
                item={item}
                clase={i < 2 ? 'solid' : 'muted'}
                retraso={retrasoMetrica(i, 0.2)}
                medidor="puntos"
              />
            ))}
          </div>
          <Tarjetas
            items={escena.tarjetas}
            clase="triangle-notes"
            escalon={0.2}
            retraso={0.1}
            hijos={null}
          />
          {[0, 1, 2].map((i) => (
            <Nodo key={i} x={551} y={67.7 + i * 153.3} />
          ))}
        </>
      );

    case 'criterios':
      return (
        <>
          <div className="criteria-columns">
            {escena.columnas.map((col, i) => (
              <motion.div key={i} className={`criteria-column column-${i}`} variants={columna(i === 0 ? -1 : 1)}>
                <motion.h2 className="column-title" variants={abrir}><Rico texto={col.titulo} /></motion.h2>
                <motion.ul className="criteria-list" variants={{ oculto: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}>
                  {col.criterios.map((criterio) => (
                    <motion.li key={criterio.codigo} className={`criterion${criterio.alta ? ' high' : ''}`} variants={desdeIzquierda}>
                      <span className="criterion-code">{criterio.codigo}</span>
                      <span className="criterion-text"><Rico texto={criterio.texto} /></span>
                      {criterio.alta ? (
                        <motion.i className="criterion-flag" role="img" aria-label="prioridad alta" variants={bandera} />
                      ) : null}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
          <motion.p className="criteria-legend" variants={subir}>
            <i className="legend-dot" />
            <span><Rico texto={escena.leyenda} /></span>
          </motion.p>
        </>
      );

    case 'siguientes':
      return (
        <>
          <Tarjetas
            items={escena.pasos}
            clase="next-steps"
            escalon={0.22}
            variantes={desdeIzquierda}
            hijos={[281, 572, 863].map((x) => (
              <Nodo key={x} x={x} y={164} />
            ))}
          />
          <TarjetaVista item={escena.pregunta} indice={4} clase="dark open-question" variantes={{ ...tarjeta, oculto: { opacity: 0, y: 60 } }} />
        </>
      );

    case 'conclusiones':
      return <Tarjetas items={escena.puntos} clase="conclusion-list" escalon={0.2} variantes={desdeIzquierda} />;

    case 'gracias':
      return (
        <>
          <motion.h2 className="thanks-name" variants={subir}><Rico texto={escena.nombre} /></motion.h2>
          <motion.p className="thanks-description" variants={subir}><Rico texto={escena.descripcion} /></motion.p>
          <Tarjetas items={escena.personas} clase="thanks-people" escalon={0.15} retraso={0.1} />
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
      return (
        <>
          <i className="ripple ripple-1" aria-hidden="true" />
          <i className="ripple ripple-2" aria-hidden="true" />
          <Globo escena={escena} clase="conclusion-mascot" />
        </>
      );
    case 'gracias':
      return (
        <>
          <Globo escena={escena} clase="thanks-mascot" />
          <motion.div
            className="thanks-parade"
            variants={{
              oculto: { y: '100%' },
              visible: { y: '0%', transition: { type: 'spring', stiffness: 140, damping: 22, delay: 0.3, delayChildren: 0.55, staggerChildren: 0.13 } },
            }}
          >
            {escena.personajes.map((clave, i) => (
              <Personaje
                key={`${clave}-${i}`}
                clave={clave}
                clase="saltarin"
                variantes={salto}
                estilo={{ '--n': i } as CSSProperties}
              />
            ))}
          </motion.div>
        </>
      );
    default:
      return null;
  }
}

interface Props {
  escena: Escena;
  indice: number;
  direccion: DireccionEscena;
}

/** Una escena completa: decoración, cabecera, cuerpo y pie. Se anima sola al montarse. */
export default function EscenaVista({ escena, indice, direccion }: Props) {
  const { interfaz } = useContenido();
  const esPortada = escena.tipo === 'portada';
  return (
    <motion.section
      className={`slide slide--${escena.tipo} theme-${escena.tema}`}
      aria-labelledby={`title-${indice}`}
      variants={escenaRaiz}
      custom={direccion}
      initial="oculto"
      animate="visible"
      exit="salida"
    >
      {esPortada ? <motion.i className="cover-planet" variants={{ oculto: { scale: 0.7, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { ...RESORTE_SUAVE, delay: 0.25 } } }} aria-hidden="true" /> : null}
      <Decoracion escena={escena} />
      <motion.header className="slide-heading" variants={grupo(0, 0.1)}>
        {esPortada ? <motion.p className="cover-brand" variants={aparecer}>{interfaz.marca}</motion.p> : null}
        {escena.seccion ? <motion.span className="section-tag" variants={abrir}>{escena.seccion}</motion.span> : null}
        {escena.tipo === 'portada' ? <motion.p className="cover-tag" variants={abrir}>{escena.etiqueta}</motion.p> : null}
        <h1 id={`title-${indice}`}>
          {escena.tipo === 'gracias' ? <Letras texto={escena.titulo} /> : <Palabras texto={escena.titulo} />}
        </h1>
      </motion.header>
      {GLOBO_PROPIO.includes(escena.tipo) ? null : <Globo escena={escena} />}
      <motion.div className="scene-body" variants={grupo(0.1, 0.11)}>
        <Cuerpo escena={escena} />
      </motion.div>
      <motion.div className="slide-footer" variants={aparecer}>
        <span>{interfaz.pie}</span>
        <span>{indice + 1}</span>
      </motion.div>
      <Extras escena={escena} />
    </motion.section>
  );
}
