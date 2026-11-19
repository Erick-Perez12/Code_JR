import { X, Award } from 'lucide-react';
import type { HciJustificationModalProps } from '../../types';
import { HCI_PAPER_CITATIONS } from '../../data/mockLearning';

export default function HciJustificationModal({ onClose }: HciJustificationModalProps) {
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
