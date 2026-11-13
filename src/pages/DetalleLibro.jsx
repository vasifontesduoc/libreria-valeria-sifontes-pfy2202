import { Link, useNavigate, useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import { obtenerLibro } from '../services/api';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import { formatearPrecio } from '../utils/formato';

function DetalleLibro() {
    const { libroId } = useParams();
    const navigate = useNavigate();

    // GET /api/libros/:libroId
    const { datos: libro, cargando, error, reintentar } = useApi(
        (opciones) => obtenerLibro(libroId, opciones),
        [libroId]
    );

    if (cargando) return <Cargando texto="Cargando libro..." />;
    if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />;

    return (
        <section className="max-w-2xl">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secundario mb-6">
                ← Volver
            </button>

            <article className="panel p-8">
                <Link to={`/categorias/${libro.categoria.id}`} className="etiqueta mb-4 hover:bg-vino hover:text-white">
                    {libro.categoria.icono} {libro.categoria.nombre}
                </Link>
                <h1 className="titulo-pagina mb-2">{libro.titulo}</h1>
                <p className="mb-6 text-lg text-gris">
                    {libro.autor} · {libro.anio}
                </p>
                <p className="mb-8 text-lg">{libro.sinopsis}</p>
                <p className="text-3xl font-bold text-dorado">{formatearPrecio(libro.precio)}</p>
            </article>
        </section>
    );
}

export default DetalleLibro;