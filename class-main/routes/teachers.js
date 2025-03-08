import { Router } from "express";
import pg from "pg";
const { Client } = pg;
const teachers = Router();

const client = new Client({
  database: "postgres",
  password: "admin",
  user: "postgres",
  host: "localhost",
  port: 5432,
});
await client.connect();


teachers.get("/teachers",async (req, res) => {
  const result = await client.query("SELECT * FROM teachers");
  return res.json(result.rows);
})

teachers.post("/teachers", async (req, res) => {
  const { clave, nombre, grado } = req.body;
  if (!clave, !nombre, !grado) return res.status(400).send("Information missing");
  client.query("INSERT INTO teachers VALUES ($1, $2, $3)", [clave, nombre, grado]);
  return res.send("Teacher creado");
})

teachers.delete("/teachers/:clave", async (req, res) => {
  const clave = req.params.clave;
  const result = await client.query("DELETE FROM teachers WHERE clave = $1", [clave]);
  if (result.rowCount != 1) {
   return res.status(400).send("CLAVE INVALIDA");
  }
  return res.json(result.rows);
})

export default teachers;