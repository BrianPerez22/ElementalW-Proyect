import { ChevronRight, ExternalLink, Microscope } from 'lucide-react';
import { site } from '../data/site';

interface Props {
  onNavigate: (id: string) => void;
}

const links = [
  { id: 'about', label: '¿Qué es?' },
  { id: 'enfoque', label: 'Enfoque' },
  { id: 'metricas', label: 'Métricas' },
];

export default function Header({ onNavigate }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F8]/85 backdrop-blur-md border-b border-rose-200/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        <button onClick={() => onNavigate('about')} className="flex items-center gap-3 group text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white font-serif font-bold text-xl flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            W
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white font-serif font-bold text-xl flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            W
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg text-rose-950 tracking-tight leading-none">Elemental W</span>
            <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">Ciencias Básicas</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-rose-900/80" aria-label="Principal">
          {links.map((l) => (
            <button key={l.id} onClick={() => onNavigate(l.id)} className="hover:text-rose-600 transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-950 transition-colors"
          >
            <span>{site.urlLabel}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => onNavigate('investigaciones')}
            className="group inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all"
          >
            <Microscope className="w-4 h-4 text-rose-100" />
            <span>Ver Investigaciones</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}
