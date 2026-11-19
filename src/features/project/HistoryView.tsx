import type { HistoryViewProps } from '../../types';

export default function HistoryView({ projectContext, showToast }: HistoryViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs text-slate-400 uppercase font-bold">Evolución de Decisiones</span>
          <h1 className="text-2xl font-bold text-slate-900">{projectContext.name}</h1>
          <p className="text-xs text-slate-500">Historial continuo de cambios y decisiones tomadas en el proyecto.</p>
        </div>

        {/* Timeline */}
        <div className="space-y-4 pt-2">
          {projectContext.history.map((item) => (
            <div key={item.step} className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                {item.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Estado: {item.status}</p>
              </div>
              <button 
                onClick={() => showToast(`Viendo estado de la etapa ${item.step}.`, "info")}
                className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded text-xs font-semibold hover:bg-slate-100"
              >
                Ver etapa
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ==========================================================
// MODAL: CONTEXTO "LO QUE CODE JR RECUERDA" (CHEN ET AL. 2026)
// ==========================================================
