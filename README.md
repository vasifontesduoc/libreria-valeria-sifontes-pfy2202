# 📚 Librería Entre Páginas

Tienda de libros desarrollada en **React** donde los usuarios exploran categorías (Ficción, Ciencia Ficción, Fantasía, Misterio, Drama) y sus libros. Los datos **no están escritos en los componentes**: se obtienen desde una **API REST simulada (mock) con MSW**.

## Funcionalidades

- **Inicio:** lista de categorías obtenida desde `GET /api/categorias`, con la cantidad de libros de cada una.
- **Libros por categoría:** `/categorias/:categoriaId` consume `GET /api/categorias/:id/libros`.
- **Detalle del libro:** `/libros/:libroId` consume `GET /api/libros/:id`.
- **Cómo funciona:** explica los endpoints y el flujo de una petición.
- **Indicador de carga** mientras la API responde (el mock simula un retraso).
- **Manejo de errores:** mensaje claro con el error del servidor y botón **Reintentar**.
- **Estado vacío:** la categoría *Drama* no tiene libros, para mostrar cómo se ve la pantalla sin resultados.

## Tecnologías

- React + **Vite**
- **React Router** (`react-router`): layout con `Outlet`, rutas dinámicas con `useParams`, `NavLink`, `useNavigate`, ruta 404 y lazy loading con `Suspense`.
- **MSW (Mock Service Worker)**: simula el backend REST interceptando las peticiones del navegador (`http.get`, `HttpResponse`, `delay`).
- **fetch** con `AbortController` para cancelar peticiones al cambiar de página.
- **Tailwind CSS** con tema propio (colores, tipografías y sombras) y clases reutilizables con `@apply`.

## API REST simulada

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/categorias` | Lista de categorías con `cantidadLibros` |
| GET | `/api/categorias/:id/libros` | `{ categoria, libros }` · **404** si la categoría no existe |
| GET | `/api/libros/:id` | Detalle del libro con su categoría · **404** si no existe |

## Estructura

```
src/
├── mocks/        → datos (base de datos simulada), handlers (endpoints REST) y browser (worker de MSW)
├── services/     → api.js: todas las llamadas fetch a la API y el manejo de errores HTTP
├── hooks/        → useApi: estados de carga, error y datos + reintento y cancelación
├── components/   → Cargando, MensajeError, EstadoVacio, TarjetaCategoria, TarjetaLibro
├── layouts/      → Layout (header, menú, Outlet y footer)
├── pages/        → Inicio, CategoriaLibros, DetalleLibro, ComoFunciona, NoEncontrado
├── routes/       → AppRoutes (todas las rutas)
└── utils/        → formato de precios
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio (categorías) |
| `/categorias/:categoriaId` | Libros de una categoría |
| `/libros/:libroId` | Detalle de un libro |
| `/como-funciona` | Explicación de la API |
| `*` | Página no encontrada |

## Revisión de recorridos

| Recorrido | Resultado esperado |
|---|---|
| Abrir el inicio | Aparece "Cargando categorías..." y luego las 5 categorías |
| Clic en "Ciencia Ficción" | Se cargan sus 3 libros desde la API |
| Clic en "Drama" | Mensaje "No hay libros disponibles" (respuesta vacía) |
| Clic en un libro | Abre su detalle con autor, año, sinopsis y precio |
| Abrir `/categorias/poesia` | La API responde 404 y se muestra: *La categoría "poesia" no existe.* con botón Reintentar |
| Abrir `/libros/999` | La API responde 404 y se muestra el mensaje de error |
| Abrir una ruta inexistente (ej. `/hola`) | Página no encontrada |
| Consola del navegador al navegar | Aparece `[MSW] Mocking enabled.` y cada `GET /api/...` con su estado (200 OK o 404) |

> En modo desarrollo cada petición aparece dos veces en la consola: `StrictMode` monta los componentes dos veces y `useApi` cancela la primera con `AbortController`. En producción se hace una sola vez.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Se abre en http://localhost:3000. En la consola del navegador aparece `[MSW] Mocking enabled.`
