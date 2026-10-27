import { Microscope } from 'lucide-react';
import { investigaciones } from '../data/investigaciones';
import ResearchCard from './ResearchCard';

export default function Investigaciones({ onOpen }: { onOpen: (id: string) => void }) {
  const completadas = investigaciones.filter((r) => r.status === 'completada').length;
  return (
    <section id="investigaciones" className="scroll-mt-32 border-t border-rose-200/60 pt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-600 text-white font-semibold text-xs tracking-wider uppercase mb-3">
            <Microscope className="w-3.5 h-3.5" />
            Investigaciones
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-rose-950">Investigaciones realizadas</h2>
          <p className="text-rose-800/70 text-sm mt-2 max-w-xl">
            Trabajos hechos con Elemental W. Selecciona una investigación para ver su detalle y su póster.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white px-6 py-3 rounded-2xl border border-rose-200 text-center shadow-sm">
            <span className="block font-serif font-extrabold text-rose-600 text-2xl">{investigaciones.length}</span>
            <span className="text-[10px] uppercase font-bold text-rose-950 tracking-wider">Investigaciones</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-rose-200 text-center shadow-sm">
            <span className="block font-serif font-extrabold text-rose-600 text-2xl">{completadas}</span>
            <span className="text-[10px] uppercase font-bold text-rose-950 tracking-wider">Completadas</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {investigaciones.map((r) => (
          <ResearchCard key={r.id} research={r} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
