import { Router } from "express";
import pg from "pg";
const { Client } = pg;
const students = Router();

const client = new Client({
  database: "postgres",
  password: "admin",
  user: "postgres",
  host: "localhost",
  port: 5432,
});
await client.connect();

students.get("/students", async function (req, res) {
  const nombre = req.query.nombre;
  if (nombre == undefined) {
    const result = await client.query("SELECT * FROM students;");
    res.json(result.rows);
  } else if (nombre != undefined) {
    const result = await client.query(
      "SELECT * FROM students WHERE nombre = $1",
      [nombre]
    );
    res.json(result.rows);
  }
});

students.post("/students", async function (req, res) {
  const nombre = req.body.nombre;
  const expediente = req.body.expediente;
  if (nombre == undefined || expediente == undefined) {
    res.send("No hay suficientes valores, falta nombre o expediente");
  } else {
    const result = await client.query(
      "INSERT INTO students VALUES ($1, $2)",
      [expediente, nombre]
    );
    res.json(result.rows);
  }
});

students.delete("/students", async function (req, res) {
  const expediente = req.body.expediente;
  if (!expediente) {
    res.json("No hay expediente");
    return;
  }
  const result = await client.query(
    "DELETE FROM students WHERE expediente = $1",
    [expediente]
  );

  res.json(result.rows);
});

students.patch("/students", async function (req, res) {
  const nombre = req.body.nombre;
  const expediente = req.body.expediente;
  const toUpdate = req.query.expediente;
  console.log(nombre, expediente, toUpdate);
  if (!toUpdate) {
    res.json("NO SE PUEDE ACTUALIZAR SIN EXPEDIENTE");
    return;
  }
  if (nombre) {
    await client.query(
      "UPDATE students SET nombre = $1 WHERE expediente = $2;",
      [nombre, toUpdate]
    );
  }
  if (expediente) {
    await client.query(
      "UPDATE students SET expediente = $1 WHERE expediente = $2;",
      [expediente, toUpdate]
    );
  }
  const result = await client.query(
    "SELECT * FROM students WHERE expediente = $1;",
    [expediente]
  );
  res.json(result.rows);
});

export default students;
