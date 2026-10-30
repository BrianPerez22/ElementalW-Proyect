import { Fragment } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Icono } from './iconos';
import { cls, escenaRaiz, Grupo, hijo, Hijo, Relleno, Texto } from './piezas';
import type { DireccionEscena } from './piezas';
import type { Escena, Escenas, Tono } from './tipos';

/** Tono → variable de color de estilos.css (para cifras y etiquetas con color propio). */
const COLOR: Record<Tono, string> = {
  azul: 'var(--blue)',
  verde: 'var(--green)',
  naranja: 'var(--orange)',
  rojo: 'var(--red)',
  morado: 'var(--purple)',
};

/** Clase CSS de cada componente según el tono (los nombres vienen del diseño original). */
const TARJETA_PROBLEMA: Partial<Record<Tono, string>> = { rojo: 'red', naranja: 'orange', morado: 'purple' };
const ICONO_FUNCION: Partial<Record<Tono, string>> = { verde: 'green', naranja: 'orange', morado: 'purple' };
const ICONO_PASO: Partial<Record<Tono, string>> = { verde: 'g', morado: 'p', naranja: 'o' };
const ICONO_PILAR: Partial<Record<Tono, string>> = { azul: 'blue', morado: 'purple', verde: 'green', naranja: 'orange' };
const PUNTO_MODELO: Partial<Record<Tono, string>> = { morado: 'pur', azul: 'bl', verde: 'gr' };
const FICHA_MODELO: Partial<Record<Tono, string>> = { morado: 'p', azul: 'b', verde: 'g' };
const NUMERO_PASO: Partial<Record<Tono, string>> = { verde: 'green' };
const ETIQUETA_COMPETENCIA: Partial<Record<Tono, string>> = { azul: 'highlight', verde: 'green-h' };
const CIFRA: Record<string, string> = { gris: 'grey', verde: 'green', naranja: 'orange', azul: 'blue' };
const RELLENO: Record<string, string> = { verde: 'green-b', azul: 'blue-b', rojo: 'red-b' };
const PORCENTAJE: Record<string, string> = { verde: 'green', azul: 'blue', rojo: 'red' };
const VARIANTE_BLOQUE = { cautela: 'warn', riesgo: 'red-b' } as const;

/** Etiqueta superior de cada escena (línea + texto en mayúsculas espaciadas). */
function Etiqueta({ texto, estilo }: { texto: string; estilo?: CSSProperties }) {
  return (
    <Grupo className="scene-eyebrow">
      <motion.span className="label-mono" style={estilo} variants={hijo}>
        {texto}
      </motion.span>
    </Grupo>
  );
}

/** Cada composición recibe los datos de su escena (ya con el tipo correcto). */
const composiciones: { [K in keyof Escenas]: (e: Escenas[K]) => ReactNode } = {
  portada: (e) => (
    <>
      <Grupo className="cover-left">
        <Hijo className="scene-eyebrow">
          <span className="label-mono">{e.etiqueta}</span>
        </Hijo>
        <motion.h1 className="cover-h1" variants={hijo}>
          <Texto texto={e.encabezado} />
        </motion.h1>
        <motion.p className="cover-sub" variants={hijo}>
          <Texto texto={e.subtitulo} />
        </motion.p>
        <Hijo className="cover-meta">
          {e.datos.map((d, i) => (
            <Fragment key={d.etiqueta}>
              {i > 0 ? <div className="cover-meta__sep" /> : null}
              <div className="cover-meta__item">
                <div className="cover-meta__label">{d.etiqueta}</div>
                <div className="cover-meta__val">{d.valor}</div>
              </div>
            </Fragment>
          ))}
        </Hijo>
      </Grupo>
      <div className="cover-deco" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div className="ring" key={i}>
            <div className="ring-dot" />
          </div>
        ))}
        <div className="deco-center">
          <div className="deco-ew">{e.emblema.sigla}</div>
          <div className="deco-lbl">{e.emblema.rotulo}</div>
        </div>
      </div>
    </>
  ),

  problema: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="problem-grid">
        {e.tarjetas.map((t) => (
          <Hijo key={t.titulo} className={cls('problem-card', TARJETA_PROBLEMA[t.tono])}>
            <div className="problem-card__icon">
              <Icono nombre={t.icono} />
            </div>
            <div className="problem-card__title">{t.titulo}</div>
            <div className="problem-card__body">
              <Texto texto={t.texto} />
            </div>
          </Hijo>
        ))}
      </Grupo>
    </>
  ),

  pregunta: (e) => (
    <Grupo className="question-wrap">
      <Hijo className="scene-eyebrow scene-eyebrow--centro">
        <span className="label-mono">{e.etiqueta}</span>
      </Hijo>
      <Hijo className="question-big">
        <Texto texto={e.pregunta} />
      </Hijo>
      <Hijo className="question-sub">
        {e.pildoras.map((p) => (
          <div className="q-pill" key={p.texto}>
            <Icono nombre={p.icono} />
            {p.texto}
          </div>
        ))}
      </Hijo>
    </Grupo>
  ),

  app: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="app-layout">
        <Hijo className="app-left">
          <div className="app-desc">
            <Texto texto={e.descripcion} />
          </div>
          <div className="app-features">
            {e.funciones.map((f) => (
              <div className="feature-row" key={f.texto}>
                <div className={cls('feature-icon', ICONO_FUNCION[f.tono])}>
                  <Icono nombre={f.icono} />
                </div>
                <div className="feature-text">
                  <Texto texto={f.texto} />
                </div>
              </div>
            ))}
          </div>
        </Hijo>
        <Hijo className="app-right">
          <div className="label-mono" style={{ marginBottom: 20 }}>
            {e.competenciasTitulo}
          </div>
          <div className="comp-tags">
            {e.competencias.map((c) => (
              <div className={cls('comp-tag', c.tono && ETIQUETA_COMPETENCIA[c.tono])} key={c.texto}>
                {c.texto}
              </div>
            ))}
          </div>
          <div className="game-modes">
            {e.modos.map((m) => (
              <div className="game-mode" key={m.nombre}>
                <div className="game-mode__icon">
                  <Icono nombre={m.icono} />
                </div>
                <div className="game-mode__name">{m.nombre}</div>
                <div className="game-mode__desc">{m.detalle}</div>
              </div>
            ))}
          </div>
        </Hijo>
      </Grupo>
    </>
  ),

  metodologia: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="metodo-layout">
        <Hijo className="metodo-flow">
          {e.pasos.map((p) => (
            <div className="flow-step" key={p.numero}>
              <div className={cls('flow-num', NUMERO_PASO[p.tono])}>{p.numero}</div>
              <div className="flow-content">
                <div className="flow-title">{p.titulo}</div>
                <div className="flow-desc">
                  <Texto texto={p.texto} />
                </div>
              </div>
            </div>
          ))}
          <div className="metodo-note">
            <Texto texto={e.nota} />
          </div>
        </Hijo>
        <Hijo className="groups-panel">
          {e.grupos.map((g, i) => (
            <div className={`group-card g${i + 1}`} key={g.etiqueta}>
              <div className="group-header">
                <div className="group-label">{g.etiqueta}</div>
              </div>
              <div className="group-name">{g.nombre}</div>
              <div className="group-details">
                <Texto texto={g.detalle} />
              </div>
            </div>
          ))}
        </Hijo>
      </Grupo>
    </>
  ),

  resultados: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="results-hero">
        <Hijo className="results-numbers">
          {e.cifras.map((c) => (
            <Fragment key={c.etiqueta}>
              <div className="res-num-block">
                <div className={cls('res-num', CIFRA[c.tono])}>
                  {c.valor}
                  <span className={c.sufijoPequeno ? 'res-pp' : 'res-pct'}>{c.sufijo}</span>
                </div>
                <div className="res-label">{c.etiqueta}</div>
              </div>
              {c.flechaDespues ? <div className="res-arrow">→</div> : null}
            </Fragment>
          ))}
        </Hijo>
        <Hijo className="results-bottom">
          {e.destacados.map((d) => (
            <div className="result-insight" key={d.texto}>
              <div className="ri-val" style={{ color: COLOR[d.tono] }}>
                {d.valor}
              </div>
              <div className="ri-lbl">
                <Texto texto={d.texto} />
              </div>
            </div>
          ))}
        </Hijo>
      </Grupo>
    </>
  ),

  grupos: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="groups-comparison">
        {e.comparados.map((g, i) => (
          <Hijo className={`gc-card g${i + 1}`} key={g.etiqueta}>
            <div className="gc-header">
              <div className="gc-label">{g.etiqueta}</div>
              <div className="gc-title">{g.titulo}</div>
            </div>
            <div className="gc-stat-row">
              <div className="gc-big">
                {g.grande}
                <small>{g.unidad}</small>
              </div>
            </div>
            <div className="gc-small-lbl">{g.subetiqueta}</div>
            {g.filas.map((f) => (
              <div className="gc-row" key={f.etiqueta}>
                <span className="gc-row-lbl">{f.etiqueta}</span>
                <span className={cls('gc-row-val', f.tendencia === 'sube' && 'up', f.tendencia === 'baja' && 'down')}>
                  {f.valor}
                </span>
              </div>
            ))}
          </Hijo>
        ))}
        <Hijo className="gc-card insight">
          <div className="gc-header">
            <div className="gc-label">{e.interpretacion.etiqueta}</div>
            <div className="gc-title">{e.interpretacion.titulo}</div>
          </div>
          <div className="gc-insight-text">
            <Texto texto={e.interpretacion.texto} />
          </div>
        </Hijo>
      </Grupo>
    </>
  ),

  competencias: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="comp-layout">
        <Hijo className="comp-side">
          <div className="comp-side-title green">{e.mejoran.titulo}</div>
          {e.mejoran.barras.map((b) => (
            <FilaBarra key={b.codigo} barra={b} />
          ))}
        </Hijo>
        <Hijo className="comp-side">
          <div className="comp-side-title red">{e.sinMejora.titulo}</div>
          {e.sinMejora.barras.map((b) => (
            <FilaBarra key={b.codigo} barra={b} />
          ))}
          <div className="bar-divider" />
          <div className="comp-nota">
            <Texto texto={e.sinMejora.nota} />
          </div>
        </Hijo>
      </Grupo>
    </>
  ),

  percepcion: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="percep-layout">
        <Hijo className="percep-bars">
          {e.indicadores.map((p) => (
            <div className="percep-item" key={p.valor}>
              <div className="percep-header">
                <div className={cls('percep-pct', p.tono === 'verde' ? 'green' : p.tono === 'azul' ? 'blue' : 'orange')}>
                  {p.valor}
                </div>
                <div className="percep-txt">
                  <Texto texto={p.texto} />
                </div>
              </div>
              <div className="percep-track">
                <Relleno
                  ancho={p.porcentaje}
                  clase={cls('percep-fill', p.tono === 'verde' ? 'green' : p.tono === 'azul' ? 'blue' : 'orange')}
                />
              </div>
            </div>
          ))}
        </Hijo>
        <Hijo className="percep-context">
          {e.contexto.map((c) => (
            <div className="ctx-card" key={c.titulo}>
              <div className="ctx-card__title">{c.titulo}</div>
              <div className="ctx-card__body">
                <Texto texto={c.texto} />
              </div>
            </div>
          ))}
        </Hijo>
      </Grupo>
    </>
  ),

  interpretacion: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="interp-layout">
        {e.columnas.map((col) => (
          <Hijo className="interp-col" key={col.titulo}>
            <div className="label-mono" style={{ marginBottom: 20, color: COLOR[col.tono] }}>
              {col.titulo}
            </div>
            {col.bloques.map((b) => (
              <div className={cls('interp-block', b.variante && VARIANTE_BLOQUE[b.variante])} key={b.titulo}>
                <div className="interp-block__icon">
                  <Icono nombre={b.icono} />
                </div>
                <div className="interp-block__title">{b.titulo}</div>
                <div className="interp-block__body">
                  <Texto texto={b.texto} />
                </div>
              </div>
            ))}
          </Hijo>
        ))}
      </Grupo>
    </>
  ),

  conclusiones: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="conclu-list">
        {e.puntos.map((p) => (
          <Hijo className="conclu-item" key={p.numero}>
            <div className="conclu-num">{p.numero}</div>
            <div className="conclu-text">
              <Texto texto={p.texto} />
            </div>
          </Hijo>
        ))}
      </Grupo>
    </>
  ),

  siguientes: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} />
      <Grupo className="vision-layout">
        <Hijo className="next-steps">
          {e.pasos.map((p) => (
            <div className="step-item" key={p.titulo}>
              <div className={cls('step-icon', ICONO_PASO[p.tono])}>
                <Icono nombre={p.icono} />
              </div>
              <div className="step-content">
                <div className="step-title">{p.titulo}</div>
                <div className="step-body">
                  <Texto texto={p.texto} />
                </div>
              </div>
            </div>
          ))}
        </Hijo>
        <Hijo className="vision-right">
          <div className="big-question">
            <div className="bq-pre">{e.pregunta.etiqueta}</div>
            <div className="bq-text">
              <Texto texto={e.pregunta.texto} />
            </div>
          </div>
          <div className="relevance-tags">
            {e.etiquetas.map((t) => (
              <div className="rtag" key={t}>
                {t}
              </div>
            ))}
          </div>
        </Hijo>
      </Grupo>
    </>
  ),

  plataforma: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} estilo={{ color: 'var(--purple)' }} />
      <Grupo className="powerup-layout">
        <Hijo className="powerup-hero">
          <div className="powerup-badge">
            <Icono nombre="estrella" />
            {e.insignia}
          </div>
          <div className="powerup-title">
            <Texto texto={e.encabezado} />
          </div>
          <div className="powerup-desc">
            <Texto texto={e.descripcion} />
          </div>
        </Hijo>
        <Hijo className="powerup-pillars">
          {e.pilares.map((p) => (
            <div className="pillar-row" key={p.titulo}>
              <div className={cls('pillar-icon', ICONO_PILAR[p.tono])}>
                <Icono nombre={p.icono} />
              </div>
              <div className="pillar-content">
                <div className="pillar-title">{p.titulo}</div>
                <div className="pillar-desc">
                  <Texto texto={p.texto} />
                </div>
              </div>
            </div>
          ))}
        </Hijo>
      </Grupo>
    </>
  ),

  modelo: (e) => (
    <>
      <Etiqueta texto={e.etiqueta} estilo={{ color: 'var(--purple)' }} />
      <Grupo className="econ-layout">
        <Hijo className="econ-left">
          <div className="econ-flow">
            {e.pasos.map((p) => (
              <div className="econ-step" key={p.numero}>
                <div className={cls('econ-dot', PUNTO_MODELO[p.tono])}>{p.numero}</div>
                <div className="econ-content">
                  <div className="econ-title">{p.titulo}</div>
                  <div className="econ-body">
                    <Texto texto={p.texto} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Hijo>
        <Hijo className="econ-right">
          <div className="econ-highlight">
            <div className="econ-highlight__pre">{e.destacado.etiqueta}</div>
            <div className="econ-highlight__text">
              <Texto texto={e.destacado.texto} />
            </div>
          </div>
          <div className="econ-chips">
            {e.fichas.map((f) => (
              <div className={cls('econ-chip', f.tono && FICHA_MODELO[f.tono])} key={f.texto}>
                {f.texto}
              </div>
            ))}
          </div>
        </Hijo>
      </Grupo>
    </>
  ),

  creditos: (e) => (
    <Grupo className="credits-wrap">
      <Hijo className="credits-name">{e.nombrePersona}</Hijo>
      <Hijo className="credits-role">{e.rol}</Hijo>
      <Hijo className="credits-uni">{e.universidad}</Hijo>
      <Hijo className="credits-semillero">{e.semillero}</Hijo>
      <Hijo className="credits-divider" />
      {e.filas.map((f) => (
        <Hijo className="credits-row" key={f.etiqueta}>
          {f.etiqueta}: <span>{f.valor}</span>
        </Hijo>
      ))}
      <Hijo className="credits-stamp">{e.sello}</Hijo>
    </Grupo>
  ),
};

function FilaBarra({ barra: b }: { barra: { nombre: string; codigo: string; ancho: number; valor: string; tono: string } }) {
  return (
    <div className="bar-row">
      <div className="bar-label">
        <div className="bar-label-main">{b.nombre}</div>
        <div className="bar-label-sub">{b.codigo}</div>
      </div>
      <div className="bar-track">
        <Relleno ancho={b.ancho} clase={cls('bar-fill', RELLENO[b.tono])} />
      </div>
      <div className={cls('bar-pct', PORCENTAJE[b.tono])}>{b.valor}</div>
    </div>
  );
}

/** Una escena: se desliza al entrar y salir y escalona su contenido. El id (s1…s15) lo usa estilos.css. */
export default function EscenaVista({
  escena,
  indice,
  direccion,
}: {
  escena: Escena;
  indice: number;
  direccion: DireccionEscena;
}) {
  const componer = composiciones[escena.tipo] as (e: Escena) => ReactNode;
  return (
    <motion.section
      id={`s${indice + 1}`}
      className="scene"
      aria-label={`${indice + 1}. ${escena.nombre}`}
      custom={direccion}
      variants={escenaRaiz}
      initial="oculto"
      animate="visible"
      exit="salida"
    >
      {componer(escena)}
    </motion.section>
  );
}
