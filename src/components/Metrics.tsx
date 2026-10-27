import { globalMetrics } from '../data/metricas';

export default function Metrics() {
  return (
    <section id="metricas" className="scroll-mt-32 border-t border-rose-200/60 pt-20">
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">En números</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-rose-950 mt-2">Métricas globales</h2>
        <p className="text-sm text-rose-800/70 mt-2">
          Resumen básico de las investigaciones 1 y 2, antes de entrar al detalle de cada una.
        </p>
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
    </section>
  );
}
