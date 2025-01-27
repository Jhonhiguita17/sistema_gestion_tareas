// backend/models/Tarea.js
const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  completada: { type: Boolean, default: false }, // Campo para marcar la tarea como completada
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tarea', tareaSchema);
