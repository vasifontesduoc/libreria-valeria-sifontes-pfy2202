import { Suspense } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import Cargando from '../components/Cargando';

const enlaces = [
    { to: '/', texto: 'Inicio' },
    { to: '/como-funciona', texto: 'Cómo funciona' },
];

// Estructura común: header con menú, contenido de la ruta actual y footer
function Layout() {
    const { pathname } = useLocation();

    const estiloEnlace = ({ isActive }) =>
        `px-4 py-2 rounded-full text-sm font-semibold transition ${isActive ? 'bg-white text-vino-oscuro' : 'text-white/85 hover:bg-white/15 hover:text-white'
        }`;

    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-gradient-to-br from-vino to-vino-oscuro text-white shadow-suave">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
                    <NavLink to="/" className="font-titulo text-2xl font-bold">
                        📚 Librería Entre Páginas
                    </NavLink>
                    <nav className="flex gap-1" aria-label="Menú principal">
                        {enlaces.map((enlace) => (
                            <NavLink key={enlace.to} to={enlace.to} end className={estiloEnlace}>
                                {enlace.texto}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
                {/* Mientras se descarga una página (lazy loading) */}
                <Suspense fallback={<Cargando />}>
                    {/* key reinicia la animación cada vez que cambia la página */}
                    <div key={pathname} className="animate-aparecer">
                        <Outlet />
                    </div>
                </Suspense>
            </main>

            <footer className="border-t border-borde py-6 text-center text-sm text-gris">
                Librería Entre Páginas · Datos servidos por una API REST simulada con MSW
            </footer>
        </div>
    );
}

export default Layout;