import { CheckCircle2, ExternalLink, Globe, GraduationCap, Sparkles } from 'lucide-react';
import { site } from '../data/site';
import { asset } from '../utils';

export default function About() {
  const { about } = site;
  return (
    <section id="about" className="scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {about.badge}
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-rose-950 leading-tight">
            Enseñar y entender cómo aprenden las <span className="italic text-rose-600">Ciencias Básicas</span>
          </h2>

          <p className="text-base sm:text-lg text-rose-900/80 leading-relaxed">{about.paragraphs[0]}</p>
          <p className="text-sm sm:text-base text-rose-800/70 leading-relaxed">{about.paragraphs[1]}</p>

          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-rose-950 hover:bg-rose-900 text-white font-bold text-sm shadow-md transition-all group"
          >
            <Globe className="w-4 h-4 text-rose-300" />
            <span>Ir al sitio oficial: {site.urlLabel}</span>
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-white to-rose-50/60 p-8 rounded-3xl border border-rose-200/80 shadow-sm space-y-6">
            <div className="rounded-2xl overflow-hidden border border-rose-100 bg-rose-50 max-h-64">
              <img
                src={asset('app-preview.png')}
                alt="Vista previa de la aplicación Elemental W"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-rose-950">{about.purposeTitle}</h3>
            <p className="text-xs sm:text-sm text-rose-800/80 leading-relaxed">{about.purposeText}</p>

            <div className="border-t border-rose-200/60 pt-4 space-y-3">
              {about.purposePoints.map((p) => (
                <div key={p.label} className="flex items-center justify-between text-xs font-semibold text-rose-950">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" /> {p.label}
                  </span>
                  <span className="text-rose-600 font-bold">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
