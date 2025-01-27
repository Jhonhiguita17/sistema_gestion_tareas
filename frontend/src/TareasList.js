// frontend/src/components/TareasList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TareasList = () => {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Función para obtener las tareas del backend
  const fetchTareas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tareas");
      setTareas(response.data);
    } catch (error) {
      console.error("Error al obtener tareas", error);
    }
  };

  // Función para agregar una nueva tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaTarea = { titulo, descripcion, completada: false };
    try {
      await axios.post("http://localhost:5000/api/tareas", nuevaTarea);
      setTitulo("");
      setDescripcion("");
      fetchTareas(); // Actualiza la lista de tareas después de agregar una nueva
    } catch (error) {
      console.error("Error al agregar tarea", error);
    }
  };

  // Función para marcar una tarea como completada o pendiente
  const completarTarea = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/tareas/completar/${id}`);
      fetchTareas();  // Actualiza la lista después de marcar como completada
    } catch (error) {
      console.error("Error al completar tarea", error);
    }
  };

  // Cargar las tareas cuando el componente se monta
  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div>
      {/* Formulario para agregar tareas */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción de la tarea"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <button type="submit">Agregar Tarea</button>
      </form>

      {/* Lista de tareas */}
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea._id} style={{ marginBottom: '10px' }}>
            <h3>{tarea.titulo}</h3>
            <p>{tarea.descripcion}</p>
            <p>{tarea.completada ? "Completada" : "Pendiente"}</p>

            {/* Botón para marcar como completada */}
            <button onClick={() => completarTarea(tarea._id)}>
              {tarea.completada ? "Desmarcar" : "Marcar como completada"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TareasList;
