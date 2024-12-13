import fetch from "node-fetch";

const BASE_URL = "http://3.147.198.203:8080/api/students";

// Obtener todos los estudiantes
export const getAllStudents = async () => {
     try {
          const response = await fetch(`${BASE_URL}/all`);
          const data = await response.json();
          return data;
     } catch (error) {
          console.error("Error al obtener los estudiantes:", error);
          return [];
     }
};

// Crear un estudiante
export const createStudent = async (studentData) => {
     try {
          const response = await fetch(`${BASE_URL}/create`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(studentData),
          });

          if (!response.ok) {
               const errorData = await response.json();
               console.error("Error al registrar estudiante:", errorData);
               return { error: true };
          }

          return { success: true };
     } catch (error) {
          console.error("Error al registrar estudiante:", error);
          return { error: true };
     }
};
