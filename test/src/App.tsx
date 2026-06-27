import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [prikaziTekst, setPrikaziTekst] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4 overflow-hidden">
      {/* 1. Kartica koja glatko uleće odozgo pri učitavanju stranice */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 text-center space-y-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Motion UI je aktivan!
        </h1>

        <p className="text-slate-400 text-sm">
          Framer Motion i Tailwind rade zajedno bez ikakvih konflikata.
        </p>

        {/* 2. Dugme sa mikro-interakcijama na hover i klik */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 15px rgb(168, 85, 247)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPrikaziTekst(!prikaziTekst)}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-pink-600 font-medium rounded-lg shadow-lg transition-colors">
          {prikaziTekst ? "Sakrij magiju" : "Prikaži magiju"}
        </motion.button>

        {/* 3. AnimatePresence omogućava animaciju elemenata kada SE UKLANJAJU sa ekrana */}
        <AnimatePresence>
          {prikaziTekst && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.8 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/60 border border-purple-500/30 rounded-xl p-4 mt-4 text-purple-300 font-mono text-xs overflow-hidden">
              ✨ Element je glatko uleteo, promenio dimenziju i povećao
              providnost!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
