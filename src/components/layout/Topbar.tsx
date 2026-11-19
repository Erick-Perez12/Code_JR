import { Check, ChevronDown, Cpu } from 'lucide-react';
import type { TopbarProps } from '../../types';

export default function Topbar({ projectContext, projects, activeProjectId, isProjectDropdownOpen, setIsProjectDropdownOpen, setIsCreateProjectModalOpen, selectProject, setIsContextModalOpen }: TopbarProps) {
  return (
    <>
        {/* TOP SYSTEM BAR */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isProjectDropdownOpen}
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="font-bold text-slate-900 text-sm flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
              >
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200">Proyecto Activo:</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="max-w-40 truncate">{projectContext.name}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProjectDropdownOpen && (
                <div role="menu" className="absolute left-0 top-full mt-2 w-72 max-w-[90vw] bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-40 animate-fade-in">
                  <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Proyectos guardados</p>
                  <div className="max-h-64 overflow-y-auto">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        role="menuitem"
                        onClick={() => selectProject(project)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start justify-between gap-3 transition-colors ${project.id === activeProjectId ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold truncate">{project.name}</span>
                          <span className="block text-[11px] text-slate-500 truncate">{project.objective}</span>
                        </span>
                        {project.id === activeProjectId && <Check className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => { setIsProjectDropdownOpen(false); setIsCreateProjectModalOpen(true); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                    >
                      + Crear nuevo proyecto
                    </button>
                  </div>
                </div>
              )}
            </div>
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
    </>
  );
}
