import { Router } from "express";
import pg from "pg";
const { Client } = pg;
const classes = Router();

const client = new Client({
  database: "postgres",
  password: "admin",
  user: "postgres",
  host: "localhost",
  port: 5432,
});

await client.connect();
//Endpoint para obtener CLASS (existentes)
classes.get("/classes", async (req, res) => {
  const results = await client.query("SELECT * FROM class;")  
  res.json(results.rows);
})


//Endpoint para obtener una clase por id
classes.post("/classes", async (req, res) => {
  const {nombreClase, semestre, teacher_id} = req.body;
  if(!nombreClase || !semestre || !teacher_id){
    return res.status(400).send("Faltan datos para crear la clase");
  }
  await client.query("INSERT INTO class (nombreClase, semestre, teacher_id) VALUES ($1, $2, $3)", [nombreClase, semestre, teacher_id]);
  return res.json("Clase creada");
});


//Endpoint para eliminar una clase por id
classes.delete("/classes/:id", async (req, res) => {
  const { id } = req.params;
  const results = await client.query(`DELETE FROM class WHERE id = $1`, [id]);
  if ( results.rowCount == 1){
    return res.status(400).json("ID invalido");
  } else {
    res.json("Clase eliminada");
  }
})

//Endpoint para TEACHERS (nuevos)
classes.get("/teachers", async (req, res) => {
  const results = await client.query("SELECT * FROM teachers;");
  res.json(results.rows);
});

//Endpoint para crear un nuevo TEACHER
classes.post("/teachers", async (req, res) => {
  const { clave, nombre, grado } = req.body;
  if (!clave || !nombre || !grado) {
    return res.status(400).send("Faltan datos para crear el teacher");
  }
  await client.query("INSERT INTO teachers VALUES ($1, $2, $3)", [clave, nombre, grado]);
  return res.json("Teacher creado");
});

//Endpoint para eliminar un TEACHER por clave
classes.delete("/teachers/:clave", async (req, res) => {
  const { clave } = req.params;
  const results = await client.query("DELETE FROM teacher WHERE clave = $1", [clave]);
  if (results.rowCount != 1) {
    return res.status(400).send("Clave invalida");
  }
  return res.json("Teacher eliminado");
});

//ENDPOINTS PARA STUDENTS
classes.get("/students", async (req, res) => {
  const results = await client.query("SELECT * FROM students;");
  res.json(results.rows);
});

//Endpoint para crear un nuevo STUDENT
classes.post("/students", async (req, res) => {
  const { expediente, nombre } = req.body;
  if (!expediente || !nombre) {
    return res.status(400).send("Faltan datos para crear el student");
  }
  await client.query("INSERT INTO students VALUES ($1, $2)", [expediente, nombre]);
  return res.json("Student creado");
});

//Endpoint para eliminar un STUDENT por expediente
classes.delete("/students/:expediente", async (req, res) => {
  const { expediente } = req.params;
  const results = await client.query("DELETE FROM students WHERE expediente = $1", [expediente]);
  if (results.rowCount != 1) {
    return res.status(400).send("Expediente invalido");
  }
  return res.json("Student eliminado");
});


classes.patch("/classes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombreClase, semestre } = req.body;
  if (!nombreClase || !semestre) {
    return res.json("Faltan datos para actualizar");
  }
  const results = await client.query(`UPDATE class SET "nombreClase" = $1, "semestre" = $2 WHERE id = $3`, [nombreClase, semestre, id]);
  if (results.rowCount == 1){
    res.json(`Actualizada clase ${id}`);
  } else {
    res.json("No se pudo actualizar");
  }
})

export default classes;