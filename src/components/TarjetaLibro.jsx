import { Link } from 'react-router';
import { formatearPrecio } from '../utils/formato';

function TarjetaLibro({ libro }) {
    return (
        <Link
            to={`/libros/${libro.id}`}
            className="panel flex flex-col gap-2 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-vino-claro"
        >
            <h3 className="text-lg font-bold leading-snug text-vino-oscuro">{libro.titulo}</h3>
            <p className="text-sm text-gris">
                {libro.autor} · {libro.anio}
            </p>
            <p className="mt-auto pt-2 text-xl font-bold text-dorado">{formatearPrecio(libro.precio)}</p>
        </Link>
    );
}

export default TarjetaLibro;