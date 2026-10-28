import { FileText, Maximize2, Presentation } from 'lucide-react';
import type { Research } from '../types';
import { asset } from '../utils';
import Chispa from './Chispa';
import StatusBadge from './StatusBadge';

interface Props {
  research: Research;
  onOpen: (id: string) => void;
}

export default function ResearchCard({ research: r, onOpen }: Props) {
  return (
    <article className="bg-gradient-to-br from-white to-rose-50/50 p-6 sm:p-8 rounded-3xl border-2 border-rose-200 hover:border-rose-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-rose-600 text-white px-3 py-1 rounded-full">
            Investigación #{r.number}
          </span>
          <StatusBadge status={r.status} />
        </div>

        {r.poster ? (
          <button
            onClick={() => onOpen(r.id)}
            className="block w-full h-40 overflow-hidden rounded-2xl border border-rose-100 bg-rose-50"
            aria-label={`Abrir ${r.title}`}
          >
            <img
              src={asset(r.poster.image)}
              alt={r.poster.alt}
              loading="lazy"
              className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
            />
          </button>
        ) : (
          <div className="h-40 rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
            <Chispa animate flip={Number(r.number) % 2 === 0} className="w-28" />
          </div>
        )}

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 leading-snug">{r.title}</h3>
        <p className="text-xs sm:text-sm text-rose-800/70 leading-relaxed">{r.summary}</p>

        {r.highlights && (
          <div className="flex gap-3">
            {r.highlights.map((h) => (
              <div key={h.label} className="bg-white border border-rose-100 rounded-xl px-3 py-2">
                <span className="block font-serif font-extrabold text-rose-600 text-lg leading-none">{h.value}</span>
                <span className="text-[10px] uppercase font-bold text-rose-900/70 tracking-wider">{h.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {r.tags.map((t) => (
            <span key={t} className="text-[10px] font-semibold bg-rose-100/70 text-rose-700 px-2 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div className="text-xs text-rose-900/80 space-y-1">
          <p><strong>Autores:</strong> {r.authors}</p>
          <p><strong>Área:</strong> {r.area}</p>
        </div>
      </div>

      <div className="pt-6 space-y-2.5">
        <button
          onClick={() => onOpen(r.id)}
          className="w-full py-3.5 rounded-2xl bg-rose-950 hover:bg-rose-900 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {r.poster ? <Maximize2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          <span>{r.poster ? 'Ver investigación y póster' : 'Ver investigación'}</span>
        </button>

        {r.pitch && (
          <a
            href={asset(r.pitch.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-2xl bg-white hover:bg-rose-50 border-2 border-rose-300 hover:border-rose-500 text-rose-950 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Presentation className="w-4 h-4 text-rose-600" />
            <span>{r.pitch.label}</span>
            {r.pitch.detail && <span className="font-medium text-rose-800/70">· {r.pitch.detail}</span>}
          </a>
        )}
      </div>
    </article>
  );
}
