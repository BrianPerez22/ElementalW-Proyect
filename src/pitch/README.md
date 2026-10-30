# Pitch

Presentaciones cortas (pitch) de cada investigación. Se abren desde un botón en la tarjeta de la
investigación y viven en su propia página HTML, separada del sitio.

```
motor/               Motor compartido: useMazo.ts (escena, URL, teclado, pantalla completa, escala), Pitch.tsx (aspecto del pitch 2), Escena.tsx
                     (una composición por tipo de escena), piezas.tsx, formato.tsx, movimiento.ts (resortes y variantes
                     de Framer Motion), pitch.css
recursos/            chispa/ (ilustraciones SVG) y fuentes/ (Inter y Ultra, locales)
investigacion-1/     Pitch oscuro de la Investigación 1: contenido.ts, Escenas.tsx, iconos.tsx, estilos.css, main.tsx
                     (usa motor/useMazo.ts para la navegación; fuentes en recursos/fuentes/fuentes-oscuro.css)
investigacion-2/     contenido.ts (textos, cifras, dirección visual) y main.tsx
```

Guía para editar y para agregar un pitch nuevo: ver la sección «Pitch» del README principal.
