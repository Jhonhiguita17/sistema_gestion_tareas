// backend/server.js

const express = require("express");
const cors = require("cors");
const tareasRoutes = require("./routes/tareas");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes POST y DELETE

app.use("/api/tareas", tareasRoutes); // Rutas de tareas

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
