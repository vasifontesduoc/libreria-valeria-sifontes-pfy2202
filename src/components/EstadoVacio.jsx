// Mensaje para cuando la API responde bien, pero sin resultados
function EstadoVacio({ icono = '📭', titulo, mensaje, children }) {
    return (
        <div className="panel py-12 text-center">
            <p className="text-6xl mb-4">{icono}</p>
            <h2 className="text-2xl font-bold text-vino-oscuro mb-2">{titulo}</h2>
            {mensaje && <p className="text-gris mb-6">{mensaje}</p>}
            {children}
        </div>
    );
}

export default EstadoVacio;