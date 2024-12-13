import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAllStudents, createStudent } from "./services/api.js";
const host = 'localhost';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de EJS y rutas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para manejar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal (dashboard)
app.get("/", async (req, res) => {
     try {
          const students = await getAllStudents();
          const totalStudents = students.length;
          const maleStudents = students.filter(student => student.gender === "M").length;
          const femaleStudents = students.filter(student => student.gender === "F").length;

          res.render("index", {
               totalStudents,
               maleStudents,
               femaleStudents,
          });
     } catch (error) {
          console.error("Error al renderizar la vista:", error);
          res.status(500).send("Error en el servidor");
     }
});

// Nueva ruta para la lista de estudiantes
app.get("/students", async (req, res) => {
     try {
          const students = await getAllStudents(); // Obtiene los datos desde la API
          res.render("students", { students }); // Pasa los estudiantes a la vista
     } catch (error) {
          console.error("Error al obtener los estudiantes:", error);
          res.status(500).send("Error en el servidor");
     }
});

// Nueva ruta para el formulario de registro de estudiante
app.get("/students/register", (req, res) => {
     res.render("register");
});

// Ruta para manejar la creación de estudiantes
app.post("/students/register", async (req, res) => {
     try {
          const studentData = req.body;
          const result = await createStudent(studentData);

          if (result.error) {
               return res.status(400).json({ message: "Error al registrar estudiante" });
          }

          res.json({ message: "Estudiante registrado exitosamente" });
          res.redirect("/students");
     } catch (error) {
          console.error("Error al registrar estudiante:", error);
          res.status(500).send("Error al registrar estudiante");
     }
});

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
     console.log(`Servidor ejecutándose en http://${host}:${PORT}`);
});
