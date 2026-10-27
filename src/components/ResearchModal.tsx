import { Award, Download, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Research } from '../types';
import { asset } from '../utils';
import BlockRenderer from './BlockRenderer';
import StatusBadge from './StatusBadge';

interface Props {
  research: Research;
  onClose: () => void;
}

export default function ResearchModal({ research: r, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-rose-950/80 backdrop-blur-md"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-title"
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[94vh] overflow-y-auto p-5 sm:p-10 border border-rose-200 shadow-2xl relative"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-rose-200 pb-4 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
              Investigación #{r.number}
            </span>
            <StatusBadge status={r.status} />
          </div>
          <h2 id="research-title" className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 mt-3">
            {r.title}
          </h2>
          <p className="text-xs text-rose-700 font-semibold mt-1">{r.category}</p>
        </div>

        <div className={`mt-6 grid grid-cols-1 gap-8 ${r.poster ? 'lg:grid-cols-5' : ''}`}>
          {r.poster && (
            <aside className="lg:col-span-2 space-y-3 lg:sticky lg:top-0 self-start">
              <a href={asset(r.poster.pdf)} target="_blank" rel="noopener noreferrer" className="block">
                <img
                  src={asset(r.poster.image)}
                  alt={r.poster.alt}
                  className="w-full rounded-2xl border border-rose-200 shadow-md hover:shadow-lg transition-shadow"
                />
              </a>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2">
                <a
                  href={asset(r.poster.pdf)}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-950 text-white font-bold text-xs hover:bg-rose-900 transition-colors"
                >
                  <Download className="w-4 h-4" /> Descargar póster (PDF)
                </a>
                <a
                  href={asset(r.poster.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-950 font-bold text-xs hover:bg-rose-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Abrir en pestaña nueva
                </a>
              </div>
            </aside>
          )}

          <div className={`space-y-6 text-xs sm:text-sm text-rose-900/80 leading-relaxed ${r.poster ? 'lg:col-span-3' : ''}`}>
            {r.blocks.map((b, i) => (
              <BlockRenderer key={i} block={b} />
            ))}

            <div className="bg-rose-950 text-white p-6 rounded-2xl space-y-2">
              <h4 className="font-serif font-bold text-base text-rose-200 flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-400" /> Créditos académicos
              </h4>
              <div className="text-xs text-rose-100/90 space-y-1">
                <p><strong>Autores:</strong> {r.authors}</p>
                <p><strong>Área:</strong> {r.area}</p>
                {r.event && <p><strong>Evento:</strong> {r.event}</p>}
                {r.date && <p><strong>Fecha y lugar:</strong> {r.date}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-8 flex justify-end border-t border-rose-200">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-rose-950 text-white font-bold text-xs hover:bg-rose-900 transition-colors"
          >
            Cerrar vista
          </button>
        </div>
      </div>
    </div>
  );
}
