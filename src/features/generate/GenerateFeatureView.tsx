import { ChevronRight, X, Check, Info } from 'lucide-react';
import { useState } from 'react';
import type { GenerateFeatureViewProps } from '../../types';
import { MOCK_RESPONSES } from '../../data/mockResponses';

export default function GenerateFeatureView({ step, setStep, form, setForm, triggerAi, showToast, applyProjectCode, codeInspection, setCodeInspection }: GenerateFeatureViewProps) {
  const [isRequestEdited, setIsRequestEdited] = useState(false);

  const updateForm = (updates) => {
    setForm({ ...form, ...updates });
    setIsRequestEdited(false);
  };
  
  const handleBehaviorToggle = (item) => {
    const exists = form.behaviors.includes(item);
    if (exists) {
      updateForm({ behaviors: form.behaviors.filter(b => b !== item) });
    } else {
      updateForm({ behaviors: [...form.behaviors, item] });
    }
  };

  const handleTechToggle = (item) => {
    const exists = form.techs.includes(item);
    if (exists) {
      updateForm({ techs: form.techs.filter(t => t !== item) });
    } else {
      updateForm({ techs: [...form.techs, item] });
    }
  };

  const buildPrompt = () => {
    const parts = [];
    const objective = (form.directMode ? (form.directRequest.trim() || form.objective) : form.objective).trim();

    if (objective) parts.push(objective);
    if (form.behaviors.length) parts.push(`Debe: ${form.behaviors.join(", ").toLowerCase()}.`);
    if (form.location) parts.push(`Se utilizará en ${form.location}.`);
    if (form.techs.length) parts.push(`Usa ${form.techs.join(", ")}.`);
    if (form.constraints.trim()) parts.push(`Ten en cuenta esta restricción: ${form.constraints.trim()}.`);
    if (form.explanationLevel) parts.push(`Explícame la solución ${form.explanationLevel.toLowerCase()}.`);
    if (form.additionalDetails.trim()) parts.push(form.additionalDetails.trim());

    return parts.join(" ");
  };

  const startRequestReview = () => {
    setForm({ ...form, requestDraft: isRequestEdited ? form.requestDraft : buildPrompt() });
    setStep('confirm');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* STEP INDICATOR HEADER */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-bold text-slate-800">Tarea:</span>
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-semibold">Generar Funcionalidad</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-medium text-slate-500">
          <span className={step === 'form' ? 'text-blue-600 font-bold' : ''}>1. Definir solicitud</span>
          <span>→</span>
          <span className={step === 'confirm' ? 'text-blue-600 font-bold' : ''}>2. Revisa y confirma</span>
          <span>→</span>
          <span className={step === 'result' ? 'text-blue-600 font-bold' : ''}>3. Solución CODE JR</span>
        </div>
      </div>

      {/* STEP 1: GUIDED FORM */}
      {step === 'form' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Cuéntame qué quieres hacer</h2>
            <p className="text-xs text-slate-500 mt-1">Si quieres, podemos ayudarte a completar los detalles. Puedes escribirlo con tus propias palabras.</p>
            <p className="text-xs text-slate-500 mt-1">Estas preguntas son opcionales y ayudan a CODE JR a entender mejor tu solicitud.</p>
          </div>

          <div className="space-y-5">
            <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${form.directMode ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
              <input
                type="checkbox"
                checked={form.directMode}
                onChange={(e) => updateForm({ directMode: e.target.checked })}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-800">Prefiero escribir mi solicitud directamente</span>
                <span className="block text-xs text-slate-500 mt-0.5">Puedes continuar sin completar las preguntas guiadas.</span>
              </span>
            </label>

            {form.directMode && (
              <div className="space-y-1.5">
                <label htmlFor="direct-request" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Tu solicitud</label>
                <textarea
                  id="direct-request"
                  value={form.directRequest}
                  onChange={(e) => updateForm({ directRequest: e.target.value })}
                  className="w-full min-h-32 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-y"
                  placeholder="Cuéntame con tus propias palabras qué quieres crear o resolver."
                />
              </div>
            )}

            <details open={!form.directMode} className="rounded-lg border border-slate-200">
              <summary className="px-4 py-3 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 rounded-lg">
                {form.directMode ? "Si quieres, completa los detalles guiados (opcional)" : "Preguntas para completar tu solicitud (todas opcionales)"}
              </summary>
              <div className="p-4 pt-1 space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="generate-objective" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 1 — ¿Qué quieres conseguir?</label>
                  <textarea
                    id="generate-objective"
                    value={form.objective}
                    onChange={(e) => updateForm({ objective: e.target.value })}
                    className="w-full min-h-24 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-y"
                    placeholder="Ej. Quiero crear un formulario de registro que valide el correo y la contraseña."
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 2 — ¿Qué debe hacer?</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {["Validar datos", "Mostrar mensajes de error", "Guardar información", "Cambiar elementos visuales", "Responder a botones"].map((item) => (
                      <label key={item} className={`flex items-center space-x-2 p-2.5 rounded-lg border cursor-pointer text-xs font-medium transition-colors ${form.behaviors.includes(item) ? 'bg-blue-50 border-blue-400 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                        <input type="checkbox" checked={form.behaviors.includes(item)} onChange={() => handleBehaviorToggle(item)} className="rounded text-blue-600 focus:ring-blue-500" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="generate-location" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 3 — ¿Dónde se utilizará?</label>
                  <select id="generate-location" value={form.location} onChange={(e) => updateForm({ location: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                    <option value="">Sin especificar</option>
                    <option value="Página de registro">Página de registro</option>
                    <option value="Página principal">Página principal</option>
                    <option value="Página de login">Página de login</option>
                    <option value="Menú superior">Menú superior</option>
                    <option value="Formulario independiente">Formulario independiente</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 4 — Tecnologías (opcional)</span>
                  <div className="flex flex-wrap gap-3">
                    {["HTML", "CSS", "JavaScript"].map((tech) => (
                      <label key={tech} className={`flex items-center space-x-2 px-3 py-2 rounded-lg border cursor-pointer text-xs font-medium ${form.techs.includes(tech) ? 'bg-indigo-50 border-indigo-400 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                        <input type="checkbox" checked={form.techs.includes(tech)} onChange={() => handleTechToggle(tech)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span>{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="generate-constraints" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 5 — Restricciones (opcional)</label>
                  <input id="generate-constraints" type="text" value={form.constraints} onChange={(e) => updateForm({ constraints: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ej. No utilizar React ni librerías externas." />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Paso 6 — ¿Cómo quieres que te explique la solución?</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["Muy sencillo", "Para desarrollador junior", "Técnico"].map((lvl) => (
                      <button key={lvl} type="button" onClick={() => updateForm({ explanationLevel: form.explanationLevel === lvl ? "" : lvl })} className={`p-2.5 rounded-lg text-xs font-semibold border text-center transition-all ${form.explanationLevel === lvl ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}>
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </details>

            <div className="space-y-1.5">
              <label htmlFor="generate-additional" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">¿Hay algo más que quieras contarle a CODE JR? <span className="font-normal normal-case text-slate-500">(opcional)</span></label>
              <textarea
                id="generate-additional"
                value={form.additionalDetails}
                onChange={(e) => updateForm({ additionalDetails: e.target.value })}
                className="w-full min-h-24 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-y"
                placeholder="Por ejemplo: quiero que el mensaje aparezca debajo del campo y que el diseño sea sencillo."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                triggerAi(() => {
                  startRequestReview();
                  showToast("✓ Ya puedes revisar y editar tu solicitud.");
                }, "Preparando tu solicitud...");
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-colors flex items-center space-x-2"
            >
              <span>Continuar a revisión</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REVIEW AND CONFIRM THE EDITABLE REQUEST */}
      {step === 'confirm' && (
        <div className="bg-white rounded-xl p-6 border-2 border-blue-400 shadow-md space-y-5 animate-fade-in">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Revisa y confirma tu solicitud</h2>
            <p className="text-xs text-slate-500 mt-1">CODE JR estructuró tu idea. Puedes editar el texto directamente antes de generar la solución si deseas ajustar algún detalle.</p>
          </div>

          <div id="request-draft-guidance" className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3.5 text-blue-950" role="note">
            <Info className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" aria-hidden="true" />
            <p className="text-sm leading-relaxed">CODE JR estructuró tu solicitud. Revisa si la interpretación es correcta o edita el texto libremente.</p>
          </div>

          <textarea
            id="request-draft"
            value={form.requestDraft}
            onChange={(e) => {
              setForm({ ...form, requestDraft: e.target.value });
              setIsRequestEdited(true);
            }}
            className="w-full min-h-48 px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm leading-relaxed placeholder:text-slate-400 resize-y transition-colors focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            placeholder="Escribe aquí lo que quieres pedirle a CODE JR."
            aria-label="Solicitud para confirmar"
            aria-describedby="request-draft-guidance"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button onClick={() => setStep('form')} className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
              ← Volver a la guía / editar formulario
            </button>
            <button
              onClick={() => {
                triggerAi(() => {
                  setStep('result');
                  showToast("✓ Solución simulada generada exitosamente.");
                }, "Generando solución óptima para desarrollador junior...");
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              Generar solución CODE JR →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: MOCK SOLUTION WITH DIRECT CODE INTERACTION */}
      {step === 'result' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900">Encontré una solución para tu formulario</h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                Solución Adaptada Junior
              </span>
            </div>

            {/* Problema / Diagnóstico */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Problema a resolver</h4>
              <p className="text-sm text-slate-700">{MOCK_RESPONSES.generate.problem}</p>
            </div>

            {/* Interactive Code Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-500 uppercase">Código propuesto (Haz clic en una línea para interactuar)</h4>
                {/* <span className="text-[11px] text-blue-600 font-medium">Masson et al. DirectGPT Pattern</span> */}
              </div>

              <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto relative shadow-inner space-y-1">
                {MOCK_RESPONSES.generate.code.split('\n').map((line, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setCodeInspection({ lineIndex: idx, text: line })}
                    className="hover:bg-slate-800/80 px-2 py-0.5 rounded cursor-pointer transition-colors flex items-start group"
                  >
                    <span className="w-8 text-slate-600 select-none text-[10px] pt-0.5">{idx + 1}</span>
                    <span className="group-hover:text-amber-300 transition-colors">{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Inspection Tooltip Modal */}
            {codeInspection && (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3 animate-fade-in">
                <div className="flex items-center justify-between text-indigo-900 font-bold text-xs">
                  <span>Línea seleccionada #{codeInspection.lineIndex + 1}: <code className="bg-indigo-100 px-1.5 py-0.5 rounded text-indigo-800">{codeInspection.text.trim()}</code></span>
                  <button onClick={() => setCodeInspection(null)} className="text-indigo-400 hover:text-indigo-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button 
                    onClick={() => {
                      showToast("`includes('@')` comprueba si la cadena contiene el símbolo arroba.");
                    }}
                    className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded hover:bg-indigo-500"
                  >
                    Explicarme esta línea
                  </button>
                  <button 
                    onClick={() => showToast("Lógica optimizada para evitar múltiples ifs.", "info")}
                    className="px-3 py-1.5 bg-white border border-indigo-300 text-indigo-700 text-xs font-semibold rounded hover:bg-indigo-100"
                  >
                    Mejorarla
                  </button>
                </div>
              </div>
            )}

            {/* Explicación */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
              <h4 className="text-xs font-bold text-blue-900 uppercase">Explicación para desarrollador junior</h4>
              <p className="text-xs text-blue-800 leading-relaxed">{MOCK_RESPONSES.generate.explanation}</p>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => applyProjectCode("script.js", MOCK_RESPONSES.generate.code)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Aplicar cambio</span>
              </button>
              <button 
                onClick={() => showToast("Código copiado al portapapeles.", "info")}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Ver código completo
              </button>
              <button 
                onClick={() => setStep('form')}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Modificar solución
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================================
// TAREA 2 — CORREGIR UN ERROR (FORM + CODE DIFF VIEWER)
// ==========================================================
