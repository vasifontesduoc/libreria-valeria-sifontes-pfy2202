import { Link } from 'react-router';
import { useApi } from '../hooks/useApi';
import { rutas } from '../services/api';

// Alternativa cuando algo no se encuentra: muestra las categorías que sí existen.
// Normalmente las categorías ya están en caché, así que no se hace otra petición.
function SugerenciaCategorias() {
  const { datos: categorias } = useApi(rutas.categorias());

  if (!categorias?.length) return null;

  return (
    <div className="mt-8 border-t border-borde pt-6">
      <p className="mb-3 text-sm font-semibold text-tinta">Quizás te interese alguna de estas categorías:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {categorias.map((categoria) => (
          <Link
            key={categoria.id}
            to={`/categorias/${categoria.id}`}
            className="etiqueta hover:bg-vino hover:text-white"
          >
            {categoria.icono} {categoria.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SugerenciaCategorias;
