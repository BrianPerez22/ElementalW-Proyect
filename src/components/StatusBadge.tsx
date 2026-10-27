import type { ResearchStatus } from '../types';

const styles: Record<ResearchStatus, { label: string; cls: string }> = {
  completada: { label: 'Completada', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  'en-progreso': { label: 'En progreso', cls: 'bg-amber-100 text-amber-800 border-amber-200' },
};

export default function StatusBadge({ status }: { status: ResearchStatus }) {
  const s = styles[status];
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${s.cls}`}>
      {s.label}
    </span>
  );
}
