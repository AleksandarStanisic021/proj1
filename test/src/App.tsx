import { useState } from "react";

function App() {
  const [brojac, setBrojac] = useState<number>(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      {/* Glavna kartica */}
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 text-center space-y-6 transition-all duration-300 hover:scale-[1.02]">
        {/* Animirani detalj (Znak provere) */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 animate-bounce">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Naslovi */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Tailwind radi!
          </h1>
          <p className="text-slate-400 text-sm">
            React + TypeScript + Tailwind CSS uspešno podešeni.
          </p>
        </div>

        {/* Test interaktivnosti (Dugme i brojač) */}
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-mono">
            Uvećaj brojač da testiraš stanje
          </p>
          <div className="text-4xl font-mono font-bold text-cyan-400 mb-4">
            {brojac}
          </div>
          <button
            onClick={() => setBrojac(brojac + 1)}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 font-medium rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-150">
            Klikni me
          </button>
        </div>

        {/* Test responzivnosti */}
        <div className="pt-2 text-xs text-slate-500 border-t border-slate-700/50 flex flex-col md:flex-row justify-between gap-2">
          <span>Širina ekrana:</span>
          <span className="font-bold text-red-400 md:text-emerald-400">
            {/* Ako je tekst crven, ekran je mali. Ako postane zelen, radi md: brejkpoint */}
            <span className="md:hidden">Mobilni (Mali ekran)</span>
            <span className="hidden md:inline">Desktop (Širok ekran)</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
