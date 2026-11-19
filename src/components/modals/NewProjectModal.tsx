import { X, FileText } from 'lucide-react';
import { useState } from 'react';
import type { NewProjectModalProps } from '../../types';

export default function NewProjectModal({ onClose, onCreate }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [technologies, setTechnologies] = useState(["HTML", "CSS", "JavaScript"]);
  const technologyOptions = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS"];

  const toggleTechnology = (technology) => {
    setTechnologies((current) => current.includes(technology)
      ? current.filter((item) => item !== technology)
      : [...current, technology]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !objective.trim()) return;
    onCreate({ name: name.trim(), objective: objective.trim(), technologies });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="create-project-title">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Nuevo espacio de trabajo</span>
            <h2 id="create-project-title" className="text-xl font-bold text-slate-900 mt-1">Crear nuevo proyecto</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="new-project-name" className="block text-xs font-bold text-slate-700">Nombre del proyecto</label>
            <input id="new-project-name" type="text" required autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Ej. Mi portafolio" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="new-project-objective" className="block text-xs font-bold text-slate-700">Objetivo principal</label>
            <input id="new-project-objective" type="text" required value={objective} onChange={(event) => setObjective(event.target.value)} placeholder="Ej. Aprender eventos en JS" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400" />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-xs font-bold text-slate-700">Tecnologías</legend>
            <div className="flex flex-wrap gap-2">
              {technologyOptions.map((technology) => {
                const isSelected = technologies.includes(technology);
                return (
                  <button key={technology} type="button" aria-pressed={isSelected} onClick={() => toggleTechnology(technology)} className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isSelected ? 'bg-blue-100 border-blue-400 text-blue-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                    {isSelected ? "✓ " : "+ "}{technology}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-700">Archivos iniciales</span>
            <div className="flex flex-wrap gap-2">
              {["index.html", "style.css", "script.js"].map((file) => (
                <span key={file} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-mono">
                  <FileText className="w-3 h-3 text-blue-500" />{file}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">Cancelar</button>
          <button type="submit" disabled={!name.trim() || !objective.trim()} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">Crear proyecto</button>
        </div>
      </form>
    </div>
  );
}
