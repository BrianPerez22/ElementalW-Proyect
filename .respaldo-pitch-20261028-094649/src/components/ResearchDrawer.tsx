import { ArrowLeft, ArrowRight, Award, Download, ExternalLink, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Research } from '../types';
import { asset } from '../utils';
import BlockRenderer from './BlockRenderer';
import Chispa from './Chispa';
import StatusBadge from './StatusBadge';

interface Props {
  research: Research;
  prev: Research | null;
  next: Research | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const ANIMATION_MS = 300;

/** Panel lateral (subpágina) con el detalle de una investigación. */
export default function ResearchDrawer({ research: r, prev, next, onClose, onNavigate }: Props) {
  const [shown, setShown] = useState(false);
  const closing = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Cierra con animación de salida y luego avisa al padre.
  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);
    window.setTimeout(onClose, ANIMATION_MS);
  }, [onClose]);

  // Animación de entrada, bloqueo de scroll del fondo y tecla Esc.
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setShown(true));
    });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && requestClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [requestClose]);

  // Al pasar a otra investigación, vuelve arriba.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [r.id]);

  return (
    <div className="fixed inset-0 z-[60]">
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-title"
        className={`absolute inset-0 w-full h-full bg-[#FAF7F8] flex flex-col transition-transform duration-300 ease-out ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Barra superior fija */}
        <div className="shrink-0 border-b border-rose-200/70 bg-white/85 backdrop-blur">
          <div className="max-w-6xl mx-auto h-16 px-5 sm:px-10 flex items-center justify-between gap-3">
          <button
            ref={closeRef}
            onClick={requestClose}
            className="inline-flex items-center gap-2 text-xs font-bold text-rose-800 hover:text-rose-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a investigaciones
          </button>
          <div className="flex items-center gap-2">
            <StatusBadge status={r.status} />
            <button
              onClick={requestClose}
              aria-label="Cerrar"
              className="w-9 h-9 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          </div>
        </div>

        {/* Contenido con scroll propio */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-5 sm:px-10 py-10 space-y-10">
            <header className="border-b border-rose-200 pb-6 flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
                  Investigaciones / #{r.number}
                </p>
                <h2 id="research-title" className="font-serif text-2xl sm:text-4xl font-bold text-rose-950 mt-2 leading-tight">
                  {r.title}
                </h2>
                <p className="text-xs sm:text-sm text-rose-700 font-semibold mt-2">{r.category}</p>
              </div>
              <Chispa
                variant="feliz"
                animate
                flip={Number(r.number) % 2 === 0}
                className="hidden md:block w-24 shrink-0"
              />
            </header>

            <div className={`grid grid-cols-1 gap-8 ${r.poster ? 'lg:grid-cols-5' : ''}`}>
              {r.poster && (
                <div className="lg:col-span-2 space-y-3 lg:sticky lg:top-0 self-start">
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
                </div>
              )}

              <div
                className={`space-y-6 text-xs sm:text-sm text-rose-900/80 leading-relaxed ${
                  r.poster ? 'lg:col-span-3' : ''
                }`}
              >
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

            {(prev || next) && (
              <nav
                aria-label="Otras investigaciones"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-rose-200"
              >
                {prev ? (
                  <button
                    onClick={() => onNavigate(prev.id)}
                    className="text-left bg-white border border-rose-200 hover:border-rose-400 rounded-2xl p-4 transition-colors"
                  >
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-500">
                      <ArrowLeft className="w-3 h-3" /> Anterior · #{prev.number}
                    </span>
                    <span className="block font-serif font-bold text-sm text-rose-950 mt-1 line-clamp-2">{prev.title}</span>
                  </button>
                ) : (
                  <span />
                )}
                {next ? (
                  <button
                    onClick={() => onNavigate(next.id)}
                    className="text-right bg-white border border-rose-200 hover:border-rose-400 rounded-2xl p-4 transition-colors"
                  >
                    <span className="flex items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-500">
                      Siguiente · #{next.number} <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="block font-serif font-bold text-sm text-rose-950 mt-1 line-clamp-2">{next.title}</span>
                  </button>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
