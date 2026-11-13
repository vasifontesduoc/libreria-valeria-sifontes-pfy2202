import { Link } from 'react-router';
import EstadoVacio from '../components/EstadoVacio';

function NoEncontrado() {
    return (
        <section>
            <EstadoVacio icono="📕" titulo="Página no encontrada" mensaje="La dirección que buscas no existe.">
                <Link to="/" className="btn btn-primario">
                    Volver al inicio
                </Link>
            </EstadoVacio>
        </section>
    );
}

export default NoEncontrado;