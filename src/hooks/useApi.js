import { useCallback, useEffect, useState } from 'react';
import { leerCache, obtener } from '../services/api';

// Hook reutilizable para consumir la API.
// Devuelve datos, cargando, error y una función para reintentar.
// Si los datos ya están en caché se muestran al instante, sin indicador de carga.
export function useApi(ruta) {
  const [respuesta, setRespuesta] = useState({ ruta: null, datos: null, error: null });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    if (leerCache(ruta)) return; // ya tenemos los datos: no se hace ninguna petición

    let vigente = true; // evita mostrar una respuesta vieja si el usuario ya cambió de página
    obtener(ruta)
      .then((datos) => vigente && setRespuesta({ ruta, datos, error: null }))
      .catch((error) => vigente && setRespuesta({ ruta, datos: null, error: error.message }));

    return () => {
      vigente = false;
    };
  }, [ruta, intento]);

  const reintentar = useCallback(() => {
    setRespuesta({ ruta: null, datos: null, error: null }); // vuelve a mostrar el indicador de carga
    setIntento((n) => n + 1);
  }, []);

  // Los datos pueden venir de la caché o de la última respuesta de ESTA ruta
  const enCache = leerCache(ruta);
  const esDeEstaRuta = respuesta.ruta === ruta;
  const datos = enCache ?? (esDeEstaRuta ? respuesta.datos : null);
  const error = !enCache && esDeEstaRuta ? respuesta.error : null;
  const cargando = !datos && !error;

  return { datos, cargando, error, reintentar };
}
