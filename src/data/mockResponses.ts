import type { DesignAlternative, DesignOptionKey, MockResponses } from '../types';

export const MOCK_RESPONSES: MockResponses = {
  generate: {
    problem: "Necesitas validar los datos del usuario antes de enviar el formulario para evitar datos no válidos.",
    code: `// Función para validar el formulario de registro
function validarFormulario() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Comprobación de formato de correo
  if (!email.includes("@")) {
    mostrarError("El correo no es válido");
    return false;
  }

  // Comprobación de longitud de contraseña
  if (password.length < 6) {
    mostrarError("La contraseña debe tener al menos 6 caracteres");
    return false;
  }

  return true;
}`,
    explanation: "La función extrae los valores ingresados y verifica que el correo contenga '@' y que la contraseña tenga mínimo 6 caracteres antes de dar por válido el envío."
  },
  fixError: {
    diagnosis: "El botón tiene asignado un evento de clic en JS, pero la función no se ejecuta porque el selector ID en tu código ('#menu') no coincide con el elemento HTML ('id=\"menuBtn\"').",
    currentCode: `<button id="menuBtn" class="btn-primary">\n  Abrir Menú\n</button>`,
    proposedCode: `<button id="menuBtn" class="btn-primary" onclick="toggleMenu()">\n  Abrir Menú\n</button>`,
    jsDiffCurrent: `const boton = document.querySelector("#menu");\nboton.addEventListener("click", toggleMenu);`,
    jsDiffProposed: `const boton = document.querySelector("#menuBtn");\nboton.addEventListener("click", toggleMenu);`,
    whyChanged: "El selector anterior buscaba id='menu', pero el HTML utiliza 'menuBtn'. La modificación hace que ambos coincidan perfectamente."
  },
  reviewCode: [
    {
      id: "dup",
      severity: "yellow",
      type: "Código repetido",
      summary: "Hay dos funciones realizando la misma validación de correo electrónico.",
      juniorExp: "Tener la misma lógica en dos lugares distintos dificulta los cambios. Si cambias la regla de validación en el futuro, tendrás que actualizarla en dos sitios.",
      recommendation: "Crea una función auxiliar reutilizable como `esEmailValido(email)` y llámala desde ambos lugares."
    },
    {
      id: "a11y",
      severity: "orange",
      type: "Accesibilidad (a11y)",
      summary: "Los campos de texto `<input>` no tienen etiquetas `<label>` vinculadas.",
      juniorExp: "Los lectores de pantalla para personas con discapacidad visual no sabrán qué tipo de información se solicita en cada caja de texto.",
      recommendation: "Agrega un `<label for=\"correo\">Correo</label>` asociado a cada `<input id=\"correo\">`."
    },
    {
      id: "org",
      severity: "green",
      type: "Organización general",
      summary: "Estructura limpia e indentación consistente.",
      juniorExp: "Tu código sigue buenas prácticas de espaciado y nombres de variables descriptivos.",
      recommendation: "¡Buen trabajo! Mantén el estándar de nomenclatura camelCase que estás utilizando."
    }
  ]
};

export const DESIGN_ALTERNATIVES: Record<DesignOptionKey, DesignAlternative> = {
  A: {
    name: "Minimalista",
    description: "Menos elementos visuales y mayor espacio en blanco entre los campos para evitar sobrecarga.",
    difficulty: "Fácil",
    objective: "Reducir el ruido visual y destacar el formulario.",
    complexity: "Baja",
    advantages: "Es rápida de recorrer y mantiene la atención en los campos.",
    considerations: "Ofrece menos orientación a las personas que necesitan ayuda para completar el formulario."
  },
  B: {
    name: "Guiada",
    description: "Agrega instrucciones y ejemplos visibles junto a cada campo. Ayuda a evitar errores antes de enviar.",
    difficulty: "Fácil",
    objective: "Acompañar a la persona mientras completa cada campo.",
    complexity: "Baja",
    advantages: "Aclara qué información se necesita y ayuda a prevenir errores comunes.",
    considerations: "Ocupa más espacio porque cada campo incluye una explicación."
  },
  C: {
    name: "Visual",
    description: "Utiliza tarjetas, color e indicadores para separar visualmente cada sección del formulario.",
    difficulty: "Media",
    objective: "Separar las etapas y hacer más visible la jerarquía del formulario.",
    complexity: "Media",
    advantages: "Hace visibles las secciones y permite reconocer el avance de un vistazo.",
    considerations: "Si se usan muchos adornos, pueden competir con los campos y las instrucciones."
  }
};
