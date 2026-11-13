import { useState } from 'react';
import { simularError } from '../services/api';
import Cargando from './Cargando';
import MensajeError from './MensajeError';

const pruebas = [
  { tipo: '500', texto: 'Simular error 500 del servidor' },
  { tipo: 'red', texto: 'Simular caída de conexión' },
];

// Permite ver en vivo cómo responde la app ante distintos errores
function ProbadorErrores() {
  const [prueba, setPrueba] = useState({ estado: 'inactivo', tipo: null, mensaje: '' });

  const probar = async (tipo) => {
    setPrueba({ estado: 'cargando', tipo, mensaje: '' });
    try {
      await simularError(tipo);
      setPrueba({ estado: 'inactivo', tipo: null, mensaje: '' });
    } catch (error) {
      setPrueba({ estado: 'error', tipo, mensaje: error.message });
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        {pruebas.map((p) => (
          <button
            key={p.tipo}
            type="button"
            onClick={() => probar(p.tipo)}
            disabled={prueba.estado === 'cargando'}
            className="btn btn-secundario disabled:opacity-50"
          >
            {p.texto}
          </button>
        ))}
      </div>

      {prueba.estado === 'cargando' && <Cargando texto="Consultando al servidor..." />}
      {prueba.estado === 'error' && (
        <MensajeError mensaje={prueba.mensaje} onReintentar={() => probar(prueba.tipo)} />
      )}
    </div>
  );
}

export default ProbadorErrores;
