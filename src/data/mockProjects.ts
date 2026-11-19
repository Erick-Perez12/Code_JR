import type { Project } from '../types';

export const createStarterFileContents = (projectName = "Mi proyecto", includeFixExample = false): Record<string, string> => ({
  "index.html": `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>${projectName}</h1>
    <button id="menuBtn" class="btn-primary">Abrir menú</button>
  </main>
  <script src="script.js" defer></script>
</body>
</html>`,
  "style.css": `:root {
  font-family: system-ui, sans-serif;
  color: #1e293b;
  background: #f8fafc;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.btn-primary {
  padding: 0.65rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  color: white;
  background: #2563eb;
  cursor: pointer;
}`,
  "script.js": includeFixExample ? `function toggleMenu() {
  console.log("Menú abierto");
}

const boton = document.querySelector("#menu");
boton.addEventListener("click", toggleMenu);` : `// Aquí puedes comenzar a escribir la lógica de tu proyecto.`
});

export const INITIAL_PROJECT_CONTEXT: Project = {
  id: "project-tienda-online",
  name: "Tienda Online",
  objective: "Crear una tienda online sencilla para practicar desarrollo web frontend.",
  technologies: ["HTML5", "CSS3", "JavaScript (ES6+)"],
  files: ["index.html", "style.css", "script.js"],
  fileContents: createStarterFileContents("Tienda Online", true),
  currentTask: "Validación del formulario de registro",
  decisions: [
    { id: 1, title: "Tecnologías base", desc: "HTML + CSS + JavaScript Vanilla", status: "confirmed" },
    { id: 2, title: "Diseño Responsive", desc: "Adaptable a móviles y escritorio mediante Media Queries", status: "confirmed" },
    { id: 3, title: "Validación de Correo", desc: "Comprobación básica de sintaxis de email en cliente", status: "confirmed" },
    { id: 4, title: "Uso de Frameworks", desc: "No utilizar React ni librerías pesadas en esta fase", status: "rejected" }
  ],
  history: [
    { step: 1, title: "Creación del formulario", date: "Hace 2 horas", status: "Completado" },
    { step: 2, title: "Validación de correo electrónico", date: "Hace 1 hora", status: "Completado" },
    { step: 3, title: "Corrección de listener en botón menuBtn", date: "Hace 30 min", status: "Completado" },
    { step: 4, title: "Mejora de interfaz visual (Opción B)", date: "Hace 10 min", status: "En progreso" }
  ]
};
