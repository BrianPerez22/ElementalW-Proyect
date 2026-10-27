import { ArrowDown, ArrowRight } from 'lucide-react';

const RING_BG = '#fecdd3'; // rose-200
const RING_FG = '#e11d48'; // rose-600

/** Anillo con porcentaje (0–100) y leyenda. */
export function DonutChart({ value, label, restLabel }: { value: number; label: string; restLabel: string }) {
  const pct = Math.min(Math.max(value, 0), 100);
  const r = 42;
  const c = 2 * Math.PI * r;
  const filled = (pct / 100) * c;

  return (
    <div className="flex items-center gap-5">
      <div className="relative w-32 h-32 shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" role="img" aria-label={`${label}: ${pct}%`}>
          <circle cx="60" cy="60" r={r} fill="none" stroke={RING_BG} strokeWidth="16" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={RING_FG}
            strokeWidth="16"
            strokeDasharray={`${filled} ${c - filled}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-serif font-extrabold text-2xl text-rose-950">
          {pct}%
        </span>
      </div>

      <ul className="space-y-2 text-xs font-semibold text-rose-950">
        <li className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-rose-600" /> {pct}% {label}
        </li>
        <li className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-rose-200" /> {100 - pct}% {restLabel}
        </li>
      </ul>
    </div>
  );
}

/** Barras horizontales de una sola serie (valores en %). */
export function BarList({ items }: { items: { label: string; value: number }[] }) {
  return (
    <div className="space-y-4">
      {items.map((it) => (
        <div key={it.label} className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-3 text-xs font-semibold text-rose-950">
            <span>{it.label}</span>
            <span className="font-mono text-rose-700">{it.value}%</span>
          </div>
          <div
            className="h-3.5 bg-white rounded-full overflow-hidden border border-rose-100"
            role="img"
            aria-label={`${it.label}: ${it.value}%`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-700"
              style={{ width: `${Math.min(it.value, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Esquema simple: varias fuentes de datos que convergen en un resultado. */
export function SourcesFlow({ inputs, output }: { inputs: string[]; output: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="flex-1 space-y-2">
        {inputs.map((i) => (
          <div
            key={i}
            className="bg-white border border-rose-200 rounded-xl px-3 py-2.5 text-xs font-bold text-rose-950 text-center"
          >
            {i}
          </div>
        ))}
      </div>
      <ArrowRight className="hidden sm:block w-5 h-5 text-rose-400 shrink-0" />
      <ArrowDown className="sm:hidden w-5 h-5 text-rose-400 self-center" />
      <div className="flex-1 bg-rose-950 text-white rounded-xl px-3 py-4 text-xs font-bold text-center leading-snug">
        {output}
      </div>
    </div>
  );
}
