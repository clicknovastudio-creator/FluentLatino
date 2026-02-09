const root = document.getElementById("root");

function renderHome() {
  root.innerHTML = `
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

          <button id="btnStart"
            class="w-full bg-purple-500 hover:bg-purple-600 transition text-white font-semibold py-4 rounded-2xl shadow-lg">
            🚀 Empezar
          </button>

          <button id="btnVocab"
            class="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
            📚 Vocabulary Trainer
          </button>

          <button id="btnConversation"
            class="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
            💬 Conversation Practice
          </button>

          <button id="btnProgress"
            class="w-full bg-white/15 hover:bg-white/25 transition text-white font-semibold py-4 rounded-2xl">
            📈 My Progress
          </button>

        </div>

        <p class="text-xs opacity-70 mt-6">
          FluentLatino App v1.0
        </p>

      </div>

      <footer class="mt-10 text-xs opacity-60">
        FluentLatino © ${new Date().getFullYear()}
      </footer>
    </div>
  `;

  document.getElementById("btnStart").addEventListener("click", renderCoach);
  document.getElementById("btnVocab").addEventListener("click", renderVocabulary);
  document.getElementById("btnConversation").addEventListener("click", renderConversation);
  document.getElementById("btnProgress").addEventListener("click", renderProgress);
}

function renderCoach() {
  root.innerHTML = `
    <div class="min-h-screen flex flex-col px-6 py-8 text-white">

      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">🚀 FluentLatino Coach</h1>
        <button id="btnBack"
          class="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm">
          ⬅ Volver
        </button>
      </div>

      <div class="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 flex-1">
        <p class="text-lg font-semibold mb-3">👋 Hola!</p>
        <p class="opacity-90 leading-relaxed">
          Soy tu coach de inglés. Muy pronto vas a poder escribir acá y practicar conversaciones reales.
        </p>

        <div class="mt-6 bg-black/20 p-4 rounded-2xl text-sm opacity-90">
          ✨ Próximo paso: conectar Gemini API para respuestas inteligentes.
        </div>
      </div>
    </div>
  `;

  document.getElementById("btnBack").addEventListener("click", renderHome);
}

function renderVocabulary() {
  root.innerHTML = `
    <div class="min-h-screen flex flex-col px-6 py-8 text-white">

      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">📚 Vocabulary Trainer</h1>
        <button id="btnBack"
          class="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm">
          ⬅ Volver
        </button>
      </div>

      <div class="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 flex-1">

        <p class="text-lg mb-4 opacity-90">Practicá palabras esenciales para principiantes.</p>

        <div class="grid gap-4">
          <div class="bg-white/10 p-4 rounded-2xl">
            <p class="text-xl font-bold">Hello</p>
            <p class="opacity-80">Hola</p>
          </div>

          <div class="bg-white/10 p-4 rounded-2xl">
            <p class="text-xl font-bold">Thank you</p>
            <p class="opacity-80">Gracias</p>
          </div>

          <div class="bg-white/10 p-4 rounded-2xl">
            <p class="text-xl font-bold">How are you?</p>
            <p class="opacity-80">¿Cómo estás?</p>
          </div>
        </div>

        <p class="text-xs opacity-70 mt-6">
          Próximo paso: agregar quizzes interactivos.
        </p>

      </div>
    </div>
  `;

  document.getElementById("btnBack").addEventListener("click", renderHome);
}

function renderConversation() {
  root.innerHTML = `
    <div class="min-h-screen flex flex-col px-6 py-8 text-white">

      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">💬 Conversation Practice</h1>
        <button id="btnBack"
          class="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm">
          ⬅ Volver
        </button>
      </div>

      <div class="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 flex-1">

        <p class="text-lg font-semibold mb-4">Situación: En un café ☕</p>

        <div class="space-y-4">
          <div class="bg-white/10 p-4 rounded-2xl">
            <p class="font-bold">Waiter:</p>
            <p>Hello! What would you like?</p>
          </div>

          <div class="bg-white/10 p-4 rounded-2xl">
            <p class="font-bold">You:</p>
            <p>I would like a coffee, please.</p>
          </div>

          <div class="bg-white/10 p-4 rounded-2xl">
            <p class="font-bold">Waiter:</p>
            <p>Sure! Anything else?</p>
          </div>
        </div>

        <p class="text-xs opacity-70 mt-6">
          Próximo paso: conversación interactiva con IA.
        </p>

      </div>
    </div>
  `;

  document.getElementById("btnBack").addEventListener("click", renderHome);
}

function renderProgress() {
  root.innerHTML = `
    <div class="min-h-screen flex flex-col px-6 py-8 text-white">

      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">📈 My Progress</h1>
        <button id="btnBack"
          class="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm">
          ⬅ Volver
        </button>
      </div>

      <div class="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 flex-1">

        <p class="text-lg mb-6 opacity-90">
          Muy pronto vas a poder ver tu progreso, palabras aprendidas y rachas diarias.
        </p>

        <div class="bg-black/20 p-4 rounded-2xl">
          <p class="font-bold">🔥 Streak:</p>
          <p class="opacity-80">0 days</p>
        </div>

        <div class="bg-black/20 p-4 rounded-2xl mt-4">
          <p class="font-bold">📚 Words learned:</p>
          <p class="opacity-80">0 words</p>
        </div>

      </div>
    </div>
  `;

  document.getElementById("btnBack").addEventListener("click", renderHome);
}

// Inicial
renderHome();
