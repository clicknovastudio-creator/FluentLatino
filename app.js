const root = document.getElementById("root");

// ===================== HOME =====================
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

// ===================== COACH =====================
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

      <p id="statusText" class="text-xs opacity-70 mt-4">
        Modo micrófono: OFF
      </p>
    </div>
  `;

  document.getElementById("btnBack").addEventListener("click", renderHome);

  const chatBox = document.getElementById("chatBox");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const micBtn = document.getElementById("micBtn");
  const statusText = document.getElementById("statusText");

  function addMessage(sender, text, isUser = false) {
    const bubble = document.createElement("div");
    bubble.className = isUser
      ? "bg-purple-500/40 p-4 rounded-2xl self-end"
      : "bg-black/20 p-4 rounded-2xl";

    bubble.innerHTML = `
      <p class="font-bold">${sender}:</p>
      <p class="opacity-90 whitespace-pre-line">${text}</p>
    `;

    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // ============================
  //   COACH LOGIC (STEPS)
  // ============================

  let coachStep = 0;
  let userName = "";

  function coachReply(userText) {
    const msg = userText.trim();
    const lower = msg.toLowerCase();

    if (coachStep === 0) {
      userName = msg;
      coachStep = 1;
      return `Nice to meet you, ${userName}! 😄\nWhere are you from? (Example: I'm from Argentina)`;
    }

    if (coachStep === 1) {
      coachStep = 2;
      return `Great! 🌎\nHow old are you? (Example: I'm 25 years old)`;
    }

    if (coachStep === 2) {
      coachStep = 3;
      return `Awesome! 🎉\nWhat do you do? (Example: I'm a teacher / I'm a student)`;
    }

    if (coachStep === 3) {
      coachStep = 4;
      return `Perfect, ${userName}! 👏\nNow repeat after me:\n\n👉 I want to learn English.`;
    }

    if (coachStep === 4) {
      if (lower.includes("i want to learn english")) {
        coachStep = 5;
        return `YESSS! 🔥 Great job!\nNow tell me:\n👉 Why do you want to learn English?\n(Example: I want to travel / I want a better job)`;
      } else {
        return `Almost! 😄\nTry again:\n👉 I want to learn English.`;
      }
    }

    if (coachStep === 5) {
      coachStep = 6;
      return `Nice answer! 💡\nRoleplay time:\n\nSituation: At a café ☕\nCoach: Hello! What would you like?\n\nYour turn!`;
    }

    if (coachStep === 6) {
      coachStep = 7;
      return `Great! 😍\nCoach: Sure! Anything else?\n\nYour turn again.`;
    }

    if (coachStep === 7) {
      coachStep = 8;
      return `Excellent, ${userName}! 🎉\nYou completed your first role play.\n\nChoose a topic:\n👉 Food / Travel / Work`;
    }

    if (coachStep === 8) {
      if (lower.includes("food")) {
        coachStep = 9;
        return `Yummy! 🍔\nRepeat:\n- delicious\n- hungry\n- menu\n\nNow make a sentence with "hungry".`;
      }

      if (lower.includes("travel")) {
        coachStep = 9;
        return `Great! ✈️\nRepeat:\n- passport\n- ticket\n- hotel\n\nNow make a sentence with "ticket".`;
      }

      if (lower.includes("work")) {
        coachStep = 9;
        return `Nice! 💼\nRepeat:\n- meeting\n- deadline\n- schedule\n\nNow make a sentence with "meeting".`;
      }

      return `Choose one please 😄\n👉 Food / Travel / Work`;
    }

    if (coachStep === 9) {
      return `Very good! 👏\nNow tell me:\n👉 What is your favorite thing about learning English?`;
    }

    return `Nice! 😄 Keep going.\nTell me more!`;
  }

  // ============================
  //   TEXT TO SPEECH (VOICE)
  // ============================

  function speak(text) {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  // ============================
  //   SEND MESSAGE
  // ============================

  function sendMessage(textFromMic = null) {
    const text = textFromMic || input.value.trim();
    if (!text) return;

    addMessage("You", text, true);
    input.value = "";

    setTimeout(() => {
      const reply = coachReply(text);
      addMessage("Coach", reply);
      speak(reply);
    }, 600);
  }

  sendBtn.addEventListener("click", () => sendMessage());

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // ============================
  //   MICROPHONE (HANDS FREE)
  // ============================

  let handsFree = false;
  let recognition = null;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;

    micBtn.addEventListener("click", () => {
      handsFree = !handsFree;

      if (handsFree) {
        recognition.start();
        micBtn.textContent = "🟢";
        statusText.textContent = "Modo micrófono: ON (Hands Free)";
      } else {
        recognition.stop();
        micBtn.textContent = "🎤";
        statusText.textContent = "Modo micrófono: OFF";
      }
    });

    recognition.onresult = (event) => {
      const voiceText = event.results[event.results.length - 1][0].transcript;
      sendMessage(voiceText);
    };

    recognition.onerror = () => {
      micBtn.textContent = "🎤";
      statusText.textContent = "Error de micrófono. Revisá permisos.";
      handsFree = false;
    };

    recognition.onend = () => {
      if (handsFree) recognition.start();
    };
  } else {
    micBtn.addEventListener("click", () => {
      alert("Tu navegador no soporta micrófono. Usá Chrome.");
    });
  }

  // ============================
  //   SPEAK FIRST MESSAGE
  // ============================

  setTimeout(() => {
    speak("Hi! Welcome to FluentLatino. What's your name?");
  }, 700);
}

// ===================== VOCABULARY TRAINER =====================
function renderVocabulary() {
  const topics = {
    "Food & Drinks": [
      { word: "coffee", meaning: "café" },
      { word: "water", meaning: "agua" },
      { word: "bread", meaning: "pan" },
      { word: "juice", meaning: "jugo" },
      { word: "tea", meaning: "té" },
      { word: "milk", meaning: "leche" },
      { word: "menu", meaning: "menú" },
      { word: "hungry", meaning: "hambriento" },
      { word: "delicious", meaning: "delicioso" }
    ],
    "Travel": [
      { word: "airport", meaning: "aeropuerto" },
      { word: "ticket", meaning: "boleto" },
      { word: "passport", meaning: "pasaporte" },
      { word: "hotel", meaning: "hotel" },
      { word: "reservation", meaning: "reserva" },
      { word: "luggage", meaning: "equipaje" },
      { word: "boarding pass", meaning: "tarjeta de embarque" }
    ],
    "Work": [
      { word: "meeting", meaning: "reunión" },
      { word: "boss", meaning: "jefe" },
      { word: "schedule", meaning: "horario" },
      { word: "deadline", meaning: "fecha límite" },
      { word: "salary", meaning: "salario" },
      { word: "interview", meaning: "entrevista" }
    ],
    "Daily Life": [
      { word: "morning", meaning: "mañana" },
      { word: "afternoon", meaning: "tarde" },
      { word: "evening", meaning: "noche" },
      { word: "shopping", meaning: "compras" },
      { word: "home", meaning: "hogar" },
      { word: "family", meaning: "familia" }
    ]
  };

  let savedTopics = JSON.parse(localStorage.getItem("fluentTopics"));

  if (!savedTopics) {
    savedTopics = ["Food & Drinks"];
    localStorage.setItem("fluentTopics", JSON.stringify(savedTopics));
  }

  let visibleCount = 10;

  function getSelectedWords() {
    let words = [];
    savedTopics.forEach((topic) => {
      words = words.concat(topics[topic] || []);
    });
    return words;
  }

  function renderVocabularyUI() {
    const allWords = getSelectedWords();
    const visibleWords = allWords.slice(0, visibleCount);

    root.innerHTML = `
      <div class="min-h-screen flex flex-col px-6 py-8 text-white">

        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold">📚 Vocabulary Trainer</h1>
          <button id="btnBack"
            class="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm">
            ⬅ Volver
          </button>
        </div>

        <div class="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20">

          <h2 class="text-xl font-bold mb-4">Choose your topics:</h2>

          <div class="grid grid-cols-2 gap-3 mb-6">
            ${Object.keys(topics)
              .map(
                (topic) => `
                <label class="flex items-center gap-2 bg-black/20 p-3 rounded-xl cursor-pointer">
                  <input type="checkbox" class="topicCheck"
                    value="${topic}" ${savedTopics.includes(topic) ? "checked" : ""}>
                  <span>${topic}</span>
                </label>
              `
              )
              .join("")}
          </div>

          <div class="flex gap-3 mb-6">
            <button id="copyBtn"
              class="flex-1 bg-purple-500 hover:bg-purple-600 transition text-white font-semibold py-3 rounded-2xl shadow-lg">
              📋 Copy List
            </button>

            <button id="pdfBtn"
              class="flex-1 bg-white/15 hover:bg-white/25 transition text-white font-semibold py-3 rounded-2xl">
              📄 Export PDF
            </button>
          </div>

          <div id="vocabList" class="grid gap-4">
            ${
              visibleWords.length === 0
                ? `<p class="opacity-70">No vocabulary available. Select at least one topic.</p>`
                : visibleWords
                    .map(
                      (w) => `
                      <div class="bg-white/10 p-4 rounded-2xl border border-white/10">
                        <p class="text-xl font-bold">${w.word}</p>
                        <p class="opacity-80">${w.meaning}</p>
                      </div>
                    `
                    )
                    .join("")
            }
          </div>

          <p class="text-xs opacity-70 mt-6">
            Scroll down to load more vocabulary.
          </p>

        </div>
      </div>
    `;

    document.getElementById("btnBack").addEventListener("click", renderHome);

    // guardar topics elegidos
    document.querySelectorAll(".topicCheck").forEach((check) => {
      check.addEventListener("change", () => {
        savedTopics = Array.from(document.querySelectorAll(".topicCheck:checked")).map(
          (c) => c.value
        );
        localStorage.setItem("fluentTopics", JSON.stringify(savedTopics));
        visibleCount = 10;
        renderVocabularyUI();
      });
    });

    // copiar lista
    document.getElementById("copyBtn").addEventListener("click", () => {
      const text = visibleWords.map((w) => `${w.word} - ${w.meaning}`).join("\n");
      navigator.clipboard.writeText(text);
      alert("Vocabulary copied!");
    });

    // exportar PDF
    document.getElementById("pdfBtn").addEventListener("click", () => {
      if (!window.jspdf) {
        alert("jsPDF not loaded. Add jsPDF script to index.html");
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("FluentLatino Vocabulary List", 10, 15);

      doc.setFontSize(12);
      doc.text("Topics: " + savedTopics.join(", "), 10, 25);

      let y = 40;

      visibleWords.forEach((w, i) => {
        doc.text(`${i + 1}. ${w.word} - ${w.meaning}`, 10, y);
        y += 8;

        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("FluentLatino-Vocabulary.pdf");
    });

    // infinite scroll
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        if (visibleCount < allWords.length) {
          visibleCount += 5;
          renderVocabularyUI();
        }
      }
    };
  }

  renderVocabularyUI();
}

// ===================== CONVERSATION PRACTICE =====================
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

// ===================== PROGRESS =====================
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

// ===================== INIT =====================
renderHome();
