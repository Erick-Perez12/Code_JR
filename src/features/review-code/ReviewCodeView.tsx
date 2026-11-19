import { Code2 } from 'lucide-react';
import { useState } from 'react';
import type { ReviewCodeViewProps } from '../../types';
import { MOCK_RESPONSES } from '../../data/mockResponses';

export default function ReviewCodeView({ selectedItem, setSelectedItem, triggerAi, showToast }: ReviewCodeViewProps) {
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
