import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { AppTab, CodeInspection, DesignOption, FixForm, FixStep, GenerateForm, GenerateStep, LearningLevel, NewProjectInput, Project, QuizOption, ReviewItem, ToastMessage, ToastType } from './types';
import { createStarterFileContents, INITIAL_PROJECT_CONTEXT } from './data/mockProjects';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import NewProjectModal from './components/modals/NewProjectModal';
import ContextModal from './components/modals/ContextModal';
import HciJustificationModal from './components/modals/HciJustificationModal';
import HomeView from './features/home/HomeView';
import ProjectView from './features/project/ProjectView';
import HistoryView from './features/project/HistoryView';
import GenerateFeatureView from './features/generate/GenerateFeatureView';
import FixErrorView from './features/fix-error/FixErrorView';
import ImproveDesignView from './features/improve-design/ImproveDesignView';
import LearnConceptView from './features/learn/LearnConceptView';
import ReviewCodeView from './features/review-code/ReviewCodeView';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [projects, setProjects] = useState<Project[]>([INITIAL_PROJECT_CONTEXT]);
  const [activeProjectId, setActiveProjectId] = useState(INITIAL_PROJECT_CONTEXT.id);
  const projectContext = projects.find((project) => project.id === activeProjectId) || projects[0];
  const setProjectContext = (updatedContext: Project) => {
    setProjects((currentProjects) => currentProjects.map((project) => (
      project.id === activeProjectId ? { ...updatedContext, id: activeProjectId } : project
    )));
  };
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isHciModalOpen, setIsHciModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analizando solicitud...");

  // Task-specific persistence states
  const [generateStep, setGenerateStep] = useState<GenerateStep>('form'); // Three stages: form, confirm, result
  const [generateForm, setGenerateForm] = useState<GenerateForm>({
    objective: "",
    behaviors: [] as string[],
    location: "",
    techs: [] as string[],
    constraints: "",
    explanationLevel: "",
    additionalDetails: "",
    directMode: true,
    directRequest: "",
    requestDraft: ""
  });

  const [fixStep, setFixStep] = useState<FixStep>('form'); // 'form', 'result', 'diff'
  const [fixForm, setFixForm] = useState<FixForm>({
    problem: "",
    expected: "",
    actual: "",
    code: "",
    errorMessage: ""
  });

  const [designOption, setDesignOption] = useState<DesignOption>(null);
  const [designAnalyzed, setDesignAnalyzed] = useState(false);
  const [designConfirmed, setDesignConfirmed] = useState(false);
  const [learnLevel, setLearnLevel] = useState<LearningLevel>('visto_no_entiendo');
  const [quizAnswer, setQuizAnswer] = useState<QuizOption | null>(null);
  const [selectedReviewItem, setSelectedReviewItem] = useState<ReviewItem | null>(null);

  // Selected code interaction tooltip
  const [codeInspection, setCodeInspection] = useState<CodeInspection | null>(null);

  // Toast notification timer helper
  const showToast = (text: string, type: ToastType = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Simulated Async AI Response wrapper
  const triggerSimulatedAi = (onComplete: () => void, text = "CODE JR procesando solicitud...") => {
    setLoadingText(text);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 900);
  };

  const selectProject = (project: Project) => {
    setActiveProjectId(project.id);
    setIsProjectDropdownOpen(false);
    showToast(`✓ Proyecto '${project.name}' seleccionado.`);
  };

  const createProject = ({ name, objective, technologies }: NewProjectInput) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      objective,
      technologies,
      files: ["index.html", "style.css", "script.js"],
      fileContents: createStarterFileContents(name),
      currentTask: "Inicio del proyecto",
      decisions: [
        { id: 1, title: "Objetivo principal", desc: objective, status: "confirmed" },
        { id: 2, title: "Tecnologías iniciales", desc: technologies.length ? technologies.join(" + ") : "Por definir", status: "confirmed" }
      ],
      history: [{ step: 1, title: "Creación del proyecto", date: "Ahora", status: "Completado" }]
    };

    setProjects((currentProjects) => [...currentProjects, newProject]);
    setActiveProjectId(newProject.id);
    setIsCreateProjectModalOpen(false);
    setActiveTab('project');
    showToast(`✓ Proyecto '${name}' creado y seleccionado`);
  };

  const applyProjectCode = (fileName: string, code: string, previousCode?: string) => {
    setProjects((currentProjects) => currentProjects.map((project) => {
      if (project.id !== activeProjectId) return project;

      const currentContent = project.fileContents[fileName] ?? '';
      let updatedContent = currentContent;

      if (previousCode && currentContent.includes(previousCode)) {
        updatedContent = currentContent.replace(previousCode, code);
      } else if (!currentContent.includes(code)) {
        updatedContent = [currentContent.trimEnd(), code.trim()].filter(Boolean).join('\n\n');
      }

      return {
        ...project,
        files: project.files.includes(fileName) ? project.files : [...project.files, fileName],
        fileContents: { ...project.fileContents, [fileName]: updatedContent }
      };
    }));
    showToast(`✓ Código integrado correctamente en ${fileName}`);
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        <Topbar projectContext={projectContext} projects={projects} activeProjectId={activeProjectId} isProjectDropdownOpen={isProjectDropdownOpen} setIsProjectDropdownOpen={setIsProjectDropdownOpen} setIsCreateProjectModalOpen={setIsCreateProjectModalOpen} selectProject={selectProject} setIsContextModalOpen={setIsContextModalOpen} />
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
            <HomeView 
              setActiveTab={setActiveTab} 
              projectContext={projectContext} 
            />
          )}

          {activeTab === 'project' && (
            <ProjectView 
              projectContext={projectContext}
              setProjectContext={setProjectContext}
              showToast={showToast}
              onNewProject={() => setIsCreateProjectModalOpen(true)}
            />
          )}

          {activeTab === 'generate' && (
            <GenerateFeatureView 
              step={generateStep}
              setStep={setGenerateStep}
              form={generateForm}
              setForm={setGenerateForm}
              triggerAi={triggerSimulatedAi}
              showToast={showToast}
              applyProjectCode={applyProjectCode}
              codeInspection={codeInspection}
              setCodeInspection={setCodeInspection}
            />
          )}

          {activeTab === 'fix' && (
            <FixErrorView 
              step={fixStep}
              setStep={setFixStep}
              form={fixForm}
              setForm={setFixForm}
              triggerAi={triggerSimulatedAi}
              showToast={showToast}
              applyProjectCode={applyProjectCode}
            />
          )}

          {activeTab === 'design' && (
            <ImproveDesignView 
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
            <LearnConceptView 
              level={learnLevel}
              setLevel={setLearnLevel}
              quizAnswer={quizAnswer}
              setQuizAnswer={setQuizAnswer}
              showToast={showToast}
            />
          )}

          {activeTab === 'review' && (
            <ReviewCodeView 
              selectedItem={selectedReviewItem}
              setSelectedItem={setSelectedReviewItem}
              triggerAi={triggerSimulatedAi}
              showToast={showToast}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView 
              projectContext={projectContext}
              showToast={showToast}
            />
          )}
        </main>
      </div>
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

      {isCreateProjectModalOpen && (
        <NewProjectModal
          onClose={() => setIsCreateProjectModalOpen(false)}
          onCreate={createProject}
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
