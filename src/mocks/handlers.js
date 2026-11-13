import { http, HttpResponse, delay } from 'msw';
import { categorias, libros } from './datos';

// Cada handler simula un endpoint REST del backend.
// delay() agrega una espera para que se vea el indicador de carga, como en un servidor real.
export const handlers = [
    // GET /api/categorias → lista de categorías con la cantidad de libros de cada una
    http.get('/api/categorias', async () => {
        await delay(800);

        const respuesta = categorias.map((categoria) => ({
            ...categoria,
            cantidadLibros: libros.filter((libro) => libro.categoriaId === categoria.id).length,
        }));

        return HttpResponse.json(respuesta);
    }),

    // GET /api/categorias/:id/libros → datos de la categoría y sus libros
    http.get('/api/categorias/:id/libros', async ({ params }) => {
        await delay(800);

        const categoria = categorias.find((c) => c.id === params.id);
        if (!categoria) {
            return HttpResponse.json(
                { mensaje: `La categoría "${params.id}" no existe.` },
                { status: 404 }
            );
        }

        const librosDeCategoria = libros.filter((libro) => libro.categoriaId === categoria.id);
        return HttpResponse.json({ categoria, libros: librosDeCategoria });
    }),

    // GET /api/libros/:id → detalle de un libro con su categoría
    http.get('/api/libros/:id', async ({ params }) => {
        await delay(600);

        const libro = libros.find((l) => String(l.id) === params.id);
        if (!libro) {
            return HttpResponse.json(
                { mensaje: `No existe un libro con id ${params.id}.` },
                { status: 404 }
            );
        }

        const categoria = categorias.find((c) => c.id === libro.categoriaId);
        return HttpResponse.json({ ...libro, categoria });
    }),
];