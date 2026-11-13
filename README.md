# 📚 Librería Entre Páginas

Tienda de libros desarrollada en **React** donde los usuarios exploran categorías (Ficción, Ciencia Ficción, Fantasía, Misterio, Drama) y sus libros. Los datos **no están escritos en los componentes**: se obtienen desde una **API REST simulada (mock) con MSW**.

## Funcionalidades

- **Inicio:** lista de categorías obtenida desde `GET /api/categorias`, con la cantidad de libros de cada una.
- **Libros por categoría:** `/categorias/:categoriaId` consume `GET /api/categorias/:id/libros`.
- **Detalle del libro:** `/libros/:libroId` consume `GET /api/libros/:id`.
- **Cómo funciona:** explica los endpoints y el flujo de una petición.
- **Indicador de carga** en cada petición: esqueletos de tarjetas en las listas y spinner en el detalle (el mock simula un retraso).
- **Manejo de errores** (404, 500 y caída de conexión): mensaje claro con el error y **alternativas** para el usuario: *Reintentar*, *Volver al inicio* y sugerencias de categorías existentes.
- **Consultas optimizadas:** caché, peticiones sin duplicar y reutilización de datos (ver abajo).
- **Estado vacío:** la categoría *Drama* no tiene libros, para mostrar cómo se ve la pantalla sin resultados.

## Tecnologías

- React + **Vite**
- **React Router** (`react-router`): layout con `Outlet`, rutas dinámicas con `useParams`, `NavLink`, `useNavigate`, ruta 404 y lazy loading con `Suspense`.
- **MSW (Mock Service Worker)**: simula el backend REST interceptando las peticiones del navegador (`http.get`, `HttpResponse`, `delay`).
- **fetch** centralizado en `services/api.js` con caché en memoria y deduplicación de peticiones.
- **Tailwind CSS** con tema propio (colores, tipografías y sombras) y clases reutilizables con `@apply`.

## API REST simulada

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/categorias` | Lista de categorías con `cantidadLibros` |
| GET | `/api/categorias/:id/libros` | `{ categoria, libros }` · **404** si la categoría no existe |
| GET | `/api/libros/:id` | Detalle del libro con su categoría · **404** si no existe |
| GET | `/api/simular-error/:tipo` | Solo para pruebas: **500** (`/500`) o caída de conexión (`/red`) |

## Optimización de consultas

- **Caché en memoria (5 minutos):** al volver a una página ya visitada los datos aparecen al instante, sin indicador de carga ni nueva petición.
- **Sin peticiones duplicadas:** si la misma ruta se pide dos veces al mismo tiempo (por ejemplo, por `StrictMode`), se hace una sola petición.
- **Reutilización de datos:** la respuesta de una categoría trae sus libros completos; abrir el detalle de uno no vuelve a llamar a la API.
- **Carga bajo demanda:** cada página se descarga con lazy loading y pide sus datos solo al abrirse o cuando cambia la URL.
- **Los errores no se guardan en caché**, así *Reintentar* siempre vuelve a consultar al servidor.

## Estructura

```
src/
├── mocks/        → datos (base de datos simulada), handlers (endpoints REST) y browser (worker de MSW)
├── services/     → api.js: rutas de la API, fetch, caché, deduplicación y manejo de errores HTTP
├── hooks/        → useApi: estados de carga, error y datos + reintento
├── components/   → Cargando, TarjetasCargando, MensajeError, SugerenciaCategorias, ProbadorErrores,
│                   EstadoVacio, TarjetaCategoria, TarjetaLibro
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
| Abrir el inicio | Aparecen tarjetas de carga (esqueletos) y luego las 5 categorías |
| Clic en "Ciencia Ficción" | Se cargan sus 3 libros desde la API |
| Clic en "Drama" | Mensaje "No hay libros disponibles" (respuesta vacía) |
| Clic en un libro | Abre su detalle con autor, año, sinopsis y precio |
| Abrir el inicio, entrar a una categoría y volver | Las categorías aparecen al instante (caché), sin nueva petición en la consola |
| Abrir un libro desde su categoría | El detalle aparece al instante, sin nueva petición (datos reutilizados) |
| Abrir `/categorias/poesia` | La API responde 404: *La categoría "poesia" no existe.* con Reintentar, Volver al inicio y sugerencias de categorías |
| Abrir `/libros/999` | La API responde 404 y se muestra el mensaje de error |
| Abrir una ruta inexistente (ej. `/hola`) | Página no encontrada |
| En *Cómo funciona*, "Simular error 500 del servidor" | Mensaje *Error interno del servidor (500)...* con botón Reintentar |
| En *Cómo funciona*, "Simular caída de conexión" | Mensaje *No se pudo conectar con el servidor...* con botón Reintentar |
| Consola del navegador al navegar | Aparece `[MSW] Mocking enabled.` y cada `GET /api/...` **una sola vez**, con su estado (200, 404 o 500) |

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Se abre en http://localhost:3000. En la consola del navegador aparece `[MSW] Mocking enabled.`
