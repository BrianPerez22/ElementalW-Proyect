import type { Research } from '../../types';
import { investigacion1 } from './investigacion-1';
import { investigacion2 } from './investigacion-2';

/**
 * REGISTRO DE INVESTIGACIONES
 * Para agregar una nueva:
 *   1. Copia investigacion-2.ts como investigacion-3.ts y cambia su contenido.
 *   2. (Opcional) Pon su póster en public/investigacion-3/ (poster.pdf + poster.png).
 *   3. Impórtala aquí y añádela a la lista. Aparecerá sola en tarjetas, contador y modal.
 */
export const investigaciones: Research[] = [investigacion1, investigacion2];
