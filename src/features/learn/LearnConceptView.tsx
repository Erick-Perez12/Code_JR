import { CheckCircle2, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import type { LearningLevel, LearnConceptViewProps } from '../../types';
import { MOCK_LEARNING } from '../../data/mockLearning';

export default function LearnConceptView({ level, setLevel, quizAnswer, setQuizAnswer, showToast }: LearnConceptViewProps) {
  const data = MOCK_LEARNING.asyncAwait;
  const [screen, setScreen] = useState('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConcept, setActiveConcept] = useState(data.title);
  const categories = ["JavaScript", "HTML", "CSS", "DOM", "APIs"];
  const suggestions = [
    { text: "Quiero entender por qué mi código espera antes de mostrar datos", concept: "async/await" },
    { text: "¿Qué es una Promise y cuándo se utiliza?", concept: "Promises" },
    { text: "¿Cómo puedo esperar a que termine una operación?", concept: "async/await" }
  ];

  const openConcept = (concept) => {
    const selectedConcept = concept.trim();
    if (!selectedConcept) return;
    setActiveConcept(selectedConcept);
    setSearchTerm(selectedConcept);
    setQuizAnswer(null);
    setScreen('learning');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {screen === 'search' ? (
        <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
          <div className="text-center space-y-2 py-4">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Aprender un concepto</span>
            <h1 className="text-2xl font-bold text-slate-900">¿Qué te gustaría aprender?</h1>
            <p className="text-sm text-slate-500">Busca un tema o elige una categoría para empezar.</p>
          </div>

          <form
            onSubmit={(event) => { event.preventDefault(); openConcept(searchTerm); }}
            className="bg-white rounded-2xl border border-slate-200 shadow-md p-3 flex flex-col sm:flex-row gap-2 focus-within:ring-2 focus-within:ring-emerald-200 focus-within:border-emerald-400"
          >
            <label htmlFor="learn-search" className="sr-only">Buscar un concepto, tecnología o tema</label>
            <input
              id="learn-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="🔍 Busca un concepto, tecnología o tema (ej. async/await, Flexbox, Promises, DOM)..."
              className="min-w-0 flex-1 px-3 py-3 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!searchTerm.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </form>

          <section className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-800">Explora por categoría</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => openConcept(category)}
                  className="px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] transition-all"
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Sugerencias populares</h2>
              <p className="text-xs text-slate-500 mt-1">También puedes empezar con una pregunta común.</p>
            </div>
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.text}
                  type="button"
                  onClick={() => openConcept(suggestion.concept)}
                  className="w-full flex items-center justify-between gap-3 text-left p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.99] transition-all"
                >
                  <span>{suggestion.text}</span>
                  <ChevronRight className="w-4 h-4 shrink-0 text-emerald-600" />
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : (
      <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
        <button
          type="button"
          onClick={() => setScreen('search')}
          className="inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-colors"
        >
          ← Volver a la búsqueda
        </button>

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Aprender Concepto</span>
            <h1 className="text-2xl font-bold text-slate-900 break-words">{activeConcept}</h1>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
            Modo Educativo Junior
          </span>
        </div>

        {/* Level selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase">¿Qué nivel tienes sobre este tema?</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'no_conozco', label: 'No conozco el concepto' },
              { id: 'visto_no_entiendo', label: 'Lo he visto pero no lo entiendo' },
              { id: 'conozco_basico', label: 'Conozco lo básico' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setLevel(item.id as LearningLevel)}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                  level === item.id 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Junior Definition & Analogy */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-emerald-900 uppercase">Explicación Adaptada</h4>
          <p className="text-xs text-emerald-950 leading-relaxed font-medium">{data.simpleDef}</p>
          <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-emerald-800 block">Analogía del mundo real:</span>
            <p>{data.analogy}</p>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase">Ejemplo en código JavaScript</h4>
          <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto">
            <code>{data.codeExample}</code>
          </pre>
        </div>

        {/* COMPROBACIÓN DE COMPRENSIÓN QUIZ */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Comprueba si lo entendiste</span>
          </div>

          <p className="text-xs text-slate-700 font-medium">{data.quiz.question}</p>

          <div className="space-y-2">
            {data.quiz.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setQuizAnswer(opt)}
                className={`w-full text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                  quizAnswer?.id === opt.id 
                    ? (opt.correct ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold' : 'bg-rose-100 border-rose-500 text-rose-900 font-bold')
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span className="font-bold mr-2">{opt.id}.</span>
                {opt.text}
              </button>
            ))}
          </div>

          {/* Quiz Feedback */}
          {quizAnswer && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
              quizAnswer.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <span className="font-bold block text-sm mb-1">
                {quizAnswer.correct ? '✓ Correcto' : 'No exactamente'}
              </span>
              <p>{quizAnswer.correct ? data.quiz.explanationCorrect : data.quiz.explanationIncorrect}</p>
            </div>
          )}

        </div>
      </div>
      </div>
      )}
    </div>
  );
}

// ==========================================================
// TAREA 5 — REVISAR CÓDIGO (AUDIT CHECKLIST & JUNIOR REPO)
// ==========================================================
