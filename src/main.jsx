import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Inicia el backend simulado (MSW) ANTES de mostrar la app,
// para que las primeras peticiones ya sean interceptadas.
// Como este proyecto no tiene un backend real, el mock también se usa en GitHub Pages.
async function habilitarMock() {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'bypass', // las peticiones que no son de la API (fuentes, imágenes) pasan normal
  });
}

habilitarMock().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});