import ProbadorErrores from '../components/ProbadorErrores';

const endpoints = [
  { metodo: 'GET', ruta: '/api/categorias', descripcion: 'Lista todas las categorías con su cantidad de libros.' },
  { metodo: 'GET', ruta: '/api/categorias/:id/libros', descripcion: 'Devuelve la categoría y sus libros. Responde 404 si no existe.' },
  { metodo: 'GET', ruta: '/api/libros/:id', descripcion: 'Devuelve el detalle de un libro. Responde 404 si no existe.' },
  { metodo: 'GET', ruta: '/api/simular-error/:tipo', descripcion: 'Solo para pruebas: responde 500 o simula una caída de conexión.' },
];

const optimizaciones = [
  'Caché en memoria (5 minutos): si vuelves a una página ya visitada, los datos aparecen al instante y no se llama de nuevo a la API.',
  'Peticiones no duplicadas: si dos componentes piden lo mismo al mismo tiempo, se hace una sola petición y ambos usan la respuesta.',
  'Datos reutilizados: la respuesta de una categoría ya trae sus libros completos, así que abrir el detalle de uno no hace otra petición.',
  'Carga solo cuando hace falta: cada página pide sus datos recién al abrirse (lazy loading) y solo vuelve a pedirlos si cambia la URL.',
];

function ComoFunciona() {
  return (
    <section className="max-w-3xl">
      <h1 className="titulo-pagina mb-4">Cómo funciona</h1>
      <p className="mb-8 text-lg text-gris">
        Esta tienda no tiene los libros escritos dentro de sus componentes: los pide a una
        <strong className="text-tinta"> API REST</strong>. Como todavía no existe un backend real,
        la API se simula con <strong className="text-tinta">MSW (Mock Service Worker)</strong>, que
        intercepta las peticiones del navegador y responde con datos de prueba.
      </p>

      <h2 className="mb-3 text-2xl font-bold text-vino-oscuro">Endpoints disponibles</h2>
      <div className="mb-10 overflow-x-auto rounded-2xl bg-white shadow-suave">
        <table className="w-full text-left">
          <thead className="bg-vino-claro text-sm uppercase text-vino-oscuro">
            <tr>
              <th className="px-5 py-3">Método</th>
              <th className="px-5 py-3">Ruta</th>
              <th className="px-5 py-3">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((e) => (
              <tr key={e.ruta} className="border-t border-borde">
                <td className="px-5 py-3">
                  <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800">{e.metodo}</span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-mono text-sm">{e.ruta}</td>
                <td className="px-5 py-3 text-gris">{e.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-3 text-2xl font-bold text-vino-oscuro">Flujo de una petición</h2>
      <ol className="mb-10 list-decimal space-y-2 pl-6 text-gris">
        <li>La página usa el hook <code className="text-tinta">useApi</code>, que muestra un indicador de carga.</li>
        <li>El hook llama a <code className="text-tinta">services/api.js</code>, que revisa la caché y si hace falta hace el <code className="text-tinta">fetch</code>.</li>
        <li>MSW intercepta la petición y responde según <code className="text-tinta">mocks/handlers.js</code>, con un pequeño retraso.</li>
        <li>Si la respuesta es correcta se muestran los datos; si falla, aparece un mensaje claro con alternativas.</li>
      </ol>

      <h2 className="mb-3 text-2xl font-bold text-vino-oscuro">Optimización de consultas</h2>
      <ul className="mb-10 list-disc space-y-2 pl-6 text-gris">
        {optimizaciones.map((texto) => (
          <li key={texto}>{texto}</li>
        ))}
      </ul>

      <h2 className="mb-3 text-2xl font-bold text-vino-oscuro">Probar el manejo de errores</h2>
      <p className="mb-4 text-gris">
        Estos botones llaman a un endpoint que falla a propósito, para ver cómo responde la aplicación.
      </p>
      <ProbadorErrores />
    </section>
  );
}

export default ComoFunciona;
