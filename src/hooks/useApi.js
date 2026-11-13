import { useCallback, useEffect, useState } from 'react';

// Hook reutilizable para consumir la API
export function useApi(peticion, dependencias = []) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        const controlador = new AbortController();
        setCargando(true);
        setError(null);

        peticion({ signal: controlador.signal })
            .then((resultado) => {
                if (!controlador.signal.aborted) setDatos(resultado);
            })
            .catch((err) => {
                if (!controlador.signal.aborted) setError(err.message);
            })
            .finally(() => {
                if (!controlador.signal.aborted) setCargando(false);
            });

        // Limpieza: cancela la petición anterior al salir o al cambiar de categoría
        return () => controlador.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencias, intento]);

    // Vuelve a ejecutar la petición (botón "Reintentar")
    const reintentar = useCallback(() => setIntento((n) => n + 1), []);

    return { datos, cargando, error, reintentar };
}