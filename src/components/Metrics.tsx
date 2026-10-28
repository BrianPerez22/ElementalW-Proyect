import type { ReactNode } from 'react';
import { globalCharts, globalMetrics } from '../data/metricas';
import type { MetricChart } from '../types';
import Chispa from './Chispa';
import ComparisonChart from './ComparisonChart';
import { BarList, DonutChart, SourcesFlow } from './MetricCharts';

/** Marco común de las gráficas que no traen su propio título. */
function Panel({ title, caption, children }: { title: string; caption?: string; children: ReactNode }) {
  return (
    <figure className="bg-rose-50/40 border border-rose-100 rounded-2xl p-4 sm:p-5 space-y-4">
      <div>
        <h4 className="font-bold text-rose-950 text-sm">{title}</h4>
        {caption && <figcaption className="text-xs text-rose-800/70 mt-0.5">{caption}</figcaption>}
      </div>
      {children}
    </figure>
  );
}

function ChartBody({ chart }: { chart: MetricChart }) {
  switch (chart.type) {
    case 'comparison':
      return <ComparisonChart {...chart} />;
    case 'donut':
      return (
        <Panel title={chart.title} caption={chart.caption}>
          <DonutChart value={chart.value} label={chart.label} restLabel={chart.restLabel} />
        </Panel>
      );
    case 'bars':
      return (
        <Panel title={chart.title} caption={chart.caption}>
          <BarList items={chart.items} />
        </Panel>
      );
    case 'sources':
      return (
        <Panel title={chart.title} caption={chart.caption}>
          <SourcesFlow inputs={chart.inputs} output={chart.output} />
        </Panel>
      );
  }
}

export default function Metrics() {
  return (
    <section id="metricas" className="scroll-mt-32 border-t border-rose-200/60 pt-20">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div className="soft-backdrop max-w-3xl">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">En números</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-rose-950 mt-2">Métricas globales</h2>
          <p className="text-sm text-rose-800/70 mt-2">
            Panorama general de todo lo investigado entre las investigaciones 1 y 2, antes de entrar al detalle de cada una.
          </p>
        </div>
        <Chispa variant="feliz" flip animate className="hidden sm:block w-28 shrink-0" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {globalMetrics.map((m) => (
          <div
            key={m.label}
            className="bg-white p-5 sm:p-7 rounded-3xl border border-rose-200/70 shadow-sm flex flex-col gap-1"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">{m.source}</span>
            <span className="font-serif font-extrabold text-3xl sm:text-5xl text-rose-600 leading-tight">{m.value}</span>
            <span className="text-sm font-bold text-rose-950">{m.label}</span>
            {m.detail && <span className="text-xs text-rose-800/70">{m.detail}</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {globalCharts.map((chart) => (
          <div
            key={`${chart.type}-${chart.title}`}
            className={`bg-white p-5 sm:p-6 rounded-3xl border border-rose-200/70 shadow-sm space-y-3 ${
              chart.wide ? 'lg:col-span-2' : ''
            }`}
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-rose-500">
              {chart.source}
            </span>
            <ChartBody chart={chart} />
          </div>
        ))}
      </div>
    </section>
  );
}
