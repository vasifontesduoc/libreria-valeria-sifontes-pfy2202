// Capa de servicios: todas las llamadas a la API REST están en este archivo.
const URL_BASE = '/api';

async function pedir(ruta, opciones = {}) {
    let respuesta;
    try {
        respuesta = await fetch(`${URL_BASE}${ruta}`, opciones);
    } catch (error) {
        if (error.name === 'AbortError') throw error; // petición cancelada: no es un error real
        throw new Error('No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.');
    }

    // Si el cuerpo no es JSON válido, se trata como respuesta vacía
    const datos = await respuesta.json().catch(() => null);

    if (!respuesta.ok) {
        throw new Error(datos?.mensaje ?? `El servidor respondió con un error (${respuesta.status}).`);
    }
    return datos;
}

export const obtenerCategorias = (opciones) => pedir('/categorias', opciones);

export const obtenerLibrosPorCategoria = (categoriaId, opciones) =>
    pedir(`/categorias/${encodeURIComponent(categoriaId)}/libros`, opciones);

export const obtenerLibro = (libroId, opciones) =>
    pedir(`/libros/${encodeURIComponent(libroId)}`, opciones);