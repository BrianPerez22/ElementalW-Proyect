import { asset } from '../utils';

/** Marca de Elemental W (la misma imagen del favicon). Es decorativa: el nombre va al lado como texto. */
export default function Logo({ className = '' }: { className?: string }) {
  return <img src={asset('favicon.svg')} alt="" draggable={false} className={`select-none ${className}`} />;
}
