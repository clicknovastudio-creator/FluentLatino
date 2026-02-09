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

      <div id="chatBox"
        class="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 flex-1 overflow-y-auto space-y-4">
        
        <div class="bg-black/20 p-4 rounded-2xl">
          <p class="font-bold">Coach:</p>
          <p class="opacity-90">Hi! 👋 Welcome to FluentLatino. What’s your name?</p>
        </div>

      </div>

     <div class="mt-6 flex gap-2">
  <button id="micBtn"
    class="bg-white/20 hover:bg-white/30 transition px-4 py-3 rounded-2xl font-semibold shadow-lg">
    🎤
  </button>

  <input id="userInput"
    type="text"
    placeholder="Escribí o hablá..."
    class="flex-1 px-4 py-3 rounded-2xl text-black outline-none"
  />

  <button id="sendBtn"
    class="bg-purple-500 hover:bg-purple-600 transition px-5 py-3 rounded-2xl font-semibold shadow-lg">
    Enviar
  </button>
</div>


      <p class="text-xs opacity-70 mt-4">
        Próximo paso: conectar Gemini API para respuestas inteligentes.
      </p>
    </div>
  `;

  document.getElementById("btnBack").addEventListener("click", renderHome);

  const chatBox = document.getElementById("chatBox");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");

  function addMessage(sender, text, isUser = false) {
    const bubble = document.createElement("div");
    bubble.className = isUser
      ? "bg-purple-500/40 p-4 rounded-2xl self-end"
      : "bg-black/20 p-4 rounded-2xl";

    bubble.innerHTML = `
      <p class="font-bold">${sender}:</p>
      <p class="opacity-90">${text}</p>
    `;

    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function coachReply(userText) {
    const msg = userText.toLowerCase();

    if (msg.includes("hola") || msg.includes("hello")) {
      return "Hello! 😄 Nice to meet you. What is your name?";
    }

    if (msg.includes("my name is")) {
      return "Great! 🌟 Where are you from?";
    }

    if (msg.includes("argentina")) {
      return "Awesome 🇦🇷! Let's practice: How old are you?";
    }

    if (msg.includes("i am")) {
      return "Perfect! 🎉 Now tell me: What do you do? (teacher, student, etc.)";
    }

    return "Good! 😄 Now repeat after me: I want to learn English!";
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("You", text, true);
    input.value = "";

    setTimeout(() => {
      addMessage("Coach", coachReply(text));
    }, 600);
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
  // 🎤 Micrófono (Speech Recognition)
micBtn.addEventListener("click", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Tu navegador no soporta micrófono. Usá Chrome en Android.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  micBtn.textContent = "🎙️";

  recognition.start();

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    input.value = voiceText;
    micBtn.textContent = "🎤";
    sendMessage();
  };

  recognition.onerror = () => {
    micBtn.textContent = "🎤";
    alert("No se pudo usar el micrófono. Revisá permisos del navegador.");
  };

  recognition.onend = () => {
    micBtn.textContent = "🎤";
  };
});

}

function renderVocabulary() {
  const topics = {
    "Food & Drinks": [
      { word: "water", meaning: "agua" },
      { word: "coffee", meaning: "café" },
      { word: "tea", meaning: "té" },
      { word: "bread", meaning: "pan" },
      { word: "milk", meaning: "leche" },
      { word: "juice", meaning: "jugo" },
      { word: "breakfast", meaning: "desayuno" },
      { word: "dinner", meaning: "cena" },
      { word: "hungry", meaning: "hambriento" },
      { word: "delicious", meaning: "delicioso" },
      { word: "salt", meaning: "sal" },
      { word: "sugar", meaning: "azúcar" }
    ],

    "Travel": [
      { word: "airport", meaning: "aeropuerto" },
      { word: "passport", meaning: "pasaporte" },
      { word: "ticket", meaning: "boleto" },
      { word: "hotel", meaning: "hotel" },
      { word: "reservation", meaning: "reserva" },
      { word: "map", meaning: "mapa" },
      { word: "train", meaning: "tren" },
      { word: "bus", meaning: "colectivo" },
      { word: "taxi", meaning: "taxi" },
      { word: "luggage", meaning: "equipaje" },
      { word: "trip", meaning: "viaje" },
      { word: "vacation", meaning: "vacaciones" }
    ],

    "Work & Office": [
      { word: "meeting", meaning: "reunión" },
      { word: "boss", meaning: "jefe" },
      { word: "colleague", meaning: "compañero de trabajo" },
      { word: "schedule", meaning: "horario" },
      { word: "deadline", meaning: "fecha límite" },
      { word: "salary", meaning: "salario" },
      { word: "interview", meaning: "entrevista" },
      { word: "resume", meaning: "currículum" },
      { word: "email", meaning: "correo" },
      { word: "presentation", meaning: "presentación" },
      { word: "project", meaning: "proyecto" },
      { word: "promotion", meaning: "ascenso" }
    ]
  };

  let selectedTopic = Object.keys(topics)[0];
  let visibleCount = 6;

  function renderList() {
    const words = topics[selectedTopic].slice(0, visibleCount);

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

          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>
              <p class="text-sm opacity-80 mb-2">Seleccioná un Topic:</p>
              <select id="topicSelect"
                class="px-4 py-3 rounded-xl text-black font-semibold w-full md:w-auto">
                ${Object.keys(topics)
                  .map(
                    (topic) =>
                      `<option value="${topic}" ${
                        topic === selectedTopic ? "selected" : ""
                      }>${topic}</option>`
                  )
                  .join("")}
              </select>
            </div>

            <div class="flex gap-3">
              <button id="btnCopy"
                class="bg-purple-500 hover:bg-purple-600 transition px-4 py-3 rounded-xl font-semibold shadow-lg">
                📋 Copy List
              </button>

              <button id="btnPDF"
                class="bg-white/15 hover:bg-white/25 transition px-4 py-3 rounded-xl font-semibold">
                🧾 Export PDF
              </button>
            </div>

          </div>

          <p class="text-sm opacity-80 mb-4">
            Mostrando <span class="font-bold">${words.length}</span> palabras de <span class="font-bold">${topics[selectedTopic].length}</span>
          </p>

          <div id="vocabList" class="grid gap-4">
            ${words
              .map(
                (w) => `
                  <div class="bg-white/10 p-4 rounded-2xl border border-white/10">
                    <p class="text-xl font-bold">${w.word}</p>
                    <p class="opacity-80">${w.meaning}</p>
                  </div>
                `
              )
              .join("")}
          </div>

          <p class="text-xs opacity-70 mt-6">
            📌 Tip: bajá hacia abajo para cargar más palabras automáticamente.
          </p>

        </div>
      </div>
    `;

    document.getElementById("btnBack").addEventListener("click", renderHome);

    document.getElementById("topicSelect").addEventListener("change", (e) => {
      selectedTopic = e.target.value;
      visibleCount = 6;
      renderList();
    });

    document.getElementById("btnCopy").addEventListener("click", () => {
      const text = words.map((w) => `${w.word} - ${w.meaning}`).join("\n");
      navigator.clipboard.writeText(text);
      alert("✅ Vocabulary copied!");
    });

    document.getElementById("btnPDF").addEventListener("click", () => {
      if (!window.jspdf) {
        alert("jsPDF no está cargado.");
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text(`Vocabulary List - ${selectedTopic}`, 10, 15);

      doc.setFontSize(12);

      let y = 30;
      words.forEach((w, index) => {
        doc.text(`${index + 1}. ${w.word} - ${w.meaning}`, 10, y);
        y += 8;

        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save(`Vocabulary-${selectedTopic}.pdf`);
    });

    // Infinite scroll
    window.onscroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      ) {
        if (visibleCount < topics[selectedTopic].length) {
          visibleCount += 4;
          renderList();
        }
      }
    };
  }

  renderList();
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
