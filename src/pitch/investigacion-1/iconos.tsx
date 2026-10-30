import type { ReactNode } from 'react';

/**
 * Iconos del pitch de la Investigación 1 (trazo de línea, un color por tono).
 * `tam` es el lado en px del lienzo cuadrado del icono. Se usan por nombre desde contenido.ts.
 */
export const ICONOS = {
  matraz: {
    tam: 40,
    cuerpo: (
      <>
          <path d="M15 4H25M16 4V16L8 30C7 32 8.5 36 12 36H28C31.5 36 33 32 32 30L24 16V4" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="14" cy="26" r="2" fill="#4ECDC4" opacity="0.6"/>
          <circle cx="22" cy="30" r="1.5" fill="#4ECDC4" opacity="0.4"/>
          <circle cx="18" cy="33" r="1" fill="#06D6A0" opacity="0.5"/>
          <line x1="10" y1="22" x2="30" y2="22" stroke="#4ECDC4" strokeWidth="1" opacity="0.25"/>
      </>
    ),
  },
  tendenciaBaja: {
    tam: 40,
    cuerpo: (
      <>
          <polyline points="4,10 14,18 22,12 36,28" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="28,28 36,28 36,20" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="4" y1="34" x2="36" y2="34" stroke="#FF6B6B" strokeWidth="1" opacity="0.25"/>
      </>
    ),
  },
  control: {
    tam: 40,
    cuerpo: (
      <>
          <rect x="4" y="13" width="32" height="18" rx="9" stroke="#FFB347" strokeWidth="1.8"/>
          <line x1="12" y1="22" x2="16" y2="22" stroke="#FFB347" strokeWidth="2" strokeLinecap="round"/>
          <line x1="14" y1="20" x2="14" y2="24" stroke="#FFB347" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="26" cy="20" r="1.5" fill="#FFB347"/>
          <circle cx="30" cy="23" r="1.5" fill="#FFB347" opacity="0.6"/>
          <circle cx="28" cy="25" r="1.5" fill="#FFB347" opacity="0.4"/>
      </>
    ),
  },
  microscopio: {
    tam: 40,
    cuerpo: (
      <>
          <circle cx="22" cy="12" r="6" stroke="#C77DFF" strokeWidth="1.8"/>
          <line x1="22" y1="18" x2="22" y2="30" stroke="#C77DFF" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="16" y1="30" x2="28" y2="30" stroke="#C77DFF" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="18" y1="34" x2="26" y2="34" stroke="#C77DFF" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="13" y1="16" x2="17" y2="10" stroke="#C77DFF" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="18" r="2.5" stroke="#C77DFF" strokeWidth="1.2" opacity="0.5"/>
      </>
    ),
  },
  balanza: {
    tam: 16,
    cuerpo: (
      <>
          <path d="M8 2V14M3 5L8 2L13 5M3 13H13" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 8L5 11L8 8" stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round"/><path d="M14 8L11 11L8 8" stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round"/>
      </>
    ),
  },
  etiqueta: {
    tam: 16,
    cuerpo: (
      <>
          <path d="M2 2H8L14 8L8 14L2 8V2Z" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="5" cy="5" r="1.2" fill="#4ECDC4"/>
      </>
    ),
  },
  vaso: {
    tam: 16,
    cuerpo: (
      <>
          <path d="M6 2H10M6.5 2V7L3 13H13L9.5 7V2" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="4" y1="10" x2="12" y2="10" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.4"/>
      </>
    ),
  },
  atomo: {
    tam: 16,
    cuerpo: (
      <>
          <ellipse cx="8" cy="8" rx="6" ry="2.5" stroke="#4ECDC4" strokeWidth="1.2"/><ellipse cx="8" cy="8" rx="6" ry="2.5" stroke="#4ECDC4" strokeWidth="1.2" transform="rotate(60 8 8)"/><ellipse cx="8" cy="8" rx="6" ry="2.5" stroke="#4ECDC4" strokeWidth="1.2" transform="rotate(120 8 8)"/><circle cx="8" cy="8" r="1.5" fill="#4ECDC4"/>
      </>
    ),
  },
  calculadora: {
    tam: 16,
    cuerpo: (
      <>
          <rect x="2" y="2" width="12" height="12" rx="2" stroke="#4ECDC4" strokeWidth="1.3"/><line x1="5" y1="8" x2="11" y2="8" stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round"/><line x1="8" y1="5" x2="8" y2="11" stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round"/>
      </>
    ),
  },
  check: {
    tam: 22,
    cuerpo: (
      <>
          <circle cx="11" cy="11" r="8" stroke="#4ECDC4" strokeWidth="1.5"/><path d="M7 11L10 14L15 9" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  },
  movil: {
    tam: 22,
    cuerpo: (
      <>
          <rect x="5" y="2" width="12" height="18" rx="2" stroke="#06D6A0" strokeWidth="1.5"/><line x1="8" y1="7" x2="14" y2="7" stroke="#06D6A0" strokeWidth="1.3" strokeLinecap="round"/><line x1="8" y1="10" x2="14" y2="10" stroke="#06D6A0" strokeWidth="1.3" strokeLinecap="round"/><line x1="8" y1="13" x2="12" y2="13" stroke="#06D6A0" strokeWidth="1.3" strokeLinecap="round"/><circle cx="11" cy="19" r="1" fill="#06D6A0" opacity="0.5"/>
      </>
    ),
  },
  panel: {
    tam: 22,
    cuerpo: (
      <>
          <rect x="2" y="4" width="18" height="14" rx="2" stroke="#FFB347" strokeWidth="1.5"/><line x1="2" y1="8" x2="20" y2="8" stroke="#FFB347" strokeWidth="1" opacity="0.4"/><rect x="5" y="11" width="3" height="4" rx="0.5" fill="#FFB347" opacity="0.5"/><rect x="10" y="9" width="3" height="6" rx="0.5" fill="#FFB347" opacity="0.7"/><rect x="15" y="10" width="3" height="5" rx="0.5" fill="#FFB347"/>
      </>
    ),
  },
  registro: {
    tam: 22,
    cuerpo: (
      <>
          <rect x="5" y="3" width="12" height="16" rx="2" stroke="#C77DFF" strokeWidth="1.5"/><path d="M8 7H14M8 10H14M8 13H11" stroke="#C77DFF" strokeWidth="1.2" strokeLinecap="round"/><path d="M14 15L16 17L20 12" stroke="#C77DFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  },
  identificar: {
    tam: 32,
    cuerpo: (
      <>
          <path d="M6 16L12 22L26 8" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="16" r="12" stroke="#4ECDC4" strokeWidth="1.2" opacity="0.3"/>
      </>
    ),
  },
  balancear: {
    tam: 32,
    cuerpo: (
      <>
          <path d="M16 4V28M4 16L10 22L16 16" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M28 16L22 22L16 16" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  },
  nombrar: {
    tam: 32,
    cuerpo: (
      <>
          <path d="M8 8H20L24 12V28H8V8Z" stroke="#FFB347" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 8V12H24" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="20" y2="17" stroke="#FFB347" strokeWidth="1.3" strokeLinecap="round"/><line x1="12" y1="21" x2="18" y2="21" stroke="#FFB347" strokeWidth="1.3" strokeLinecap="round"/>
      </>
    ),
  },
  calcular: {
    tam: 32,
    cuerpo: (
      <>
          <rect x="6" y="4" width="20" height="24" rx="3" stroke="#C77DFF" strokeWidth="1.8"/><line x1="10" y1="11" x2="22" y2="11" stroke="#C77DFF" strokeWidth="1.3" strokeLinecap="round"/><line x1="10" y1="15" x2="22" y2="15" stroke="#C77DFF" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/><line x1="10" y1="19" x2="16" y2="19" stroke="#C77DFF" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      </>
    ),
  },
  verificado: {
    tam: 28,
    cuerpo: (
      <>
          <circle cx="14" cy="14" r="10" stroke="#06D6A0" strokeWidth="1.5"/><path d="M9 14L12.5 17.5L19 11" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  },
  objetivo: {
    tam: 28,
    cuerpo: (
      <>
          <circle cx="14" cy="14" r="4" fill="#06D6A0" opacity="0.3"/><circle cx="14" cy="14" r="8" stroke="#06D6A0" strokeWidth="1.2" opacity="0.5"/><circle cx="14" cy="14" r="12" stroke="#06D6A0" strokeWidth="0.8" opacity="0.25"/><circle cx="14" cy="10" r="1.5" fill="#06D6A0"/>
      </>
    ),
  },
  voz: {
    tam: 28,
    cuerpo: (
      <>
          <rect x="6" y="4" width="10" height="16" rx="5" stroke="#06D6A0" strokeWidth="1.5"/><path d="M16 12C18.5 12 22 13.5 22 17V22H6V17" stroke="#06D6A0" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="12" r="3" fill="#06D6A0" opacity="0.2"/>
      </>
    ),
  },
  advertencia: {
    tam: 28,
    cuerpo: (
      <>
          <path d="M14 4L26 24H2L14 4Z" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="14" y1="11" x2="14" y2="17" stroke="#FFB347" strokeWidth="2" strokeLinecap="round"/><circle cx="14" cy="20.5" r="1.2" fill="#FFB347"/>
      </>
    ),
  },
  reloj: {
    tam: 28,
    cuerpo: (
      <>
          <circle cx="14" cy="14" r="10" stroke="#FFB347" strokeWidth="1.5"/><path d="M14 8V14L17 17" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  },
  tendenciaRoja: {
    tam: 28,
    cuerpo: (
      <>
          <polyline points="4,10 10,18 18,8 24,14" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="20,14 24,14 24,10" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
      </>
    ),
  },
  escudo: {
    tam: 22,
    cuerpo: (
      <>
          <path d="M11 3C11 3 5 5 5 11C5 14.3 7 17 11 19C15 17 17 14.3 17 11C17 5 11 3 11 3Z" stroke="#4ECDC4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="3" stroke="#4ECDC4" strokeWidth="1.2"/>
      </>
    ),
  },
  documentoLupa: {
    tam: 22,
    cuerpo: (
      <>
          <path d="M4 4H14L18 8V18H4V4Z" stroke="#06D6A0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4V8H18" stroke="#06D6A0" strokeWidth="1.3" strokeLinecap="round"/><path d="M7 11H15M7 14H12" stroke="#06D6A0" strokeWidth="1.2" strokeLinecap="round"/><path d="M17 17L20 20" stroke="#06D6A0" strokeWidth="1.4" strokeLinecap="round"/>
      </>
    ),
  },
  graficoBarras: {
    tam: 22,
    cuerpo: (
      <>
          <rect x="3" y="3" width="16" height="16" rx="2" stroke="#C77DFF" strokeWidth="1.4"/><line x1="7" y1="7" x2="7" y2="15" stroke="#C77DFF" strokeWidth="1.2" strokeLinecap="round"/><line x1="11" y1="9" x2="11" y2="15" stroke="#C77DFF" strokeWidth="1.2" strokeLinecap="round"/><line x1="15" y1="5" x2="15" y2="15" stroke="#C77DFF" strokeWidth="1.2" strokeLinecap="round"/>
      </>
    ),
  },
  maletin: {
    tam: 22,
    cuerpo: (
      <>
          <rect x="2" y="6" width="18" height="12" rx="2" stroke="#FFB347" strokeWidth="1.4"/><path d="M7 6V4C7 3 8 2 11 2C14 2 15 3 15 4V6" stroke="#FFB347" strokeWidth="1.3" strokeLinecap="round"/><line x1="7" y1="12" x2="15" y2="12" stroke="#FFB347" strokeWidth="1.2" strokeLinecap="round"/><line x1="7" y1="15" x2="12" y2="15" stroke="#FFB347" strokeWidth="1.2" strokeLinecap="round"/>
      </>
    ),
  },
  estrella: {
    tam: 14,
    cuerpo: (
      <>
          <path d="M7 1L9 5H13L10 8L11 12L7 10L3 12L4 8L1 5H5L7 1Z" fill="#C77DFF" opacity="0.8"/>
      </>
    ),
  },
  aula: {
    tam: 20,
    cuerpo: (
      <>
          <rect x="3" y="4" width="14" height="12" rx="2" stroke="#4ECDC4" strokeWidth="1.4"/><path d="M7 8H13M7 11H11" stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round"/>
      </>
    ),
  },
  bloques: {
    tam: 20,
    cuerpo: (
      <>
          <rect x="2" y="8" width="8" height="10" rx="1.5" stroke="#C77DFF" strokeWidth="1.3"/><rect x="12" y="4" width="6" height="14" rx="1.5" stroke="#C77DFF" strokeWidth="1.3"/><rect x="6" y="11" width="8" height="7" rx="1.5" stroke="#C77DFF" strokeWidth="1.3"/>
      </>
    ),
  },
  estrellaContorno: {
    tam: 20,
    cuerpo: (
      <>
          <path d="M10 2L12.5 7H18L13.5 10.5L15.5 16L10 12.5L4.5 16L6.5 10.5L2 7H7.5L10 2Z" stroke="#06D6A0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  },
  usuarioMas: {
    tam: 20,
    cuerpo: (
      <>
          <circle cx="10" cy="6" r="3" stroke="#FFB347" strokeWidth="1.3"/><path d="M4 17C4 13.7 6.7 11 10 11C13.3 11 16 13.7 16 17" stroke="#FFB347" strokeWidth="1.3" strokeLinecap="round"/><line x1="14" y1="3" x2="17" y2="3" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round"/><line x1="15.5" y1="1.5" x2="15.5" y2="4.5" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  },
} satisfies Record<string, { tam: number; cuerpo: ReactNode }>;

export type NombreIcono = keyof typeof ICONOS;

export function Icono({ nombre }: { nombre: NombreIcono }) {
  const { tam, cuerpo } = ICONOS[nombre];
  return (
    <svg
      width={tam}
      height={tam}
      viewBox={`0 0 ${tam} ${tam}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {cuerpo}
    </svg>
  );
}
