import type { CSSProperties } from 'react';

type Shape = 'atom' | 'benzene' | 'flask' | 'molecule' | 'tube';
type Glyph = { text: string } | { shape: Shape };

const TEXTS = [
  '∑', 'π', '∫', '√', 'Δ', '∞', '≈', '±', 'x²', 'H₂O', 'CO₂', 'NaCl',
  'E = mc²', 'pH', 'e⁻', 'λ', 'θ', 'F = ma', '∂', 'NH₃', 'CH₄', 'α', 'Ω', 'n!',
];
const SHAPES: Shape[] = ['atom', 'atom', 'benzene', 'benzene', 'flask', 'flask', 'molecule', 'molecule', 'tube'];
const COLORS = ['#e11d48', '#f43f5e', '#ec4899', '#be123c'];
const COLS = 6;
const ROWS = 6;

// Generador pseudoaleatorio con semilla: la disposición es siempre la misma (sin saltos al re-renderizar).
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Item {
  glyph: Glyph;
  left: number;
  top: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
  r0: number;
  r1: number;
  spin: number;
}

const rnd = mulberry32(2026);
const glyphs: Glyph[] = [...TEXTS.map((text) => ({ text })), ...SHAPES.map((shape) => ({ shape }))];
for (let i = glyphs.length - 1; i > 0; i--) {
  const j = Math.floor(rnd() * (i + 1));
  [glyphs[i], glyphs[j]] = [glyphs[j], glyphs[i]];
}

const clamp = (n: number) => Math.min(Math.max(n, 2), 94);

const ITEMS: Item[] = glyphs.slice(0, COLS * ROWS).map((glyph, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const isText = 'text' in glyph;
  return {
    glyph,
    left: clamp(((col + 0.5) / COLS) * 100 + (rnd() - 0.5) * 10),
    top: clamp(((row + 0.5) / ROWS) * 100 + (rnd() - 0.5) * 10),
    size: isText ? 26 + rnd() * 30 : 44 + rnd() * 40,
    color: COLORS[Math.floor(rnd() * COLORS.length)],
    opacity: 0.07 + rnd() * 0.08,
    duration: 20 + rnd() * 20,
    delay: rnd() * 30,
    dx: (rnd() - 0.5) * 50,
    dy: -(14 + rnd() * 26),
    r0: (rnd() - 0.5) * 20,
    r1: (rnd() - 0.5) * 30,
    spin: 50 + rnd() * 50,
  };
});

function ShapeSvg({ shape, size, spin }: { shape: Shape; size: number; spin: number }) {
  const spins = shape === 'atom' || shape === 'benzene' || shape === 'molecule';
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={spins ? { animation: `sci-spin ${spin}s linear infinite` } : undefined}
    >
      {shape === 'atom' && (
        <>
          <ellipse cx="32" cy="32" rx="27" ry="10" />
          <ellipse cx="32" cy="32" rx="27" ry="10" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="27" ry="10" transform="rotate(120 32 32)" />
          <circle cx="32" cy="32" r="3.5" fill="currentColor" />
        </>
      )}
      {shape === 'benzene' && (
        <>
          <polygon points="32,6 54.5,19 54.5,45 32,58 9.5,45 9.5,19" />
          <circle cx="32" cy="32" r="12" />
        </>
      )}
      {shape === 'flask' && (
        <>
          <path d="M25 6 H39 M28 6 V24 L10 54 Q8 58 12 58 H52 Q56 58 54 54 L36 24 V6" />
          <path d="M18 42 H46" />
        </>
      )}
      {shape === 'molecule' && (
        <>
          <path d="M16 40 L44 18 M16 40 L50 48" />
          <circle cx="16" cy="40" r="8" fill="#faf7f8" />
          <circle cx="44" cy="18" r="6" fill="#faf7f8" />
          <circle cx="50" cy="48" r="5" fill="#faf7f8" />
        </>
      )}
      {shape === 'tube' && (
        <>
          <path d="M22 8 H42 M26 8 V46 A6 6 0 0 0 38 46 V8" />
          <path d="M26 30 H38" />
        </>
      )}
    </svg>
  );
}

/** Símbolos de matemáticas y química que flotan muy tenues detrás del contenido. */
export default function ScienceBackground({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {ITEMS.map((it, i) => {
        const style = {
          left: `${it.left}%`,
          top: `${it.top}%`,
          fontSize: it.size,
          color: it.color,
          opacity: it.opacity,
          animationDuration: `${it.duration}s`,
          animationDelay: `-${it.delay}s`,
          '--dx': `${it.dx}px`,
          '--dy': `${it.dy}px`,
          '--r0': `${it.r0}deg`,
          '--r1': `${it.r1}deg`,
        } as CSSProperties;
        return (
          <span key={i} className="sci-item font-serif italic leading-none select-none" style={style}>
            {'text' in it.glyph ? it.glyph.text : <ShapeSvg shape={it.glyph.shape} size={it.size} spin={it.spin} />}
          </span>
        );
      })}
    </div>
  );
}
