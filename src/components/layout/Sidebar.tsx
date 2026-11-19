import { BookOpen, Code2, AlertTriangle, Sparkles, History, ChevronRight, FileText, Layers, Compass } from 'lucide-react';
import type { SidebarProps } from '../../types';

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <>
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
    </>
  );
}
