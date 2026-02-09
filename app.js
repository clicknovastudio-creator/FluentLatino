import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">FluentLatino</h1>
      <p className="text-lg max-w-xl opacity-90 mb-8">
        Tu coach de inglés para hispanohablantes. Practicá vocabulario, frases y
        conversaciones básicas paso a paso.
      </p>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xl w-full">
        <p className="text-base mb-4">
          ✅ La PWA ya está funcionando.
        </p>

        <p className="text-sm opacity-80">
          Próximo paso: conectar Gemini API con una clave segura.
        </p>
      </div>

      <footer className="mt-10 text-xs opacity-70">
        FluentLatino © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
