import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Code2, AlertTriangle, Sparkles, CheckCircle2, History, Settings, 
  HelpCircle, ChevronRight, Play, ArrowLeft, RefreshCw, X, Eye, ThumbsUp, 
  FileText, Check, AlertCircle, Info, Layers, User, Cpu, Lightbulb, Split, 
  RotateCcw, Compass, ExternalLink, MessageSquare, Terminal, ShieldAlert, Award
} from 'lucide-react';

// ==========================================
// MOCK DATA & STATE DEFINITIONS
// ==========================================
const INITIAL_PROJECT_CONTEXT = {
  name: "Tienda Online",
  objective: "Crear una tienda online sencilla para practicar desarrollo web frontend.",
  technologies: ["HTML5", "CSS3", "JavaScript (ES6+)"],
  files: ["index.html", "style.css", "script.js"],
  currentTask: "Validación del formulario de registro",
  decisions: [
    { id: 1, title: "Tecnologías base", desc: "HTML + CSS + JavaScript Vanilla", status: "confirmed" },
    { id: 2, title: "Diseño Responsive", desc: "Adaptable a móviles y escritorio mediante Media Queries", status: "confirmed" },
    { id: 3, title: "Validación de Correo", desc: "Comprobación básica de sintaxis de email en cliente", status: "confirmed" },
    { id: 4, title: "Uso de Frameworks", desc: "No utilizar React ni librerías pesadas en esta fase", status: "rejected" }
  ]
};

const MOCK_RESPONSES = {
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
  learn: {
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

const HCI_PAPER_CITATIONS = [
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

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [projectContext, setProjectContext] = useState(INITIAL_PROJECT_CONTEXT);
  const [toastMessage, setToastMessage] = useState(null);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const [isHciModalOpen, setIsHciModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analizando solicitud...");

  // Task-specific persistence states
  const [generateStep, setGenerateStep] = useState('form'); // 'form', 'request', 'summary', 'result'
  const [generateForm, setGenerateForm] = useState({
    objective: "",
    behaviors: [] as string[],
    location: "",
    techs: [] as string[],
    constraints: "",
    explanationLevel: "",
    additionalDetails: "",
    directMode: false,
    directRequest: "",
    requestDraft: ""
  });

  const [fixStep, setFixStep] = useState('form'); // 'form', 'result', 'diff'
  const [fixForm, setFixForm] = useState({
    expected: "Al hacer clic en el botón, debe desplegarse el menú principal.",
    actual: "Al hacer clic en el botón no sucede absolutamente nada.",
    code: `<button id="menuBtn" class="btn-primary">Abrir Menú</button>\n\n// JavaScript\nconst boton = document.querySelector("#menu");\nboton.addEventListener("click", toggleMenu);`,
    errorMessage: "Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')"
  });

  const [designOption, setDesignOption] = useState(null);
  const [designAnalyzed, setDesignAnalyzed] = useState(false);
  const [designConfirmed, setDesignConfirmed] = useState(false);
  const [learnLevel, setLearnLevel] = useState('visto_no_entiendo');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [selectedReviewItem, setSelectedReviewItem] = useState(null);

  // Selected code interaction tooltip
  const [codeInspection, setCodeInspection] = useState(null);

  // Toast notification timer helper
  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Simulated Async AI Response wrapper
  const triggerSimulatedAi = (onComplete, text = "CODE JR procesando solicitud...") => {
    setLoadingText(text);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 900);
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 font-sans overflow-hidden">
      
      {/* ---------------------------------------------------- */}
      {/* SIDEBAR NAVIGATION                                   */}
      {/* ---------------------------------------------------- */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 select-none">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
              C
            </div>
            <div>
              <span className="font-bold text-white tracking-wide text-base">CODE JR</span>
              <span className="text-[10px] block text-blue-400 font-medium -mt-1">Asistente HCI Junior</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-900/60 text-blue-300 border border-blue-700/50">
            PROTOTIPO
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-1">Navegación</div>
          
          <button
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'home' ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => setActiveTab('project')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'project' ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mi Proyecto</span>
          </button>

          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-1 mt-4">Tareas de Asistencia</div>

          <button
            onClick={() => setActiveTab('generate')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'generate' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Crear Funcionalidad</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab('fix')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'fix' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Corregir Error</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab('design')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'design' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Mejorar Diseño</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab('learn')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'learn' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Aprender Concepto</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'review' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Revisar Código</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-1 mt-4">Auditoría & HCI</div>

          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'history' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Historial del Proyecto</span>
          </button>
        </nav>

        {/* HCI Justification Banner Button */}
        {/* <div className="p-3 bg-slate-950 border-t border-slate-800">
          <button
            onClick={() => setIsHciModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-indigo-900/40 hover:bg-indigo-900/70 border border-indigo-700/50 rounded-lg text-indigo-300 text-xs font-medium transition-colors"
          >
            <Award className="w-4 h-4 text-indigo-400" />
            <span>Fundamentación HCI</span>
          </button>
        </div> */}
      </aside>

      {/* ---------------------------------------------------- */}
      {/* MAIN VIEWPORT AREA                                   */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        
        {/* TOP SYSTEM BAR */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200">
              Proyecto Activo:
            </span>
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {projectContext.name}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500">
              Tarea actual: <strong className="text-slate-700 font-medium">{projectContext.currentTask}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Context Widget Button */}
            <button
              onClick={() => setIsContextModalOpen(true)}
              className="flex items-center space-x-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Lo que CODE JR recuerda</span>
            </button>

            {/* Profile Avatar Tag */}
            <div className="flex items-center space-x-2 pl-3 border-l border-slate-200">
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                JR
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-semibold block text-slate-700 leading-tight">Dev Junior</span>
                <span className="text-[10px] text-slate-400 leading-tight">Nivel Principiante</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN DISPLAY CONTENT CONTAINER */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          
          {/* SIMULATED LOADING OVERLAY */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-semibold text-slate-800 text-sm tracking-wide">{loadingText}</p>
              <p className="text-xs text-slate-500">Analizando contexto y adaptando la solución para desarrollador junior...</p>
            </div>
          )}

          {/* PAGE SWITCHING */}
          {activeTab === 'home' && (
            <HomePage 
              setActiveTab={setActiveTab} 
              projectContext={projectContext} 
            />
          )}

          {activeTab === 'project' && (
            <ProjectPage 
              projectContext={projectContext}
              setProjectContext={setProjectContext}
              showToast={showToast}
            />
          )}

          {activeTab === 'generate' && (
            <GeneratePage 
              step={generateStep}
              setStep={setGenerateStep}
              form={generateForm}
              setForm={setGenerateForm}
              triggerAi={triggerSimulatedAi}
              showToast={showToast}
              codeInspection={codeInspection}
              setCodeInspection={setCodeInspection}
            />
          )}

          {activeTab === 'fix' && (
            <FixErrorPage 
              step={fixStep}
              setStep={setFixStep}
              form={fixForm}
              setForm={setFixForm}
              triggerAi={triggerSimulatedAi}
              showToast={showToast}
            />
          )}

          {activeTab === 'design' && (
            <ImproveDesignPage 
              selectedOption={designOption}
              setSelectedOption={setDesignOption}
              analyzed={designAnalyzed}
              setAnalyzed={setDesignAnalyzed}
              confirmed={designConfirmed}
              setConfirmed={setDesignConfirmed}
              triggerAi={triggerSimulatedAi}
              showToast={showToast}
            />
          )}

          {activeTab === 'learn' && (
            <LearnPage 
              level={learnLevel}
              setLevel={setLearnLevel}
              quizAnswer={quizAnswer}
              setQuizAnswer={setQuizAnswer}
              showToast={showToast}
            />
          )}

          {activeTab === 'review' && (
            <ReviewCodePage 
              selectedItem={selectedReviewItem}
              setSelectedItem={setSelectedReviewItem}
              triggerAi={triggerSimulatedAi}
              showToast={showToast}
            />
          )}

          {activeTab === 'history' && (
            <HistoryPage 
              projectContext={projectContext}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SYSTEM TOAST FEEDBACK NOTIFICATION                   */}
      {/* ---------------------------------------------------- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl shadow-xl text-white font-medium text-sm border ${
            toastMessage.type === 'error' ? 'bg-rose-600 border-rose-500' : 'bg-slate-900 border-slate-700'
          }`}>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* CONTEXT MODAL: "LO QUE CODE JR RECUERDA"             */}
      {/* ---------------------------------------------------- */}
      {isContextModalOpen && (
        <ContextModal 
          projectContext={projectContext}
          setProjectContext={setProjectContext}
          onClose={() => setIsContextModalOpen(false)}
          showToast={showToast}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* RESEARCH / HCI PAPER DESIGN JUSTIFICATION MODAL      */}
      {/* ---------------------------------------------------- */}
      {isHciModalOpen && (
        <HciJustificationModal 
          onClose={() => setIsHciModalOpen(false)} 
        />
      )}

    </div>
  );
}

// ==========================================================
// PANTALLA INICIO (HOME)
// ==========================================================
function HomePage({ setActiveTab, projectContext }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Asistencia Adaptativa HCI</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">¿En qué quieres trabajar hoy?</h1>
          <p className="text-blue-100 max-w-2xl text-sm leading-relaxed">
            CODE JR te acompaña paso a paso según lo que necesitas hacer. No necesitas saber escribir el prompt perfecto: la interfaz se adapta a ti.
          </p>
        </div>
      </div>

      {/* 5 Main Task Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
          <Compass className="w-5 h-5 text-blue-600" />
          <span>Selecciona una tarea</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Task 1 */}
          <div 
            onClick={() => setActiveTab('generate')}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Crear una funcionalidad</h3>
                <p className="text-xs text-slate-500 mt-1">"Quiero agregar algo nuevo a mi proyecto."</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
              <span>Iniciar asistente guiado</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Task 2 */}
          <div 
            onClick={() => setActiveTab('fix')}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-rose-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">Corregir un problema</h3>
                <p className="text-xs text-slate-500 mt-1">"Algo no funciona como esperaba en mi código."</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
              <span>Analizar error y diff</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Task 3 */}
          <div 
            onClick={() => setActiveTab('design')}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-cyan-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">Mejorar mi diseño</h3>
                <p className="text-xs text-slate-500 mt-1">"Quiero mejorar la apariencia o experiencia visual."</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-cyan-600 font-semibold">
              <span>Explorar 3 alternativas</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Task 4 */}
          <div 
            onClick={() => setActiveTab('learn')}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Aprender un concepto</h3>
                <p className="text-xs text-slate-500 mt-1">"Quiero entender algo antes de utilizarlo."</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
              <span>Explicación + Quiz interactivo</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Task 5 */}
          <div 
            onClick={() => setActiveTab('review')}
            className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Revisar mi código</h3>
                <p className="text-xs text-slate-500 mt-1">"Quiero saber si mi código puede mejorarse."</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-600 font-semibold">
              <span>Auditoría de calidad y a11y</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Continúa donde lo dejaste */}
      <div className="bg-slate-900 rounded-xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
            <RotateCcw className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Continúa donde lo dejaste</span>
            <h4 className="font-bold text-base text-slate-100">{projectContext.currentTask}</h4>
            <p className="text-xs text-slate-400">Último estado: Paso 1 completado en Tienda Online</p>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('generate')}
          className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Continuar tarea</span>
        </button>
      </div>

    </div>
  );
}

// ==========================================================
// PANTALLA CONTEXTO DEL PROYECTO (MI PROYECTO)
// ==========================================================
function ProjectPage({ projectContext, setProjectContext, showToast }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{projectContext.name}</h1>
            <p className="text-sm text-slate-500 mt-0.5">{projectContext.objective}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            En Desarrollo Activo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Tech stack */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tecnologías configuradas</h3>
            <div className="flex flex-wrap gap-2">
              {projectContext.technologies.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-xs border border-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Active Files */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Archivos del proyecto</h3>
            <div className="flex flex-wrap gap-2">
              {projectContext.files.map((f, idx) => (
                <span key={idx} className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 font-mono text-xs border border-blue-200 flex items-center space-x-1">
                  <FileText className="w-3 h-3" />
                  <span>{f}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decisions Log */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <span>Decisiones Registradas en el Proyecto</span>
        </h2>

        <div className="space-y-3">
          {projectContext.decisions.map((dec) => (
            <div key={dec.id} className="p-4 rounded-lg border border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h4 className="font-bold text-sm text-slate-800">{dec.title}</h4>
                <p className="text-xs text-slate-500">{dec.desc}</p>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                dec.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {dec.status === 'confirmed' ? '✓ Aceptado' : '✗ Rechazado'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================================
// TAREA 1 — GENERAR UNA FUNCIONALIDAD (6 STEPS + SUMMARY)
// ==========================================================
function GeneratePage({ step, setStep, form, setForm, triggerAi, showToast, codeInspection, setCodeInspection }) {
  const [isEditingRequest, setIsEditingRequest] = useState(false);
  
  const handleBehaviorToggle = (item) => {
    const exists = form.behaviors.includes(item);
    if (exists) {
      setForm({ ...form, behaviors: form.behaviors.filter(b => b !== item) });
    } else {
      setForm({ ...form, behaviors: [...form.behaviors, item] });
    }
  };

  const handleTechToggle = (item) => {
    const exists = form.techs.includes(item);
    if (exists) {
      setForm({ ...form, techs: form.techs.filter(t => t !== item) });
    } else {
      setForm({ ...form, techs: [...form.techs, item] });
    }
  };

  const buildPrompt = () => {
    const parts = [];
    const objective = (form.directMode ? (form.directRequest.trim() || form.objective) : form.objective).trim();

    if (objective) parts.push(objective);
    if (form.behaviors.length) parts.push(`Debe: ${form.behaviors.join(", ").toLowerCase()}.`);
    if (form.location) parts.push(`Se utilizará en ${form.location}.`);
    if (form.techs.length) parts.push(`Usa ${form.techs.join(", ")}.`);
    if (form.constraints.trim()) parts.push(`Ten en cuenta esta restricción: ${form.constraints.trim()}.`);
    if (form.explanationLevel) parts.push(`Explícame la solución ${form.explanationLevel.toLowerCase()}.`);
    if (form.additionalDetails.trim()) parts.push(form.additionalDetails.trim());

    return parts.join(" ");
  };

  const startRequestReview = () => {
    setForm({ ...form, requestDraft: buildPrompt() });
    setIsEditingRequest(false);
    setStep('request');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* STEP INDICATOR HEADER */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-bold text-slate-800">Tarea:</span>
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-semibold">Generar Funcionalidad</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-medium text-slate-500">
          <span className={step === 'form' ? 'text-blue-600 font-bold' : ''}>1. Guía opcional</span>
          <span>→</span>
          <span className={step === 'request' ? 'text-blue-600 font-bold' : ''}>2. Tu solicitud</span>
          <span>→</span>
          <span className={step === 'summary' ? 'text-blue-600 font-bold' : ''}>3. Esto entendí</span>
          <span>→</span>
          <span className={step === 'result' ? 'text-blue-600 font-bold' : ''}>4. Solución CODE JR</span>
        </div>
      </div>

      {/* STEP 1: GUIDED FORM */}
      {step === 'form' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Cuéntame qué quieres hacer</h2>
            <p className="text-xs text-slate-500 mt-1">Si quieres, podemos ayudarte a completar los detalles. Puedes escribirlo con tus propias palabras.</p>
            <p className="text-xs text-slate-500 mt-1">Estas preguntas son opcionales y ayudan a CODE JR a entender mejor tu solicitud.</p>
          </div>

          <div className="space-y-5">
            <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${form.directMode ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
              <input
                type="checkbox"
                checked={form.directMode}
                onChange={(e) => setForm({ ...form, directMode: e.target.checked })}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-800">Prefiero escribir mi solicitud directamente</span>
                <span className="block text-xs text-slate-500 mt-0.5">Puedes continuar sin completar las preguntas guiadas.</span>
              </span>
            </label>

            {form.directMode && (
              <div className="space-y-1.5">
                <label htmlFor="direct-request" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Tu solicitud</label>
                <textarea
                  id="direct-request"
                  value={form.directRequest}
                  onChange={(e) => setForm({ ...form, directRequest: e.target.value })}
                  className="w-full min-h-32 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-y"
                  placeholder="Cuéntame con tus propias palabras qué quieres crear o resolver."
                />
              </div>
            )}

            <details open={!form.directMode} className="rounded-lg border border-slate-200">
              <summary className="px-4 py-3 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 rounded-lg">
                {form.directMode ? "Si quieres, completa los detalles guiados (opcional)" : "Preguntas para completar tu solicitud (todas opcionales)"}
              </summary>
              <div className="p-4 pt-1 space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="generate-objective" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 1 — ¿Qué quieres conseguir?</label>
                  <textarea
                    id="generate-objective"
                    value={form.objective}
                    onChange={(e) => setForm({ ...form, objective: e.target.value })}
                    className="w-full min-h-24 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-y"
                    placeholder="Ej. Quiero crear un formulario de registro que valide el correo y la contraseña."
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 2 — ¿Qué debe hacer?</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {["Validar datos", "Mostrar mensajes de error", "Guardar información", "Cambiar elementos visuales", "Responder a botones"].map((item) => (
                      <label key={item} className={`flex items-center space-x-2 p-2.5 rounded-lg border cursor-pointer text-xs font-medium transition-colors ${form.behaviors.includes(item) ? 'bg-blue-50 border-blue-400 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                        <input type="checkbox" checked={form.behaviors.includes(item)} onChange={() => handleBehaviorToggle(item)} className="rounded text-blue-600 focus:ring-blue-500" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="generate-location" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 3 — ¿Dónde se utilizará?</label>
                  <select id="generate-location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                    <option value="">Sin especificar</option>
                    <option value="Página de registro">Página de registro</option>
                    <option value="Página principal">Página principal</option>
                    <option value="Página de login">Página de login</option>
                    <option value="Menú superior">Menú superior</option>
                    <option value="Formulario independiente">Formulario independiente</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 4 — Tecnologías (opcional)</span>
                  <div className="flex flex-wrap gap-3">
                    {["HTML", "CSS", "JavaScript"].map((tech) => (
                      <label key={tech} className={`flex items-center space-x-2 px-3 py-2 rounded-lg border cursor-pointer text-xs font-medium ${form.techs.includes(tech) ? 'bg-indigo-50 border-indigo-400 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                        <input type="checkbox" checked={form.techs.includes(tech)} onChange={() => handleTechToggle(tech)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span>{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="generate-constraints" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 5 — Restricciones (opcional)</label>
                  <input id="generate-constraints" type="text" value={form.constraints} onChange={(e) => setForm({ ...form, constraints: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ej. No utilizar React ni librerías externas." />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 6 — ¿Cómo quieres que te explique la solución?</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["Muy sencillo", "Para desarrollador junior", "Técnico"].map((lvl) => (
                      <button key={lvl} type="button" onClick={() => setForm({ ...form, explanationLevel: form.explanationLevel === lvl ? "" : lvl })} className={`p-2.5 rounded-lg text-xs font-semibold border text-center transition-all ${form.explanationLevel === lvl ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}>
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </details>

            <div className="space-y-1.5">
              <label htmlFor="generate-additional" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">¿Hay algo más que quieras contarle a CODE JR? <span className="font-normal normal-case text-slate-500">(opcional)</span></label>
              <textarea
                id="generate-additional"
                value={form.additionalDetails}
                onChange={(e) => setForm({ ...form, additionalDetails: e.target.value })}
                className="w-full min-h-24 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-y"
                placeholder="Por ejemplo: quiero que el mensaje aparezca debajo del campo y que el diseño sea sencillo."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                triggerAi(() => {
                  startRequestReview();
                  showToast("✓ Ya puedes revisar y editar tu solicitud.");
                }, "Preparando tu solicitud...");
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-colors flex items-center space-x-2"
            >
              <span>Revisar mi solicitud</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: EDITABLE REQUEST */}
      {step === 'request' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5 animate-fade-in">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Tu solicitud</h2>
            <p className="text-xs text-slate-500 mt-1">CODE JR reunió lo que compartiste. Puedes editar el texto directamente; tú decides qué quieres pedir.</p>
          </div>

          <textarea
            id="request-draft"
            value={form.requestDraft}
            readOnly={!isEditingRequest}
            onChange={(e) => setForm({ ...form, requestDraft: e.target.value })}
            className={`w-full min-h-40 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm leading-relaxed resize-y ${isEditingRequest ? 'border-blue-300 bg-white' : 'border-slate-200 bg-slate-50'}`}
            placeholder="Escribe aquí lo que quieres pedirle a CODE JR."
            aria-label="Solicitud final"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <button onClick={() => setStep('form')} className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Modificar formulario</span>
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsEditingRequest(true)} disabled={isEditingRequest} className="px-4 py-2 border border-blue-300 text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-default rounded-lg text-sm font-semibold transition-colors">
                Editar solicitud
              </button>
              <button onClick={() => setStep('summary')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                <span>Continuar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: RESUMEN DE INTENCIÓN ("ESTO ES LO QUE ENTENDÍ") */}
      {step === 'summary' && (
        <div className="bg-white rounded-xl p-6 border-2 border-blue-400 shadow-md space-y-6 animate-fade-in">
          <div className="flex items-center space-x-3 text-blue-700">
            <Info className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Esto es lo que entendí</h2>
              <p className="text-xs text-slate-500">Revisa si esta interpretación coincide con lo que necesitas. Puedes corregirla antes de ver la respuesta.</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solicitud que CODE JR entendió</span>
            <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">{form.requestDraft || "Aún no has escrito una solicitud."}</p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
            <span>¿Esto representa lo que quieres hacer exactamente?</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setStep('form');
                showToast("Puedes ajustar las preguntas opcionales.", "info");
              }}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Modificar formulario</span>
            </button>

            <div className="flex items-center gap-2">
              <button onClick={() => { setIsEditingRequest(true); setStep('request'); }} className="px-4 py-2 border border-blue-300 text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-semibold transition-colors">Editar solicitud</button>
              <button onClick={() => { triggerAi(() => { setStep('result'); showToast("✓ Solución simulada generada exitosamente."); }, "Generando solución óptima para desarrollador junior..."); }} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2 shadow-sm">
                <Check className="w-4 h-4" />
                <span>Continuar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: MOCK SOLUTION WITH DIRECT CODE INTERACTION */}
      {step === 'result' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900">Encontré una solución para tu formulario</h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                Solución Adaptada Junior
              </span>
            </div>

            {/* Problema / Diagnóstico */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Problema a resolver</h4>
              <p className="text-sm text-slate-700">{MOCK_RESPONSES.generate.problem}</p>
            </div>

            {/* Interactive Code Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-500 uppercase">Código propuesto (Haz clic en una línea para interactuar)</h4>
                {/* <span className="text-[11px] text-blue-600 font-medium">Masson et al. DirectGPT Pattern</span> */}
              </div>

              <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto relative shadow-inner space-y-1">
                {MOCK_RESPONSES.generate.code.split('\n').map((line, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setCodeInspection({ lineIndex: idx, text: line })}
                    className="hover:bg-slate-800/80 px-2 py-0.5 rounded cursor-pointer transition-colors flex items-start group"
                  >
                    <span className="w-8 text-slate-600 select-none text-[10px] pt-0.5">{idx + 1}</span>
                    <span className="group-hover:text-amber-300 transition-colors">{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Inspection Tooltip Modal */}
            {codeInspection && (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3 animate-fade-in">
                <div className="flex items-center justify-between text-indigo-900 font-bold text-xs">
                  <span>Línea seleccionada #{codeInspection.lineIndex + 1}: <code className="bg-indigo-100 px-1.5 py-0.5 rounded text-indigo-800">{codeInspection.text.trim()}</code></span>
                  <button onClick={() => setCodeInspection(null)} className="text-indigo-400 hover:text-indigo-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button 
                    onClick={() => {
                      showToast("`includes('@')` comprueba si la cadena contiene el símbolo arroba.");
                    }}
                    className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded hover:bg-indigo-500"
                  >
                    Explicarme esta línea
                  </button>
                  <button 
                    onClick={() => showToast("Lógica optimizada para evitar múltiples ifs.", "info")}
                    className="px-3 py-1.5 bg-white border border-indigo-300 text-indigo-700 text-xs font-semibold rounded hover:bg-indigo-100"
                  >
                    Mejorarla
                  </button>
                </div>
              </div>
            )}

            {/* Explicación */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
              <h4 className="text-xs font-bold text-blue-900 uppercase">Explicación para desarrollador junior</h4>
              <p className="text-xs text-blue-800 leading-relaxed">{MOCK_RESPONSES.generate.explanation}</p>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => showToast("✓ Cambio aplicado a script.js del proyecto.")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Aplicar cambio</span>
              </button>
              <button 
                onClick={() => showToast("Código copiado al portapapeles.", "info")}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Ver código completo
              </button>
              <button 
                onClick={() => setStep('form')}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Modificar solución
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================================
// TAREA 2 — CORREGIR UN ERROR (FORM + CODE DIFF VIEWER)
// ==========================================================
function FixErrorPage({ step, setStep, form, setForm, triggerAi, showToast }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-bold text-slate-800">Tarea:</span>
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-xs font-semibold">Corregir un Problema</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
          <span className={step === 'form' ? 'text-rose-600 font-bold' : ''}>1. Descripción de la falla</span>
          <span>→</span>
          <span className={step === 'diff' ? 'text-rose-600 font-bold' : ''}>2. Diagnóstico y Diff Visual</span>
        </div>
      </div>

      {step === 'form' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Cuéntame qué está pasando</h2>
            <p className="text-xs text-slate-500">Ingresa lo que observas para comparar el comportamiento real contra el esperado.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">¿Qué esperabas que ocurriera?</label>
              <input
                type="text"
                value={form.expected}
                onChange={(e) => setForm({ ...form, expected: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">¿Qué está ocurriendo realmente?</label>
              <input
                type="text"
                value={form.actual}
                onChange={(e) => setForm({ ...form, actual: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Código relacionado</label>
              <textarea
                rows={4}
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Mensaje de error de la consola (Opcional)</label>
              <input
                type="text"
                value={form.errorMessage}
                onChange={(e) => setForm({ ...form, errorMessage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono text-rose-600 focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                triggerAi(() => {
                  setStep('diff');
                  showToast("✓ Análisis finalizado. Error localizado.");
                }, "Comparando selectores HTML vs listeners en JS...");
              }}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold text-sm transition-colors flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Analizar problema</span>
            </button>
          </div>
        </div>
      )}

      {step === 'diff' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900">Encontré el posible problema</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {MOCK_RESPONSES.fixError.diagnosis}
              </p>
            </div>

            {/* Visual Code Diff Viewer */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Comparación visual de código (Diff)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Current Code Side */}
                <div className="bg-rose-950/20 border border-rose-300 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-800 border-b border-rose-200 pb-1">
                    <span>Código Actual (Con error)</span>
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  </div>
                  <pre className="font-mono text-xs text-slate-800 bg-white p-2.5 rounded border border-rose-200 overflow-x-auto">
                    <code>{MOCK_RESPONSES.fixError.jsDiffCurrent}</code>
                  </pre>
                </div>

                {/* Proposed Code Side */}
                <div className="bg-emerald-950/20 border border-emerald-300 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 border-b border-emerald-200 pb-1">
                    <span>Código Propuesto (Corregido)</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <pre className="font-mono text-xs text-slate-800 bg-white p-2.5 rounded border border-emerald-200 overflow-x-auto">
                    <code>{MOCK_RESPONSES.fixError.jsDiffProposed}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Why changed explanation */}
            <div className="p-3.5 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">¿Por qué cambió esto?</span>
              <p>{MOCK_RESPONSES.fixError.whyChanged}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => showToast("✓ Corrección de ID aplicada al proyecto.")}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Aplicar corrección
              </button>
              <button 
                onClick={() => {
                  setStep('form');
                  showToast("↩ Cambio rechazado.", "error");
                }}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Rechazar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================================
// TAREA 3 — MEJORAR DISEÑO (3 ALTERNATIVES EXPLORATION)
// ==========================================================
const DESIGN_ALTERNATIVES = {
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

function DesignPreview({ option, large = false }) {
  const frameSize = large ? "min-h-[320px] p-6" : "min-h-[210px] p-3";
  const labelClass = "block text-[10px] font-semibold text-slate-600 mb-1";
  const inputClass = "w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-400";

  if (option === 'A') {
    return (
      <div className={`rounded-lg bg-white border border-slate-200 flex items-center justify-center ${frameSize}`}>
        <div className={`w-full ${large ? 'max-w-sm space-y-6' : 'max-w-[190px] space-y-4'}`}>
          <div className="text-center space-y-1">
            <div className="text-sm font-bold text-slate-800">Crear cuenta</div>
            <div className="text-[10px] text-slate-400">Ingresa tus datos</div>
          </div>
          <div><span className={labelClass}>Correo electrónico</span><div className={inputClass}>nombre@correo.com</div></div>
          <div><span className={labelClass}>Contraseña</span><div className={inputClass}>••••••••</div></div>
          <div className="rounded-md bg-slate-800 text-center text-[10px] font-semibold text-white py-2">Registrarse</div>
        </div>
      </div>
    );
  }

  if (option === 'B') {
    return (
      <div className={`rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center ${frameSize}`}>
        <div className={`w-full rounded-lg bg-white border border-blue-100 shadow-sm ${large ? 'max-w-md p-5 space-y-4' : 'max-w-[220px] p-3 space-y-3'}`}>
          <div>
            <div className="text-sm font-bold text-slate-800">Crear cuenta</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Completa tus datos para continuar.</div>
          </div>
          <div>
            <span className={labelClass}>Correo electrónico</span>
            <div className={inputClass}>ejemplo@correo.com</div>
            <div className="text-[9px] text-blue-600 mt-1">Usa un correo al que tengas acceso.</div>
          </div>
          <div>
            <span className={labelClass}>Contraseña</span>
            <div className={inputClass}>8 caracteres mínimo</div>
            <div className="text-[9px] text-slate-400 mt-1">Incluye al menos 8 caracteres.</div>
          </div>
          <div className="rounded-md bg-cyan-600 text-center text-[10px] font-semibold text-white py-2">Registrarse</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg bg-gradient-to-br from-cyan-50 via-white to-indigo-50 border border-indigo-100 ${frameSize}`}>
      <div className="grid grid-cols-[28px_1fr] gap-2 max-w-md mx-auto">
        <div className="flex flex-col items-center pt-1">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">1</span>
          <span className="w-px flex-1 bg-indigo-200 my-1"></span>
          <span className="w-6 h-6 rounded-full bg-white border border-indigo-200 text-indigo-500 text-[9px] font-bold flex items-center justify-center">2</span>
        </div>
        <div className="space-y-2">
          <div className="rounded-lg bg-indigo-700 text-white p-2.5">
            <div className="text-[10px] font-bold">CREA TU CUENTA</div>
            <div className="text-[9px] text-indigo-100 mt-0.5">Paso 1 de 2 · Tus datos</div>
          </div>
          <div className="rounded-lg bg-white border border-cyan-100 shadow-sm p-2.5 space-y-2">
            <div><span className={labelClass}>Correo electrónico</span><div className={inputClass}>nombre@correo.com</div></div>
            <div><span className={labelClass}>Contraseña</span><div className={inputClass}>8 caracteres mínimo</div></div>
            <div className="rounded-md bg-indigo-600 text-center text-[10px] font-semibold text-white py-2">Continuar →</div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[9px] text-amber-900">💡 Usa un correo válido y una contraseña segura.</div>
        </div>
      </div>
    </div>
  );
}

function ImproveDesignPage({ selectedOption, setSelectedOption, analyzed, setAnalyzed, confirmed, setConfirmed, triggerAi, showToast }) {
  const [selectedAspects, setSelectedAspects] = useState([]);
  const [designNotes, setDesignNotes] = useState("El formulario se ve muy vacío y quiero que sea más fácil de entender para mis usuarios.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewOption, setPreviewOption] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const aspects = ["Colores", "Distribución", "Botones", "Formularios", "Responsive", "Accesibilidad", "Experiencia de usuario"];

  const updateAnalysisInput = () => {
    setAnalyzed(false);
    setConfirmed(false);
    setSelectedOption(null);
  };

  const toggleAspect = (aspect) => {
    updateAnalysisInput();
    setSelectedAspects(selectedAspects.includes(aspect) ? selectedAspects.filter(item => item !== aspect) : [...selectedAspects, aspect]);
  };

  const chooseOption = (option) => {
    setSelectedOption(option);
    setConfirmed(false);
    showToast(`✓ Has seleccionado la opción ${option} — ${DESIGN_ALTERNATIVES[option].name}.`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">¿Qué quieres mejorar en tu diseño?</h2>
          <p className="text-xs text-slate-500">Selecciona uno o más aspectos y describe qué te gustaría lograr.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {aspects.map((aspect) => {
            const isSelected = selectedAspects.includes(aspect);
            return (
              <button key={aspect} type="button" aria-pressed={isSelected} onClick={() => toggleAspect(aspect)} className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98] ${isSelected ? 'border-cyan-500 bg-cyan-50 text-cyan-900' : 'border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-700'}`}>
                {isSelected ? "✓ " : ""}{aspect}
              </button>
            );
          })}
        </div>

        <label htmlFor="design-notes" className="text-xs font-semibold text-slate-700 block">Cuéntame qué te gustaría cambiar</label>
        <textarea id="design-notes" rows={3} value={designNotes} onChange={(e) => { setDesignNotes(e.target.value); updateAnalysisInput(); }} className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />

        <button
          type="button"
          disabled={isAnalyzing || analyzed}
          onClick={() => {
            setIsAnalyzing(true);
            triggerAi(() => {
              setAnalyzed(true);
              setIsAnalyzing(false);
              showToast("✓ Análisis completado. Puedes ver, comparar y elegir una propuesta.");
            }, "Analizando diseño...");
          }}
          className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Layers className="w-4 h-4" />
          <span>{isAnalyzing ? "Analizando..." : analyzed ? "✓ Análisis completado" : "Analizar diseño"}</span>
        </button>
      </div>

      {analyzed && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-800">Tres propuestas para comparar</h3>
              <p className="text-xs text-slate-500 mt-1">Cada vista es una previsualización mock; puedes explorarla antes de elegir.</p>
            </div>
            <button type="button" aria-expanded={showComparison} onClick={() => setShowComparison(!showComparison)} className="px-4 py-2 border border-cyan-300 text-cyan-800 bg-white hover:bg-cyan-50 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">
              {showComparison ? "Ocultar comparación" : "Comparar alternativas"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["A", "B", "C"].map((option) => {
              const data = DESIGN_ALTERNATIVES[option];
              const isSelected = selectedOption === option;
              return (
                <article key={option} className={`bg-white rounded-xl p-4 border-2 transition-all flex flex-col ${isSelected ? 'border-cyan-500 ring-2 ring-cyan-200 shadow-md' : option === 'B' ? 'border-cyan-300 shadow-sm' : 'border-slate-200'}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Opción {option} — {data.name}</h4>
                      {option === 'B' && <span className="inline-block mt-1 px-2 py-0.5 bg-cyan-100 text-cyan-800 text-[9px] font-bold rounded-full">RECOMENDADO JR</span>}
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">Nivel: {data.difficulty}</span>
                      {isSelected && <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">✓ Seleccionada</span>}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed min-h-10">{data.description}</p>
                  <div className="my-3 rounded-lg overflow-hidden border border-slate-200" aria-label={`Previsualización de la opción ${option}`}>
                    <DesignPreview option={option} />
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setPreviewOption(option)} className="py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">Ver propuesta</button>
                    <button type="button" aria-pressed={isSelected} onClick={() => chooseOption(option)} className={`py-2 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98] ${isSelected ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-cyan-600 text-white hover:bg-cyan-500'}`}>
                      {isSelected ? "✓ Seleccionada" : `Elegir ${option}`}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {showComparison && (
            <section id="design-comparison" className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 animate-fade-in">
              <div>
                <h3 className="text-base font-bold text-slate-900">Comparación de alternativas</h3>
                <p className="text-xs text-slate-500">Compara la apariencia y el propósito de cada propuesta en paralelo.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {["A", "B", "C"].map((option) => {
                  const data = DESIGN_ALTERNATIVES[option];
                  return (
                    <div key={option} className={`rounded-lg border p-3 space-y-3 ${selectedOption === option ? 'border-cyan-400 bg-cyan-50/40' : 'border-slate-200 bg-slate-50'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-slate-800">Opción {option} — {data.name}</span>
                        <span className="text-[10px] text-slate-500">Complejidad: {data.complexity}</span>
                      </div>
                      <div className="rounded-md border border-slate-200 overflow-hidden"><DesignPreview option={option} /></div>
                      <dl className="space-y-2 text-[11px]">
                        <div><dt className="font-bold text-slate-700">Apariencia</dt><dd className="text-slate-600">{option === 'A' ? "Mucho espacio y pocos adornos." : option === 'B' ? "Campos claros con ayudas y ejemplos." : "Tarjetas, color e indicadores por etapa."}</dd></div>
                        <div><dt className="font-bold text-slate-700">Objetivo</dt><dd className="text-slate-600">{data.objective}</dd></div>
                        <div><dt className="font-bold text-slate-700">Ventajas</dt><dd className="text-slate-600">{data.advantages}</dd></div>
                        <div><dt className="font-bold text-slate-700">Posibles inconvenientes</dt><dd className="text-slate-600">{data.considerations}</dd></div>
                      </dl>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {selectedOption && (
            <section className="bg-white rounded-xl border-2 border-cyan-400 shadow-sm p-5 space-y-4 animate-fade-in" aria-live="polite">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Tu elección</h3>
                  <p className="text-sm font-semibold text-emerald-800 mt-1">✓ Opción {selectedOption} — {DESIGN_ALTERNATIVES[selectedOption].name}</p>
                  <p className="text-xs text-slate-600 mt-2">{DESIGN_ALTERNATIVES[selectedOption].description}</p>
                </div>
              </div>
              {confirmed && <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm font-semibold">✓ Diseño aplicado al proyecto. (Estado visual simulado)</div>}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowComparison(true)} className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">Comparar nuevamente</button>
                <button type="button" disabled={confirmed} onClick={() => { setConfirmed(true); showToast("✓ Diseño aplicado al proyecto."); }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-default disabled:opacity-70">
                  {confirmed ? "✓ Elección confirmada" : "Confirmar elección"}
                </button>
              </div>
            </section>
          )}
        </div>
      )}

      {previewOption && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setPreviewOption(null); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="design-preview-title" className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="design-preview-title" className="text-xl font-bold text-slate-900">Así se vería tu página</h2>
                  <p className="text-xs text-slate-500 mt-1">Opción {previewOption} — {DESIGN_ALTERNATIVES[previewOption].name}</p>
                </div>
                <button type="button" aria-label="Cerrar previsualización" onClick={() => setPreviewOption(null)} className="p-1 text-slate-400 hover:text-slate-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"><X className="w-5 h-5" /></button>
              </div>
              <DesignPreview option={previewOption} large />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950"><span className="font-bold block mb-1">Ventajas</span>{DESIGN_ALTERNATIVES[previewOption].advantages}</div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950"><span className="font-bold block mb-1">Consideraciones</span>{DESIGN_ALTERNATIVES[previewOption].considerations}</div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setPreviewOption(null)} className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">Volver a comparar</button>
                <button type="button" onClick={() => { chooseOption(previewOption); setPreviewOption(null); }} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">Elegir esta opción</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================================
// TAREA 4 — APRENDER UN CONCEPTO (ADAPTIVE EXPLANATION + QUIZ)
// ==========================================================
function LearnPage({ level, setLevel, quizAnswer, setQuizAnswer, showToast }) {
  const data = MOCK_RESPONSES.learn.asyncAwait;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Aprender Concepto</span>
            <h1 className="text-2xl font-bold text-slate-900">{data.title}</h1>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
            Modo Educativo Junior
          </span>
        </div>

        {/* Level selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase">¿Qué nivel tienes sobre este tema?</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'no_conozco', label: 'No conozco el concepto' },
              { id: 'visto_no_entiendo', label: 'Lo he visto pero no lo entiendo' },
              { id: 'conozco_basico', label: 'Conozco lo básico' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setLevel(item.id)}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                  level === item.id 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Junior Definition & Analogy */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-emerald-900 uppercase">Explicación Adaptada</h4>
          <p className="text-xs text-emerald-950 leading-relaxed font-medium">{data.simpleDef}</p>
          <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-emerald-800 block">Analogía del mundo real:</span>
            <p>{data.analogy}</p>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase">Ejemplo en código JavaScript</h4>
          <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto">
            <code>{data.codeExample}</code>
          </pre>
        </div>

        {/* COMPROBACIÓN DE COMPRENSIÓN QUIZ */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Comprueba si lo entendiste</span>
          </div>

          <p className="text-xs text-slate-700 font-medium">{data.quiz.question}</p>

          <div className="space-y-2">
            {data.quiz.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setQuizAnswer(opt)}
                className={`w-full text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                  quizAnswer?.id === opt.id 
                    ? (opt.correct ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold' : 'bg-rose-100 border-rose-500 text-rose-900 font-bold')
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span className="font-bold mr-2">{opt.id}.</span>
                {opt.text}
              </button>
            ))}
          </div>

          {/* Quiz Feedback */}
          {quizAnswer && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
              quizAnswer.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <span className="font-bold block text-sm mb-1">
                {quizAnswer.correct ? '✓ Correcto' : 'No exactamente'}
              </span>
              <p>{quizAnswer.correct ? data.quiz.explanationCorrect : data.quiz.explanationIncorrect}</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

// ==========================================================
// TAREA 5 — REVISAR CÓDIGO (AUDIT CHECKLIST & JUNIOR REPO)
// ==========================================================
function ReviewCodePage({ selectedItem, setSelectedItem, triggerAi, showToast }) {
  const [analyzed, setAnalyzed] = useState(false);
  const items = MOCK_RESPONSES.reviewCode;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">¿Qué aspectos quieres revisar?</h2>
          <p className="text-xs text-slate-500">Selecciona los criterios de calidad que CODE JR auditará en tu código.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Errores", "Código repetido", "Organización", "Accesibilidad", "Seguridad", "Rendimiento"].map((chk) => (
            <label key={chk} className="flex items-center space-x-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium cursor-pointer hover:bg-slate-100">
              <input type="checkbox" defaultChecked className="rounded text-purple-600 focus:ring-purple-500" />
              <span>{chk}</span>
            </label>
          ))}
        </div>

        <button
          onClick={() => {
            triggerAi(() => {
              setAnalyzed(true);
              showToast("✓ Auditoría completada. 3 hallazgos.");
            }, "Analizando AST y reglas de accesibilidad...");
          }}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2"
        >
          <Code2 className="w-4 h-4" />
          <span>Analizar código</span>
        </button>
      </div>

      {analyzed && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-base font-bold text-slate-800">Resultado de la revisión (3 aspectos encontrados)</h3>

          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                className={`p-4 rounded-xl border cursor-pointer transition-all bg-white shadow-sm hover:shadow ${
                  selectedItem?.id === item.id ? 'border-purple-500 ring-2 ring-purple-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">
                      {item.severity === 'yellow' ? '🟡' : item.severity === 'orange' ? '🟠' : '🟢'}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{item.type}</h4>
                      <p className="text-xs text-slate-500">{item.summary}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-purple-600 hover:underline">
                    {selectedItem?.id === item.id ? 'Ocultar explicación' : '¿Qué significa esto?'}
                  </span>
                </div>

                {/* Expanded Junior Explanation */}
                {selectedItem?.id === item.id && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs animate-fade-in">
                    <div className="p-3 bg-purple-50 text-purple-950 rounded-lg space-y-1">
                      <span className="font-bold block">Explicación Junior:</span>
                      <p>{item.juniorExp}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-950 rounded-lg space-y-1">
                      <span className="font-bold block">Recomendación CODE JR:</span>
                      <p>{item.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================================
// PANTALLA HISTORIAL Y EVOLUCIÓN DEL PROYECTO
// ==========================================================
function HistoryPage({ projectContext, showToast }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs text-slate-400 uppercase font-bold">Evolución de Decisiones</span>
          <h1 className="text-2xl font-bold text-slate-900">{projectContext.name}</h1>
          <p className="text-xs text-slate-500">Historial continuo de cambios y decisiones tomadas en el proyecto.</p>
        </div>

        {/* Timeline */}
        <div className="space-y-4 pt-2">
          {[
            { step: 1, title: "Creación del formulario", date: "Hace 2 horas", status: "Completado" },
            { step: 2, title: "Validación de correo electrónico", date: "Hace 1 hora", status: "Completado" },
            { step: 3, title: "Corrección de listener en botón menuBtn", date: "Hace 30 min", status: "Completado" },
            { step: 4, title: "Mejora de interfaz visual (Opción B)", date: "Hace 10 min", status: "En progreso" }
          ].map((item) => (
            <div key={item.step} className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                {item.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Estado: {item.status}</p>
              </div>
              <button 
                onClick={() => showToast(`Viendo estado de la etapa ${item.step}.`, "info")}
                className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded text-xs font-semibold hover:bg-slate-100"
              >
                Ver etapa
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ==========================================================
// MODAL: CONTEXTO "LO QUE CODE JR RECUERDA" (CHEN ET AL. 2026)
// ==========================================================
function ContextModal({ projectContext, setProjectContext, onClose, showToast }) {
  const [editingTech, setEditingTech] = useState(projectContext.technologies.join(", "));

  const handleSave = () => {
    const updatedTechs = editingTech.split(",").map(t => t.trim());
    setProjectContext({ ...projectContext, technologies: updatedTechs });
    showToast("✓ Contexto de CODE JR actualizado exitosamente.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2 text-blue-600">
            <Cpu className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 text-base">Lo que CODE JR recuerda</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          CODE JR utiliza esta memoria persistente para no pedirte la misma información dos veces.
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-700 block">Proyecto actual:</span>
            <span className="text-slate-600">{projectContext.name}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-700 block">Tarea en curso:</span>
            <span className="text-slate-600">{projectContext.currentTask}</span>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Tecnologías recordadas (Editables):</label>
            <input 
              type="text" 
              value={editingTech}
              onChange={(e) => setEditingTech(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded text-xs font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
          >
            Guardar Memoria Contextual
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================================
// MODAL: FUNDAMENTACIÓN DE DISEÑO HCI (ACADEMIC RESEARCH)
// ==========================================================
function HciJustificationModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Fundamentación de Diseño HCI</h2>
              <p className="text-xs text-indigo-300">Investigación Académica aplicada en CODE JR</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Las características de la interfaz CODE JR se han derivado de conceptos clave introducidos en la literatura reciente de Interacción Humano-Computador para asistentes de programación:
          </p>

          <div className="space-y-3">
            {HCI_PAPER_CITATIONS.map((cite, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-indigo-700 text-sm">{cite.paper}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-900 rounded">
                    {cite.concept}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-800">{cite.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  <strong>Aplicación en CODE JR:</strong> {cite.application}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            Entendido y Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
