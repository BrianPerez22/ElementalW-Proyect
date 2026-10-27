import { BookOpen, GraduationCap, Microscope } from 'lucide-react';
import type { ReactNode } from 'react';
import { site } from '../data/site';

const icons: Record<string, ReactNode> = {
  teacher: <GraduationCap className="w-5 h-5" />,
  student: <BookOpen className="w-5 h-5" />,
  research: <Microscope className="w-5 h-5" />,
};

export default function Pillars() {
  return (
    <section id="enfoque" className="scroll-mt-32 border-t border-rose-200/60 pt-20">
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Enfoque</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-rose-950 mt-2">
          Una herramienta para tres necesidades
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {site.pillars.map((p) => (
          <div
            key={p.title}
            className="bg-white p-8 rounded-3xl border border-rose-200/70 shadow-sm hover:border-rose-300 transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-6">
              {icons[p.icon]}
            </div>
            <h3 className="font-serif font-bold text-xl text-rose-950 mb-3">{p.title}</h3>
            <p className="text-xs sm:text-sm text-rose-800/70 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
