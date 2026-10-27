interface Props {
  /** "normal": de frente con un ojo. "feliz": inclinada, con brazos arriba. */
  variant?: 'normal' | 'feliz';
  /** Espejo horizontal, para no repetir siempre la misma pose */
  flip?: boolean;
  /** Flotación suave */
  animate?: boolean;
  /** Tamaño y posición: se aplican al contenedor (p. ej. "w-24") */
  className?: string;
  /** Si se pasa, la imagen se anuncia a lectores de pantalla; si no, es decorativa */
  title?: string;
}

// Colores originales de la mascota
const PLUM = '#5d3140';
const PINK = '#cf4173';
const RING = '#f4939a';
const CREAM = '#f5f2f7';
const STROKE = 19;

/**
 * Chispa, la mascota de Elemental W.
 * Los SVG originales usan clases (.cls-1, .cls-2…) con significados distintos en cada archivo;
 * al incrustar los dos en la misma página se pisaban los colores. Aquí van con atributos propios.
 */
export default function Chispa({ variant = 'normal', flip = false, animate = false, className = '', title }: Props) {
  return (
    <span className={`inline-block ${animate ? 'chispa-float' : ''} ${className}`}>
      <svg
        viewBox="0 0 396.48 359.77"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-auto"
        style={flip ? { transform: 'scaleX(-1)' } : undefined}
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
      >
        {variant === 'normal' ? (
          <>
            <ellipse
              cx="193.84"
              cy="162.84"
              rx="158.86"
              ry="61.1"
              transform="translate(-40.83 67.87) rotate(-18)"
              fill="none"
              stroke={RING}
              strokeWidth={STROKE}
              strokeMiterlimit={4}
            />
            <path
              d="M193.84,46.75c18.33,0,30.55,12.22,36.66,30.55l61.1,134.42c12.22,24.44-6.11,48.88-33.6,48.88h-128.31c-27.49,0-45.82-24.44-33.6-48.88l61.1-134.42c6.11-18.33,18.33-30.55,36.66-30.55Z"
              fill={PINK}
              stroke={PLUM}
              strokeWidth={STROKE}
            />
            <circle cx="212.17" cy="162.84" r="21.38" fill={PLUM} />
            <circle cx="219.81" cy="155.2" r="6.11" fill={CREAM} />
            <path
              d="M151.07,254.49l-24.44,30.55M242.72,254.49l24.44,30.55"
              fill="none"
              stroke={PLUM}
              strokeWidth={STROKE}
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <ellipse
              cx="189.13"
              cy="172.22"
              rx="171.1"
              ry="65.81"
              transform="translate(-65.53 196.26) rotate(-47.71)"
              fill="none"
              stroke={RING}
              strokeWidth={STROKE}
              strokeMiterlimit={4}
            />
            <path
              d="M126.58,63.96c17.09-9.89,35.07-5.08,50.65,8.71l129.46,92.37c24.57,16.19,20.66,48.87-4.97,63.69l-119.62,69.2c-25.63,14.83-55.9,1.93-57.69-27.45l-15.53-158.27c-4.19-20.38.61-38.37,17.7-48.25Z"
              fill={PINK}
              stroke={PLUM}
              strokeWidth={STROKE}
            />
            <path
              d="M198.05,280.78l-6.55,41.62M283.79,231.85l39.17,15.53"
              fill="none"
              stroke={PLUM}
              strokeWidth={STROKE}
              strokeLinecap="round"
            />
            <path
              d="M200.05,179.35c-6.35-11.13-4.14-24.36,4.94-29.54,9.08-5.18,21.6-.36,27.95,10.77"
              fill="none"
              stroke={PLUM}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeMiterlimit={10}
            />
            <path
              d="M113.18,199.86l-54.13-8.13M253.16,119.97l20.53-50.74"
              fill="none"
              stroke={PLUM}
              strokeWidth={STROKE}
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </span>
  );
}
