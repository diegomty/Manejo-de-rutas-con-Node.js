import e from "express";
import { renderIndex } from "./screens/index.js";
import students from "./routes/students.js";
import teachers from "./routes/teachers.js";
import classes from "./routes/classes.js";

const app = e();

app.use(e.json());

app.get("/", renderIndex);

app.use(students);
app.use(teachers)
app.use(classes);

app.listen(4000, (error) => {
  console.log("Server started");
});
