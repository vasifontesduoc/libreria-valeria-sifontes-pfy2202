/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                papel: '#faf6ef',
                tinta: '#2b2118',
                gris: '#6f6359',
                borde: '#e8dfd2',
                vino: {
                    DEFAULT: '#7a2e3a',
                    oscuro: '#5a1f29',
                    claro: '#f6e7e9',
                },
                dorado: '#c08a2b',
            },
            fontFamily: {
                titulo: ['Lora', 'serif'],
                texto: ['"Nunito Sans"', 'sans-serif'],
            },
            boxShadow: {
                suave: '0 4px 20px rgba(43, 33, 24, 0.08)',
            },
            keyframes: {
                aparecer: {
                    from: { opacity: '0', transform: 'translateY(8px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                aparecer: 'aparecer 0.35s ease-out',
            },
        },
    },
    plugins: [],
};