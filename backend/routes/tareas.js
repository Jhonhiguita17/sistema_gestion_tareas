// backend/routes/tareas.js

// Eliminar una tarea por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tareas = tareas.filter(tarea => tarea._id !== id); // Eliminar la tarea con el id correspondiente
  res.status(200).json({ message: `Tarea con id ${id} eliminada.` });
});
