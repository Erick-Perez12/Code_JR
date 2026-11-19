import type { HciCitation, LearningTopic } from '../types';

export const MOCK_LEARNING: { asyncAwait: LearningTopic } = {
    asyncAwait: {
      title: "async / await en JavaScript",
      simpleDef: "async y await ayudan a trabajar con operaciones que tardan un tiempo en completarse (como traer datos de un servidor), permitiendo escribir código asíncrono que se lee casi como síncrono.",
      analogy: "Imagina que pides una pizza. En lugar de quedarte inmóvil en la puerta esperando (bloqueante), la palabra 'await' le dice a tu función: 'ponte en pausa aquí hasta que llegue el repartidor con los datos, y luego continuamos con el siguiente paso'.",
      codeExample: `async function obtenerProductos() {\n  console.log("Cargando productos...");\n  const respuesta = await fetch("https://api.tienda.com/productos");\n  const productos = await respuesta.json();\n  console.log("Productos listos:", productos);\n}`,
      quiz: {
        question: "¿Qué ocurre exactamente cuando una función llega a una línea con 'await'?",
        options: [
          { id: "A", text: "Todo el navegador y la aplicación se congelan por completo." },
          { id: "B", text: "Esa función específica detiene temporalmente su ejecución hasta que la operación termine, sin bloquear el resto del navegador.", correct: true },
          { id: "C", text: "La función se cancela y se elimina de la memoria." },
          { id: "D", text: "Se ejecuta inmediatamente el código que está debajo sin esperar el resultado." }
        ],
        explanationCorrect: "¡Correcto! 'await' pausa la ejecución dentro de esa función asíncrona hasta que la promesa entregue una respuesta, mientras el navegador sigue respondiendo a otras interacciones.",
        explanationIncorrect: "No exactamente. 'await' no congela todo el programa ni se salta la llamada. Pausa únicamente esa función asíncrona hasta que el resultado esté listo."
      }
    }
  };

export const HCI_PAPER_CITATIONS: HciCitation[] = [
  {
    paper: "Liu et al. (2023)",
    title: "What It Wants Me to Say: Bridging Abstraction Gap",
    concept: "Solicitud Guiada y Reducción del Gap de Abstracción",
    application: "En la tarea 'Generar Funcionalidad', reemplazamos el prompt vacío tradicional con un formulario paso a paso de 6 preguntas concretas. El usuario junior no tiene que adivinar la estructura del prompt."
  },
  {
    paper: "Masson et al. (2024)",
    title: "DirectGPT: A Direct Manipulation Interface for LLMs",
    concept: "Interacción Directa sobre Elementos de Código",
    application: "Al hacer clic en cualquier fragmento del código generado, aparece un menú contextual con opciones explícitas ('Explicarme esta línea', 'Mejorar'). Elimina la necesidad de redactar re-prompts manualmente."
  },
  {
    paper: "Zamfirescu-Pereira et al. (2025)",
    title: "Beyond Code Generation: Program Design Space",
    concept: "Exploración de Alternativas y Requisitos Visibles",
    application: "En 'Mejorar Diseño', CODE JR ofrece 3 alternativas paralelas (Minimalista, Guiada, Visual) explicitando recomendaciones y métricas de complejidad en lugar de dar una sola respuesta autoritaria."
  },
  {
    paper: "Chen et al. (2026)",
    title: "From Conversation to Human-AI Common Ground",
    concept: "Terreno Común y Continuidad de Contexto",
    application: "El panel lateral 'Lo que CODE JR recuerda' expone de manera transparente la memoria de la IA sobre el proyecto actual. El usuario puede auditar y modificar activamente las premisas asumidas."
  }
];
