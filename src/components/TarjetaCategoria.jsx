import { Link } from 'react-router';

function TarjetaCategoria({ categoria }) {
    const { id, nombre, icono, descripcion, cantidadLibros } = categoria;

    return (
        <Link
            to={`/categorias/${id}`}
            className="panel group flex flex-col gap-3 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-vino-claro"
        >
            <span className="text-5xl">{icono}</span>
            <h3 className="text-xl font-bold text-vino-oscuro group-hover:text-vino">{nombre}</h3>
            <p className="flex-1 text-sm text-gris">{descripcion}</p>
            <span className="etiqueta self-start">
                {cantidadLibros === 1 ? '1 libro' : `${cantidadLibros} libros`}
            </span>
        </Link>
    );
}

export default TarjetaCategoria;