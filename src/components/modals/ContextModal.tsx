import { X, Cpu } from 'lucide-react';
import { useState } from 'react';
import type { ContextModalProps } from '../../types';

export default function ContextModal({ projectContext, setProjectContext, onClose, showToast }: ContextModalProps) {
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
