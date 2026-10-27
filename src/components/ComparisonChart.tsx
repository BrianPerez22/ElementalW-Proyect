import type { ContentBlock } from '../types';

type Props = Extract<ContentBlock, { type: 'comparison' }>;

const fmt = (n: number) => `${n.toFixed(1)}%`;

/** Gráfico de barras horizontales comparando dos series (p. ej. pre-test vs post-test). */
export default function ComparisonChart({ title, caption, seriesLabels, items }: Props) {
  return (
    <figure className="bg-rose-50/40 border border-rose-100 rounded-2xl p-4 sm:p-5 space-y-4">
      <div>
        <h4 className="font-bold text-rose-950 text-sm">{title}</h4>
        {caption && <figcaption className="text-xs text-rose-800/70 mt-0.5">{caption}</figcaption>}
      </div>

      <div className="flex items-center gap-4 text-[11px] font-bold text-rose-800">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-300" /> {seriesLabels[0]}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-600" /> {seriesLabels[1]}</span>
      </div>

      <div className="space-y-4">
        {items.map((it) => {
          const diff = it.delta ?? it.b - it.a;
          return (
            <div key={it.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-rose-950">
                <span>{it.label}</span>
                <span className={diff >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                  {diff >= 0 ? '+' : '−'}
                  {Math.abs(diff).toFixed(1)}%
                </span>
              </div>
              {[
                { v: it.a, cls: 'bg-rose-300', name: seriesLabels[0] },
                { v: it.b, cls: 'bg-rose-600', name: seriesLabels[1] },
              ].map((bar) => (
                <div key={bar.name} className="flex items-center gap-2">
                  <div
                    className="flex-1 h-3.5 bg-white rounded-full overflow-hidden border border-rose-100"
                    role="img"
                    aria-label={`${it.label}, ${bar.name}: ${fmt(bar.v)}`}
                  >
                    <div className={`h-full rounded-full ${bar.cls} transition-all duration-700`} style={{ width: `${Math.min(bar.v, 100)}%` }} />
                  </div>
                  <span className="w-12 text-right text-[11px] font-mono text-rose-900/80">{fmt(bar.v)}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </figure>
  );
}
