import { ArrowDown, Atom, BookOpen, ExternalLink, Globe, TestTube2 } from 'lucide-react';
import { site } from '../data/site';

interface Props {
  visible: boolean;
  onEnter: () => void;
}

export default function Hero({ visible, onEnter }: Props) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-50 bg-[#FAF7F8] flex flex-col justify-between p-6 sm:p-12 md:p-16 transition-all duration-700 ease-in-out ${
        visible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-105 pointer-events-none'
      }`}
    >
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-pink-200/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white font-serif font-bold text-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
            W
          </div>
          <span className="font-serif font-bold text-rose-950 tracking-wider text-sm">ELEMENTAL W</span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-100/80 px-4 py-1.5 rounded-full border border-rose-200/70">
          Ciencias Básicas • {site.year} • {site.draftLabel}
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center space-y-8 px-4">
        <div className="inline-flex items-center gap-2 text-rose-700 text-xs sm:text-sm font-semibold tracking-widest uppercase bg-white/80 px-4 py-1.5 rounded-full border border-rose-200/60 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          Plataforma de enseñanza e investigación
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-rose-950 tracking-tight leading-none">
          Elemental{' '}
          <span className="italic font-normal bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400 bg-clip-text text-transparent">
            W
          </span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-rose-900/80 max-w-2xl mx-auto font-light leading-relaxed">
          {site.heroTagline}
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-rose-950 hover:bg-rose-900 text-white font-bold text-base shadow-xl shadow-rose-950/20 hover:shadow-rose-950/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
          >
            <span>Explorar Proyecto</span>
            <ArrowDown className="w-4 h-4 text-rose-300 group-hover:translate-y-1 transition-transform" />
          </button>

          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-rose-50 text-rose-950 font-bold text-base border border-rose-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-rose-600" />
            <span>{site.urlLabel}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-7xl w-full mx-auto gap-4 text-xs font-medium text-rose-800/60 border-t border-rose-200/60 pt-6">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><Atom className="w-3.5 h-3.5 text-rose-500" /> Química</span>
          <span className="flex items-center gap-1.5"><TestTube2 className="w-3.5 h-3.5 text-rose-500" /> Física</span>
          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-rose-500" /> Matemáticas</span>
        </div>
        <div>
          Haz clic en <strong className="text-rose-950 font-bold">Explorar Proyecto</strong> para entrar
        </div>
      </div>
    </div>
  );
}
