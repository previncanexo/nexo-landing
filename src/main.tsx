
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './app/App.tsx';
import './styles/index.css';

// SSG single-page: vite-react-ssg renderiza <App /> a HTML en el build y luego
// hidrata en el cliente. El contenido sale ya en el HTML → carga instantánea.
export const createRoot = ViteReactSSG(<App />);
  