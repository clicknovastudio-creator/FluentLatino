document.getElementById("root").innerHTML = `
  <div class="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white">

    <h1 class="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
      FluentLatino
    </h1>

    <p class="text-lg max-w-xl opacity-90 mb-10 leading-relaxed">
      Tu coach de inglés para hispanohablantes. Practicá vocabulario, frases y conversaciones básicas paso a paso.
    </p>

    <div class="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/20">

      <h2 class="text-2xl font-bold mb-6">
        ¿Qué querés practicar hoy?
      </h2>

      <div class="flex flex-col gap-4">

        <button class="w-full bg-purple-500 hover:bg-purple-600 transition text-white font-semibold py-4 rounded-2xl shadow-lg">
          🚀 Empezar
        </button>

        <button class="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
          📚 Vocabulary Trainer
        </button>

        <button class="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
          💬 Conversation Practice
        </button>

        <button class="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
          📈 My Progress
        </button>

      </div>

      <p class="text-xs opacity-70 mt-6">
        Próximo paso: conectar Gemini API con una clave segura.
      </p>

    </div>

    <footer class="mt-10 text-xs opacity-60">
      FluentLatino © ${new Date().getFullYear()}
    </footer>

  </div>
`;
