import { BookOpen, Code2, AlertTriangle, Sparkles, ChevronRight, Play, Layers, RotateCcw, Compass } from 'lucide-react';
import type { HomeViewProps } from '../../types';

export default function HomeView({ setActiveTab, projectContext }: HomeViewProps) {
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
            <p className="text-xs text-slate-400">{projectContext.history.length === 1 ? "Proyecto creado recientemente" : `Último estado: Paso 1 completado en ${projectContext.name}`}</p>
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
