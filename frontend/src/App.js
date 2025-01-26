import React, { useState } from 'react';

function App() {
  // Estado para las tareas
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Función para agregar una tarea
  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  // Función para eliminar una tarea
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Gestión de Tareas</h1>
      
      {/* Input para agregar tareas */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Escribe una tarea"
      />
      <button onClick={addTask}>Agregar Tarea</button>

      {/* Lista de tareas */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
