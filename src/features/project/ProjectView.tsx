import { CheckCircle2, FileText, X } from 'lucide-react';
import { useState } from 'react';
import type { ProjectViewProps } from '../../types';

export default function ProjectView({ projectContext, setProjectContext, showToast, onNewProject }: ProjectViewProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const selectedFileContent = selectedFile ? projectContext.fileContents[selectedFile] ?? '' : '';
  const selectedFileLines = selectedFileContent.split('\n');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{projectContext.name}</h1>
            <p className="text-sm text-slate-500 mt-0.5">{projectContext.objective}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
            <button
              type="button"
              onClick={onNewProject}
              className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              + Nuevo proyecto
            </button>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              En Desarrollo Activo
            </span>
          </div>
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
              {projectContext.files.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedFile(f)}
                  aria-label={`Abrir ${f}`}
                  className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 font-mono text-xs border border-blue-200 flex items-center space-x-1 hover:bg-blue-100 hover:border-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <FileText className="w-3 h-3" />
                  <span>{f}</span>
                </button>
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

      {selectedFile && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedFile(null); }}
        >
          <section className="w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="project-file-title">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <h2 id="project-file-title" className="font-mono text-sm font-semibold text-slate-100 truncate">{selectedFile}</h2>
                  <p className="text-[11px] text-slate-400">{projectContext.name}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedFile(null)} aria-label="Cerrar editor" className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[calc(85vh-3.5rem)] overflow-auto bg-slate-950 py-4 font-mono text-xs leading-6">
              <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] min-w-max">
                <pre aria-hidden="true" className="select-none border-r border-slate-800 pr-3 pl-2 text-right text-slate-600">{selectedFileLines.map((_, index) => `${index + 1}\n`)}</pre>
                <pre className="px-4 text-slate-200"><code>{selectedFileContent || '// Este archivo todavía está vacío.'}</code></pre>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// ==========================================================
// TAREA 1 — GENERAR UNA FUNCIONALIDAD (6 OPTIONAL GUIDE QUESTIONS, 3 STAGES)
// ==========================================================
