import { Link } from 'react-router';

// Mensaje claro cuando la API responde con error, con opción de reintentar
function MensajeError({ mensaje, onReintentar }) {
    return (
        <div className="panel border-l-4 border-red-500 py-10 text-center" role="alert">
            <p className="text-5xl mb-3">⚠️</p>
            <h2 className="text-2xl font-bold text-tinta mb-2">No pudimos cargar la información</h2>
            <p className="text-gris mb-6">{mensaje}</p>
            <div className="flex flex-wrap justify-center gap-3">
                {onReintentar && (
                    <button type="button" onClick={onReintentar} className="btn btn-primario">
                        Reintentar
                    </button>
                )}
                <Link to="/" className="btn btn-secundario">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}

export default MensajeError;