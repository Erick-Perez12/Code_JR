import { CheckCircle2, X, Layers } from 'lucide-react';
import { useState } from 'react';
import type { ImproveDesignViewProps } from '../../types';
import { DESIGN_ALTERNATIVES, MOCK_RESPONSES } from '../../data/mockResponses';

function DesignPreview({ option, large = false }) {
  const frameSize = large ? "min-h-[320px] p-6" : "min-h-[210px] p-3";
  const labelClass = "block text-[10px] font-semibold text-slate-600 mb-1";
  const inputClass = "w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-400";

  if (option === 'A') {
    return (
      <div className={`rounded-lg bg-white border border-slate-200 flex items-center justify-center ${frameSize}`}>
        <div className={`w-full ${large ? 'max-w-sm space-y-6' : 'max-w-[190px] space-y-4'}`}>
          <div className="text-center space-y-1">
            <div className="text-sm font-bold text-slate-800">Crear cuenta</div>
            <div className="text-[10px] text-slate-400">Ingresa tus datos</div>
          </div>
          <div><span className={labelClass}>Correo electrónico</span><div className={inputClass}>nombre@correo.com</div></div>
          <div><span className={labelClass}>Contraseña</span><div className={inputClass}>••••••••</div></div>
          <div className="rounded-md bg-slate-800 text-center text-[10px] font-semibold text-white py-2">Registrarse</div>
        </div>
      </div>
    );
  }

  if (option === 'B') {
    return (
      <div className={`rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center ${frameSize}`}>
        <div className={`w-full rounded-lg bg-white border border-blue-100 shadow-sm ${large ? 'max-w-md p-5 space-y-4' : 'max-w-[220px] p-3 space-y-3'}`}>
          <div>
            <div className="text-sm font-bold text-slate-800">Crear cuenta</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Completa tus datos para continuar.</div>
          </div>
          <div>
            <span className={labelClass}>Correo electrónico</span>
            <div className={inputClass}>ejemplo@correo.com</div>
            <div className="text-[9px] text-blue-600 mt-1">Usa un correo al que tengas acceso.</div>
          </div>
          <div>
            <span className={labelClass}>Contraseña</span>
            <div className={inputClass}>8 caracteres mínimo</div>
            <div className="text-[9px] text-slate-400 mt-1">Incluye al menos 8 caracteres.</div>
          </div>
          <div className="rounded-md bg-cyan-600 text-center text-[10px] font-semibold text-white py-2">Registrarse</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg bg-gradient-to-br from-cyan-50 via-white to-indigo-50 border border-indigo-100 ${frameSize}`}>
      <div className="grid grid-cols-[28px_1fr] gap-2 max-w-md mx-auto">
        <div className="flex flex-col items-center pt-1">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">1</span>
          <span className="w-px flex-1 bg-indigo-200 my-1"></span>
          <span className="w-6 h-6 rounded-full bg-white border border-indigo-200 text-indigo-500 text-[9px] font-bold flex items-center justify-center">2</span>
        </div>
        <div className="space-y-2">
          <div className="rounded-lg bg-indigo-700 text-white p-2.5">
            <div className="text-[10px] font-bold">CREA TU CUENTA</div>
            <div className="text-[9px] text-indigo-100 mt-0.5">Paso 1 de 2 · Tus datos</div>
          </div>
          <div className="rounded-lg bg-white border border-cyan-100 shadow-sm p-2.5 space-y-2">
            <div><span className={labelClass}>Correo electrónico</span><div className={inputClass}>nombre@correo.com</div></div>
            <div><span className={labelClass}>Contraseña</span><div className={inputClass}>8 caracteres mínimo</div></div>
            <div className="rounded-md bg-indigo-600 text-center text-[10px] font-semibold text-white py-2">Continuar →</div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[9px] text-amber-900">💡 Usa un correo válido y una contraseña segura.</div>
        </div>
      </div>
    </div>
  );
}

export default function ImproveDesignView({ selectedOption, setSelectedOption, analyzed, setAnalyzed, confirmed, setConfirmed, triggerAi, showToast }: ImproveDesignViewProps) {
  const [selectedAspects, setSelectedAspects] = useState([]);
  const [designNotes, setDesignNotes] = useState("El formulario se ve muy vacío y quiero que sea más fácil de entender para mis usuarios.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewOption, setPreviewOption] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const aspects = ["Colores", "Distribución", "Botones", "Formularios", "Responsive", "Accesibilidad", "Experiencia de usuario"];

  const updateAnalysisInput = () => {
    setAnalyzed(false);
    setConfirmed(false);
    setSelectedOption(null);
  };

  const toggleAspect = (aspect) => {
    updateAnalysisInput();
    setSelectedAspects(selectedAspects.includes(aspect) ? selectedAspects.filter(item => item !== aspect) : [...selectedAspects, aspect]);
  };

  const chooseOption = (option) => {
    setSelectedOption(option);
    setConfirmed(false);
    showToast(`✓ Has seleccionado la opción ${option} — ${DESIGN_ALTERNATIVES[option].name}.`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">¿Qué quieres mejorar en tu diseño?</h2>
          <p className="text-xs text-slate-500">Selecciona uno o más aspectos y describe qué te gustaría lograr.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {aspects.map((aspect) => {
            const isSelected = selectedAspects.includes(aspect);
            return (
              <button key={aspect} type="button" aria-pressed={isSelected} onClick={() => toggleAspect(aspect)} className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98] ${isSelected ? 'border-cyan-500 bg-cyan-50 text-cyan-900' : 'border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-700'}`}>
                {isSelected ? "✓ " : ""}{aspect}
              </button>
            );
          })}
        </div>

        <label htmlFor="design-notes" className="text-xs font-semibold text-slate-700 block">Cuéntame qué te gustaría cambiar</label>
        <textarea id="design-notes" rows={3} value={designNotes} onChange={(e) => { setDesignNotes(e.target.value); updateAnalysisInput(); }} className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />

        <button
          type="button"
          disabled={isAnalyzing || analyzed}
          onClick={() => {
            setIsAnalyzing(true);
            triggerAi(() => {
              setAnalyzed(true);
              setIsAnalyzing(false);
              showToast("✓ Análisis completado. Puedes ver, comparar y elegir una propuesta.");
            }, "Analizando diseño...");
          }}
          className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Layers className="w-4 h-4" />
          <span>{isAnalyzing ? "Analizando..." : analyzed ? "✓ Análisis completado" : "Analizar diseño"}</span>
        </button>
      </div>

      {analyzed && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-800">Tres propuestas para comparar</h3>
              <p className="text-xs text-slate-500 mt-1">Cada vista es una previsualización mock; puedes explorarla antes de elegir.</p>
            </div>
            <button type="button" aria-expanded={showComparison} onClick={() => setShowComparison(!showComparison)} className="px-4 py-2 border border-cyan-300 text-cyan-800 bg-white hover:bg-cyan-50 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">
              {showComparison ? "Ocultar comparación" : "Comparar alternativas"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["A", "B", "C"].map((option) => {
              const data = DESIGN_ALTERNATIVES[option];
              const isSelected = selectedOption === option;
              return (
                <article key={option} className={`bg-white rounded-xl p-4 border-2 transition-all flex flex-col ${isSelected ? 'border-cyan-500 ring-2 ring-cyan-200 shadow-md' : option === 'B' ? 'border-cyan-300 shadow-sm' : 'border-slate-200'}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Opción {option} — {data.name}</h4>
                      {option === 'B' && <span className="inline-block mt-1 px-2 py-0.5 bg-cyan-100 text-cyan-800 text-[9px] font-bold rounded-full">RECOMENDADO JR</span>}
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">Nivel: {data.difficulty}</span>
                      {isSelected && <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">✓ Seleccionada</span>}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed min-h-10">{data.description}</p>
                  <div className="my-3 rounded-lg overflow-hidden border border-slate-200" aria-label={`Previsualización de la opción ${option}`}>
                    <DesignPreview option={option} />
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setPreviewOption(option)} className="py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">Ver propuesta</button>
                    <button type="button" aria-pressed={isSelected} onClick={() => chooseOption(option)} className={`py-2 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98] ${isSelected ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-cyan-600 text-white hover:bg-cyan-500'}`}>
                      {isSelected ? "✓ Seleccionada" : `Elegir ${option}`}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {showComparison && (
            <section id="design-comparison" className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 animate-fade-in">
              <div>
                <h3 className="text-base font-bold text-slate-900">Comparación de alternativas</h3>
                <p className="text-xs text-slate-500">Compara la apariencia y el propósito de cada propuesta en paralelo.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {["A", "B", "C"].map((option) => {
                  const data = DESIGN_ALTERNATIVES[option];
                  return (
                    <div key={option} className={`rounded-lg border p-3 space-y-3 ${selectedOption === option ? 'border-cyan-400 bg-cyan-50/40' : 'border-slate-200 bg-slate-50'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-slate-800">Opción {option} — {data.name}</span>
                        <span className="text-[10px] text-slate-500">Complejidad: {data.complexity}</span>
                      </div>
                      <div className="rounded-md border border-slate-200 overflow-hidden"><DesignPreview option={option} /></div>
                      <dl className="space-y-2 text-[11px]">
                        <div><dt className="font-bold text-slate-700">Apariencia</dt><dd className="text-slate-600">{option === 'A' ? "Mucho espacio y pocos adornos." : option === 'B' ? "Campos claros con ayudas y ejemplos." : "Tarjetas, color e indicadores por etapa."}</dd></div>
                        <div><dt className="font-bold text-slate-700">Objetivo</dt><dd className="text-slate-600">{data.objective}</dd></div>
                        <div><dt className="font-bold text-slate-700">Ventajas</dt><dd className="text-slate-600">{data.advantages}</dd></div>
                        <div><dt className="font-bold text-slate-700">Posibles inconvenientes</dt><dd className="text-slate-600">{data.considerations}</dd></div>
                      </dl>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {selectedOption && (
            <section className="bg-white rounded-xl border-2 border-cyan-400 shadow-sm p-5 space-y-4 animate-fade-in" aria-live="polite">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Tu elección</h3>
                  <p className="text-sm font-semibold text-emerald-800 mt-1">✓ Opción {selectedOption} — {DESIGN_ALTERNATIVES[selectedOption].name}</p>
                  <p className="text-xs text-slate-600 mt-2">{DESIGN_ALTERNATIVES[selectedOption].description}</p>
                </div>
              </div>
              {confirmed && <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm font-semibold">✓ Diseño aplicado al proyecto. (Estado visual simulado)</div>}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowComparison(true)} className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">Comparar nuevamente</button>
                <button type="button" disabled={confirmed} onClick={() => { setConfirmed(true); showToast("✓ Diseño aplicado al proyecto."); }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-default disabled:opacity-70">
                  {confirmed ? "✓ Elección confirmada" : "Confirmar elección"}
                </button>
              </div>
            </section>
          )}
        </div>
      )}

      {previewOption && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setPreviewOption(null); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="design-preview-title" className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="design-preview-title" className="text-xl font-bold text-slate-900">Así se vería tu página</h2>
                  <p className="text-xs text-slate-500 mt-1">Opción {previewOption} — {DESIGN_ALTERNATIVES[previewOption].name}</p>
                </div>
                <button type="button" aria-label="Cerrar previsualización" onClick={() => setPreviewOption(null)} className="p-1 text-slate-400 hover:text-slate-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"><X className="w-5 h-5" /></button>
              </div>
              <DesignPreview option={previewOption} large />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950"><span className="font-bold block mb-1">Ventajas</span>{DESIGN_ALTERNATIVES[previewOption].advantages}</div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950"><span className="font-bold block mb-1">Consideraciones</span>{DESIGN_ALTERNATIVES[previewOption].considerations}</div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setPreviewOption(null)} className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">Volver a comparar</button>
                <button type="button" onClick={() => { chooseOption(previewOption); setPreviewOption(null); }} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98]">Elegir esta opción</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================================
// TAREA 4 — APRENDER UN CONCEPTO (ADAPTIVE EXPLANATION + QUIZ)
// ==========================================================
