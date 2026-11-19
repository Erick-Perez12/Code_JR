import type { Dispatch, SetStateAction } from "react";

export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type AppTab = "home" | "project" | "generate" | "fix" | "design" | "learn" | "review" | "history";
export type GenerateStep = "form" | "confirm" | "result";
export type FixStep = "form" | "result" | "diff";
export type LearningLevel = "no_conozco" | "visto_no_entiendo" | "conozco_basico";
export type DesignOptionKey = "A" | "B" | "C";
export type DesignOption = DesignOptionKey | null;
export type DecisionStatus = "confirmed" | "rejected";
export type ToastType = "success" | "error" | "info";

export interface Decision {
  id: number;
  title: string;
  desc: string;
  status: DecisionStatus;
}

export interface HistoryStep {
  step: number;
  title: string;
  date: string;
  status: string;
}

export interface Project {
  id: string;
  name: string;
  objective: string;
  technologies: string[];
  files: string[];
  fileContents: Record<string, string>;
  currentTask: string;
  decisions: Decision[];
  history: HistoryStep[];
}

export interface GenerateForm {
  objective: string;
  behaviors: string[];
  location: string;
  techs: string[];
  constraints: string;
  explanationLevel: string;
  additionalDetails: string;
  directMode: boolean;
  directRequest: string;
  requestDraft: string;
}

export interface FixForm {
  problem: string;
  expected: string;
  actual: string;
  code: string;
  errorMessage: string;
}

export interface CodeInspection {
  lineIndex: number;
  text: string;
}

export interface QuizOption {
  id: string;
  text: string;
  correct?: boolean;
}

export interface LearningTopic {
  title: string;
  simpleDef: string;
  analogy: string;
  codeExample: string;
  quiz: {
    question: string;
    options: QuizOption[];
    explanationCorrect: string;
    explanationIncorrect: string;
  };
}

export interface ReviewItem {
  id: string;
  severity: "yellow" | "orange" | "green";
  type: string;
  summary: string;
  juniorExp: string;
  recommendation: string;
}

export interface DesignAlternative {
  name: string;
  description: string;
  difficulty: string;
  objective: string;
  complexity: string;
  advantages: string;
  considerations: string;
}

export interface HciCitation {
  paper: string;
  title: string;
  concept: string;
  application: string;
}

export interface GenerateMockResponse {
  problem: string;
  code: string;
  explanation: string;
}

export interface FixErrorMockResponse {
  diagnosis: string;
  currentCode: string;
  proposedCode: string;
  jsDiffCurrent: string;
  jsDiffProposed: string;
  whyChanged: string;
}

export interface MockResponses {
  generate: GenerateMockResponse;
  fixError: FixErrorMockResponse;
  reviewCode: ReviewItem[];
}

export interface ToastMessage {
  text: string;
  type: ToastType;
}

export type ShowToast = (text: string, type?: ToastType) => void;
export type SimulatedAction = (onComplete: () => void, text?: string) => void;
export type ApplyProjectCode = (fileName: string, code: string, previousCode?: string) => void;

export interface NewProjectInput {
  name: string;
  objective: string;
  technologies: string[];
}

export interface HomeViewProps {
  setActiveTab: StateSetter<AppTab>;
  projectContext: Project;
}

export interface ProjectViewProps {
  projectContext: Project;
  setProjectContext: (project: Project) => void;
  showToast: ShowToast;
  onNewProject: () => void;
}

export interface HistoryViewProps {
  projectContext: Project;
  showToast: ShowToast;
}

export interface GenerateFeatureViewProps {
  step: GenerateStep;
  setStep: StateSetter<GenerateStep>;
  form: GenerateForm;
  setForm: StateSetter<GenerateForm>;
  triggerAi: SimulatedAction;
  showToast: ShowToast;
  applyProjectCode: ApplyProjectCode;
  codeInspection: CodeInspection | null;
  setCodeInspection: StateSetter<CodeInspection | null>;
}

export interface FixErrorViewProps {
  step: FixStep;
  setStep: StateSetter<FixStep>;
  form: FixForm;
  setForm: StateSetter<FixForm>;
  triggerAi: SimulatedAction;
  showToast: ShowToast;
  applyProjectCode: ApplyProjectCode;
}

export interface ImproveDesignViewProps {
  selectedOption: DesignOption;
  setSelectedOption: StateSetter<DesignOption>;
  analyzed: boolean;
  setAnalyzed: StateSetter<boolean>;
  confirmed: boolean;
  setConfirmed: StateSetter<boolean>;
  triggerAi: SimulatedAction;
  showToast: ShowToast;
}

export interface LearnConceptViewProps {
  level: LearningLevel;
  setLevel: StateSetter<LearningLevel>;
  quizAnswer: QuizOption | null;
  setQuizAnswer: StateSetter<QuizOption | null>;
  showToast: ShowToast;
}

export interface ReviewCodeViewProps {
  selectedItem: ReviewItem | null;
  setSelectedItem: StateSetter<ReviewItem | null>;
  triggerAi: SimulatedAction;
  showToast: ShowToast;
}

export interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: StateSetter<AppTab>;
}

export interface TopbarProps {
  projectContext: Project;
  projects: Project[];
  activeProjectId: string;
  isProjectDropdownOpen: boolean;
  setIsProjectDropdownOpen: StateSetter<boolean>;
  setIsCreateProjectModalOpen: StateSetter<boolean>;
  selectProject: (project: Project) => void;
  setIsContextModalOpen: StateSetter<boolean>;
}

export interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (project: NewProjectInput) => void;
}

export interface ContextModalProps {
  projectContext: Project;
  setProjectContext: (project: Project) => void;
  onClose: () => void;
  showToast: ShowToast;
}

export interface HciJustificationModalProps {
  onClose: () => void;
}
