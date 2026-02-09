import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white">

      <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
        FluentLatino
      </h1>

      <p className="text-lg max-w-xl opacity-90 mb-10 leading-relaxed">
        Tu coach de inglés para hispanohablantes. Practicá vocabulario, frases y
        conversaciones paso a paso.
      </p>

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/20">

        <h2 className="text-2xl font-bold mb-6">
          ¿Qué querés practicar hoy?
        </h2>

        <div className="flex flex-col gap-4">

          <button className="w-full bg-purple-500 hover:bg-purple-600 transition text-white font-semibold py-4 rounded-2xl shadow-lg">
            🚀 Empezar
          </button>

          <button className="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
            📚 Vocabulary Trainer
          </button>

          <button className="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
            💬 Conversation Practice
          </button>

          <button className="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
            📈 My Progress
          </button>

        </div>

        <p className="text-xs opacity-70 mt-6">
          Próximo paso: conectar Gemini API con una clave segura.
        </p>

      </div>

      <footer className="mt-10 text-xs opacity-60">
        FluentLatino © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
