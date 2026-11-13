import { useApi } from '../hooks/useApi';
import { obtenerCategorias } from '../services/api';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import EstadoVacio from '../components/EstadoVacio';
import TarjetaCategoria from '../components/TarjetaCategoria';

function Inicio() {
    // GET /api/categorias
    const { datos: categorias, cargando, error, reintentar } = useApi(obtenerCategorias);

    return (
        <section>
            <div className="mb-10 rounded-3xl bg-vino-claro px-6 py-10 text-center sm:px-10">
                <h1 className="titulo-pagina mb-3">Encuentra tu próxima lectura</h1>
                <p className="mx-auto max-w-2xl text-lg text-gris">
                    Explora nuestras categorías y descubre los libros disponibles en cada una.
                </p>
            </div>

            <h2 className="mb-5 text-2xl font-bold text-vino-oscuro">Categorías</h2>

            {cargando && <Cargando texto="Cargando categorías..." />}

            {!cargando && error && <MensajeError mensaje={error} onReintentar={reintentar} />}

            {!cargando && !error && categorias?.length === 0 && (
                <EstadoVacio titulo="Aún no hay categorías" mensaje="Vuelve a visitarnos pronto." />
            )}

            {!cargando && !error && categorias?.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categorias.map((categoria) => (
                        <TarjetaCategoria key={categoria.id} categoria={categoria} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Inicio;