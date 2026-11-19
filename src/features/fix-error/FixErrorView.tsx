import { AlertTriangle } from 'lucide-react';
import type { FixErrorViewProps } from '../../types';
import { MOCK_RESPONSES } from '../../data/mockResponses';

export default function FixErrorView({ step, setStep, form, setForm, triggerAi, showToast, applyProjectCode }: FixErrorViewProps) {
  const guidedDetails = [
    form.expected.trim() ? `¿Qué esperabas? ${form.expected.trim()}` : "",
    form.actual.trim() ? `¿Qué ocurre realmente? ${form.actual.trim()}` : "",
    form.code.trim() ? `Código relacionado:\n${form.code.trim()}` : "",
    form.errorMessage.trim() ? `Mensaje de consola: ${form.errorMessage.trim()}` : ""
  ].filter(Boolean);
  const completedProblem = [form.problem.trim(), ...guidedDetails].filter(Boolean).join("\n\n");

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-bold text-slate-800">Tarea:</span>
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-xs font-semibold">Corregir un Problema</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
          <span className={step === 'form' ? 'text-rose-600 font-bold' : ''}>1. Descripción de la falla</span>
          <span>→</span>
          <span className={step === 'diff' ? 'text-rose-600 font-bold' : ''}>2. Diagnóstico y Diff Visual</span>
        </div>
      </div>

      {step === 'form' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Cuéntame qué está pasando</h2>
            <p className="text-xs text-slate-500 mt-1">Cuéntalo con tus propias palabras. Si quieres, puedes agregar más detalles en las preguntas opcionales.</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="fix-problem" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Describe tu problema o pega tu código/error aquí</label>
            <textarea
              id="fix-problem"
              rows={8}
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              className="w-full min-h-48 px-3.5 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 leading-relaxed font-mono focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 resize-y"
              placeholder={'Describe qué sucede, pega el código relacionado o copia aquí el mensaje de error.\n\nEjemplo: Al hacer clic en el botón no sucede nada. La consola muestra un error en addEventListener.'}
            />
          </div>

          <details className="rounded-lg border border-slate-200 bg-slate-50">
            <summary className="px-4 py-3 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 rounded-lg">
              🔍 Ayúdame a detallar el problema (Opcional)
            </summary>
            <div className="p-4 pt-1 space-y-4">
              <p className="text-xs text-slate-500">Completa solo lo que ayude a explicar el problema. Estos detalles se agregarán a tu descripción.</p>

              <div className="space-y-1.5">
                <label htmlFor="fix-expected" className="text-xs font-bold text-slate-700 uppercase">¿Qué esperabas?</label>
                <input
                  id="fix-expected"
                  type="text"
                  value={form.expected}
                  onChange={(e) => setForm({ ...form, expected: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  placeholder="Ej. Al hacer clic, debía abrirse el menú."
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fix-actual" className="text-xs font-bold text-slate-700 uppercase">¿Qué ocurre realmente?</label>
                <input
                  id="fix-actual"
                  type="text"
                  value={form.actual}
                  onChange={(e) => setForm({ ...form, actual: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  placeholder="Ej. Al hacer clic no sucede nada."
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fix-code" className="text-xs font-bold text-slate-700 uppercase">Código relacionado</label>
                <textarea
                  id="fix-code"
                  rows={4}
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-mono focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  placeholder={'Pega aquí el fragmento relacionado.\nEj. boton.addEventListener("click", abrirMenu);'}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fix-console" className="text-xs font-bold text-slate-700 uppercase">Mensaje de consola</label>
                <input
                  id="fix-console"
                  type="text"
                  value={form.errorMessage}
                  onChange={(e) => setForm({ ...form, errorMessage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-mono text-rose-700 focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  placeholder="Pega el mensaje de error si aparece uno."
                />
              </div>
            </div>
          </details>

          {guidedDetails.length > 0 && (
            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 space-y-1.5 animate-fade-in">
              <span className="block text-xs font-bold uppercase tracking-wider text-indigo-800">Descripción complementada</span>
              <p className="text-sm leading-relaxed text-indigo-950 whitespace-pre-wrap">{completedProblem}</p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                triggerAi(() => {
                  setStep('diff');
                  showToast("✓ Análisis finalizado. Error localizado.");
                }, "Comparando selectores HTML vs listeners en JS...");
              }}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold text-sm transition-colors flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Analizar problema</span>
            </button>
          </div>
        </div>
      )}

      {step === 'diff' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900">Encontré el posible problema</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {MOCK_RESPONSES.fixError.diagnosis}
              </p>
            </div>

            {/* Visual Code Diff Viewer */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Comparación visual de código (Diff)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Current Code Side */}
                <div className="bg-rose-950/20 border border-rose-300 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-800 border-b border-rose-200 pb-1">
                    <span>Código Actual (Con error)</span>
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  </div>
                  <pre className="font-mono text-xs text-slate-800 bg-white p-2.5 rounded border border-rose-200 overflow-x-auto">
                    <code>{MOCK_RESPONSES.fixError.jsDiffCurrent}</code>
                  </pre>
                </div>

                {/* Proposed Code Side */}
                <div className="bg-emerald-950/20 border border-emerald-300 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 border-b border-emerald-200 pb-1">
                    <span>Código Propuesto (Corregido)</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <pre className="font-mono text-xs text-slate-800 bg-white p-2.5 rounded border border-emerald-200 overflow-x-auto">
                    <code>{MOCK_RESPONSES.fixError.jsDiffProposed}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Why changed explanation */}
            <div className="p-3.5 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">¿Por qué cambió esto?</span>
              <p>{MOCK_RESPONSES.fixError.whyChanged}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => applyProjectCode("script.js", MOCK_RESPONSES.fixError.jsDiffProposed, MOCK_RESPONSES.fixError.jsDiffCurrent)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Aplicar corrección
              </button>
              <button 
                onClick={() => {
                  setStep('form');
                  showToast("↩ Cambio rechazado.", "error");
                }}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Rechazar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================================
// TAREA 3 — MEJORAR DISEÑO (3 ALTERNATIVES EXPLORATION)
// ==========================================================
