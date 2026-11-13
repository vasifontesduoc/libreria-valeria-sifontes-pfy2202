// "Esqueleto" de tarjetas mientras llega la respuesta de la API.
// Mantiene la forma de la página para que la carga se sienta fluida.
function TarjetasCargando({ cantidad = 3 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite">
      {Array.from({ length: cantidad }, (_, i) => (
        <div key={i} className="panel animate-pulse space-y-3">
          <div className="h-10 w-10 rounded-full bg-borde" />
          <div className="h-5 w-2/3 rounded bg-borde" />
          <div className="h-4 w-full rounded bg-borde" />
          <div className="h-4 w-1/2 rounded bg-borde" />
        </div>
      ))}
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

export default TarjetasCargando;
