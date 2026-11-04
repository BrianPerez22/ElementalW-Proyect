import { ExternalLink } from 'lucide-react';
import { asset } from '../utils';
import { site } from '../data/site';

/** Captura de la plataforma con acceso al sitio real en una pestaña aparte. */
export default function LivePreview() {
  return (
    <div className="rounded-2xl overflow-hidden border border-rose-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 border-b border-rose-100">
        <span className="flex gap-1" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose-100 border border-rose-200" />
        </span>
        <span className="flex-1 truncate text-[10px] font-semibold text-rose-800 bg-white border border-rose-100 rounded-full px-3 py-1">
          {site.urlLabel}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
          Vista previa
        </span>
      </div>

      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${site.urlLabel}`}
        className="block aspect-[8/5] overflow-hidden bg-rose-50"
      >
        <img
          src={asset('app-preview.png')}
          alt="Captura de la plataforma Elemental W, con su portada y actividades de aprendizaje"
          className="h-full w-full object-cover object-top"
        />
      </a>

      <div className="flex items-center justify-between gap-3 px-3 py-2 border-t border-rose-100 text-[11px] font-bold text-rose-700">
        <span>Captura de la plataforma</span>
        <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-rose-950">
          Abrir sitio <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
