import { createRoot } from 'react-dom/client';
import Presentacion from './Presentacion';
import { contenido } from './contenido';

createRoot(document.getElementById('root')!).render(<Presentacion contenido={contenido} />);
