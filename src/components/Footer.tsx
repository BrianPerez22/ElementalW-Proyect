import { site } from '../data/site';
import Chispa from './Chispa';

export default function Footer() {
  return (
    <footer className="bg-rose-950 text-white border-t border-rose-900 py-12 relative z-20">
      <div className="absolute -top-[4.5rem] right-6 sm:right-16 w-20 pointer-events-none">
        <Chispa flip animate className="w-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-serif font-bold text-lg flex items-center justify-center">
            W
          </div>
          <div>
            <span className="font-serif font-bold text-base block">Elemental W</span>
            <span className="text-xs text-rose-300/80">Plataforma educativa de ciencias básicas</span>
          </div>
        </div>

        <div className="text-center sm:text-right text-xs text-rose-300/70 space-y-1">
          <p>© {site.year} Elemental W · Proyecto en desarrollo ({site.draftLabel.toLowerCase()})</p>
          <p>
            Sitio oficial:{' '}
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-rose-200 underline hover:text-white">
              {site.urlLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
