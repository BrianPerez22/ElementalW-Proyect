import { ExternalLink, Image as ImageIcon, Radio, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';
import { asset } from '../utils';

// Tamaño "de escritorio" con el que se renderiza el sitio; luego se escala para que quepa.
const VIEWPORT_W = 1280;
const VIEWPORT_H = 800;

type Mode = 'live' | 'image';

/** Vista previa en vivo de elementalw.site dentro de un marco de navegador. */
export default function LivePreview() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [mode, setMode] = useState<Mode>('live');
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / VIEWPORT_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const showLive = () => {
    setLoaded(false);
    setMode('live');
  };
  const reload = () => {
    setLoaded(false);
    setMode('live');
    setReloadKey((k) => k + 1);
  };

  const tab = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold transition-colors ${
      active ? 'bg-rose-600 text-white' : 'text-rose-700 hover:bg-rose-100'
    }`;

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
        {mode === 'live' && (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> En vivo
          </span>
        )}
      </div>

      <div ref={boxRef} className="relative w-full bg-rose-50 overflow-hidden" style={{ height: VIEWPORT_H * scale }}>
        {mode === 'live' ? (
          <>
            <iframe
              key={reloadKey}
              src={site.url}
              title="Vista previa en vivo de Elemental W"
              loading="lazy"
              tabIndex={-1}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setLoaded(true)}
              className="absolute top-0 left-0 border-0 bg-white"
              style={{
                width: VIEWPORT_W,
                height: VIEWPORT_H,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            />
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-rose-700 animate-pulse pointer-events-none">
                Cargando vista en vivo…
              </div>
            )}
            {/* Capa clicable: abre el sitio real */}
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${site.urlLabel}`}
              className="absolute inset-0"
            />
          </>
        ) : (
          <img
            src={asset('app-preview.png')}
            alt="Captura de la aplicación Elemental W"
            className="w-full h-full object-cover object-top"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t border-rose-100 text-[11px]">
        <div className="flex items-center gap-1">
          <button onClick={showLive} className={tab(mode === 'live')}>
            <Radio className="w-3 h-3" /> En vivo
          </button>
          <button onClick={() => setMode('image')} className={tab(mode === 'image')}>
            <ImageIcon className="w-3 h-3" /> Captura
          </button>
        </div>
        <div className="flex items-center gap-3 font-bold text-rose-700">
          <button onClick={reload} className="inline-flex items-center gap-1 hover:text-rose-950">
            <RefreshCw className="w-3 h-3" /> Recargar
          </button>
          <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-rose-950">
            Abrir <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
