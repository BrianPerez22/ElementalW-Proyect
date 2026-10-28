import { createRoot } from 'react-dom/client';
import Pitch from '../motor/Pitch';
import { contenido } from './contenido';

createRoot(document.getElementById('root')!).render(<Pitch contenido={contenido} />);
