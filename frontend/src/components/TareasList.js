// frontend/src/components/TareasList.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const TareasList = () => {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");

  // Función para obtener todas las tareas desde el backend
  const fetchTareas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tareas");
      setTareas(response.data);  // Actualizar las tareas con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  // Función para agregar una nueva tarea
  const agregarTarea = async (e) => {
    e.preventDefault(); // Evitar la recarga de la página

    if (!titulo || !descripcion || !fecha) {
      alert("Por favor complete todos los campos.");
      return;
    }

    const nuevaTarea = { titulo, descripcion, fecha };

    try {
      const response = await axios.post("http://localhost:5000/api/tareas", nuevaTarea);
      setTareas([...tareas, response.data]);  // Agregar la tarea a la lista de tareas
      setTitulo("");  // Limpiar el formulario
      setDescripcion("");
      setFecha("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  // Función para eliminar una tarea por ID
  const eliminarTarea = async (id) => {
    try {
      // Enviar una solicitud DELETE al backend
      await axios.delete(`http://localhost:5000/api/tareas/${id}`);
      
      // Actualizar la lista de tareas después de eliminar
      setTareas(tareas.filter(tarea => tarea._id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // Cargar tareas cuando el componente se monta
  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div>
      <h2>Lista de Tareas</h2>

      {/* Formulario para agregar una tarea */}
      <form onSubmit={agregarTarea}>
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
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <button type="submit">Agregar Tarea</button>
      </form>

      {/* Mostrar las tareas */}
      <ul>
        {tareas.length === 0 ? (
          <p>No hay tareas para mostrar.</p>
        ) : (
          tareas.map((tarea) => (
            <li key={tarea._id} style={{ marginBottom: "10px" }}>
              <h3>{tarea.titulo}</h3>
              <p>{tarea.descripcion}</p>
              <p>Fecha: {new Date(tarea.fecha).toLocaleDateString()}</p>
              <button onClick={() => eliminarTarea(tarea._id)}>Eliminar</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TareasList;
