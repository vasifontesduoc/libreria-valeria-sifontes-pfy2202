import { Link, useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import { obtenerLibrosPorCategoria } from '../services/api';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import EstadoVacio from '../components/EstadoVacio';
import TarjetaLibro from '../components/TarjetaLibro';

function CategoriaLibros() {
    const { categoriaId } = useParams(); // lee :categoriaId de la URL

    // GET /api/categorias/:categoriaId/libros (se vuelve a pedir si cambia la categoría)
    const { datos, cargando, error, reintentar } = useApi(
        (opciones) => obtenerLibrosPorCategoria(categoriaId, opciones),
        [categoriaId]
    );

    if (cargando) return <Cargando texto="Cargando libros..." />;
    if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />;

    const { categoria, libros } = datos;

    return (
        <section>
            <nav className="mb-4 text-sm text-gris" aria-label="Ruta de navegación">
                <Link to="/" className="hover:text-vino hover:underline">
                    Inicio
                </Link>
                <span className="mx-2">/</span>
                <span className="font-semibold text-tinta">{categoria.nombre}</span>
            </nav>

            <div className="mb-8">
                <h1 className="titulo-pagina mb-2">
                    {categoria.icono} {categoria.nombre}
                </h1>
                <p className="text-gris">{categoria.descripcion}</p>
            </div>

            {libros.length === 0 ? (
                <EstadoVacio
                    icono="📚"
                    titulo="No hay libros disponibles"
                    mensaje={`Por ahora no tenemos libros en la categoría ${categoria.nombre}.`}
                >
                    <Link to="/" className="btn btn-primario">
                        Ver otras categorías
                    </Link>
                </EstadoVacio>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {libros.map((libro) => (
                        <TarjetaLibro key={libro.id} libro={libro} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default CategoriaLibros;