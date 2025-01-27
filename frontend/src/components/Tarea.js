// frontend/src/components/Tarea.js
import React, { useState } from 'react';
import axios from 'axios';

const Tarea = ({ tarea, onActualizarTarea }) => {
  const [completada, setCompletada] = useState(tarea.completada);

  // Función para marcar la tarea como completada
  const marcarCompletada = async () => {
    try {
      // Realiza una petición PATCH al backend para marcar la tarea como completada
      await axios.patch(`http://localhost:5000/api/tareas/completar/${tarea._id}`);
      
      // Cambiar el estado local de la tarea para reflejar que está completada
      setCompletada(true);
      
      // Llamar a la función que actualiza la lista de tareas (recargar las tareas)
      onActualizarTarea();
    } catch (error) {
      console.error('Error al marcar la tarea como completada:', error);
    }
  };

  return (
    <div className={`tarea ${completada ? 'completada' : ''}`}>
      <h3>{tarea.titulo}</h3>
      <p>{tarea.descripcion}</p>
      <p>Fecha: {new Date(tarea.fecha).toLocaleDateString()}</p>
      
      {/* Botón para marcar la tarea como completada */}
      <button onClick={marcarCompletada} disabled={completada}>
        {completada ? 'Completada' : 'Marcar como completada'}
      </button>
    </div>
  );
};

export default Tarea;
