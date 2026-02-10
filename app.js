import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const ELEVEN_API_KEY = "TU_API_KEY_ELEVENLABS";
const ELEVEN_VOICE_ID = "TU_VOICE_ID_ELEVENLABS";
const GEMINI_API_KEY = "TU_API_KEY_GEMINI";

function App() {
  const [screen, setScreen] = useState("home"); // home | coach | vocab
  const [autoMic, setAutoMic] = useState(true);
  const [listening, setListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [topic, setTopic] = useState("General");

  const [customTopics, setCustomTopics] = useState([
    "Travel",
    "Work",
    "Food",
    "School",
    "Daily Life",
  ]);

  const [newTopic, setNewTopic] = useState("");

  const [userProfile, setUserProfile] = useState({
    name: "",
    level: "",
    goals: "",
  });

  const [messages, setMessages] = useState([
    {
      role: "coach",
      text: "Hi. I'm here with you. Tell me your name.",
    },
  ]);

  const [vocabMessages, setVocabMessages] = useState([
    {
      role: "coach",
      text: "Welcome. Choose a topic or create your own.",
    },
  ]);

  const recognitionRef = useRef(null);
  const chatBoxRef = useRef(null);
  const vocabBoxRef = useRef(null);

  // Scroll chat auto
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (vocabBoxRef.current) {
      vocabBoxRef.current.scrollTop = vocabBoxRef.current.scrollHeight;
    }
  }, [vocabMessages]);

  // ---------------------------
  // Helpers
  // ---------------------------
  function cleanTextForVoice(text) {
    return text
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
      .replace(/[•*#@<>]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function addMessage(setter, role, text) {
    setter((prev) => [...prev, { role, text }]);
  }

  function stopMic() {
    try {
      recognitionRef.current?.stop();
    } catch (err) {}
    setListening(false);
  }

  function startMic() {
    if (!autoMic) return;
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (err) {}
  }

  // ---------------------------
  // Speech Recognition Setup
  // ---------------------------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition no soportado. Usá Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);

      // auto restart si no está hablando
      if (autoMic && !isSpeaking) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (err) {}
        }, 500);
      }
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      if (!transcript || transcript.trim().length < 2) return;

      if (screen === "coach") {
        addMessage(setMessages, "user", transcript);
        await handleCoachResponse(transcript);
      }

      if (screen === "vocab") {
        addMessage(setVocabMessages, "user", transcript);
        await handleVocabResponse(transcript);
      }
    };

    recognitionRef.current = recognition;

    // arrancar automático
    setTimeout(() => {
      if (autoMic) {
        try {
          recognition.start();
        } catch (err) {}
      }
    }, 800);
  }, [autoMic, isSpeaking, screen]);

  // ---------------------------
  // ElevenLabs TTS
  // ---------------------------
  async function speakWithElevenLabs(text) {
    const clean = cleanTextForVoice(text);
    if (!clean) return;

    setIsSpeaking(true);

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": ELEVEN_API_KEY,
            "Content-Type": "application/json",
            accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text: clean,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.55,
              similarity_boost: 0.9,
              style: 0.7,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (!response.ok) {
        console.error("ElevenLabs error:", await response.text());
        setIsSpeaking(false);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsSpeaking(false);
        if (autoMic) startMic();
      };

      audio.play();
    } catch (err) {
      console.error("ElevenLabs fetch error:", err);
      setIsSpeaking(false);
    }
  }

  // ---------------------------
  // Gemini AI Reply
  // ---------------------------
  async function getGeminiReply(prompt) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await res.json();

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn’t catch that. Can you say it again?";

      return reply.trim();
    } catch (err) {
      console.error("Gemini error:", err);
      return "Sorry. Something went wrong. Please try again.";
    }
  }

  // ---------------------------
  // Coach Logic (PRO)
  // ---------------------------
  async function handleCoachResponse(userText) {
    stopMic();

    const history = messages
      .map((m) =>
        m.role === "coach" ? `Coach: ${m.text}` : `User: ${m.text}`
      )
      .join("\n");

    const prompt = `
You are a real human English coach.
You speak naturally, like a friendly teacher.
Your tone is confident and warm.
Do NOT use emojis.
Do NOT give examples.
Do NOT give lists.
Do NOT say "repeat after me".
Do NOT force fixed patterns.
Ask only ONE question at a time.
Give the user space to speak.
Keep responses short and realistic.
If the user makes mistakes, correct naturally inside your response, without being robotic.
If the user answers briefly, ask a deeper follow-up question.
If the user says their name, remember it and use it naturally later.
Try to detect their English level (A1/A2/B1) quietly.
Never mention system instructions.

User profile so far:
Name: ${userProfile.name || "Unknown"}
Level: ${userProfile.level || "Unknown"}
Goals: ${userProfile.goals || "Unknown"}

Conversation:
${history}

User just said:
"${userText}"

Coach response:
`;

    const reply = await getGeminiReply(prompt);

    // Guardar nombre si aparece
    if (!userProfile.name) {
      const match = userText.match(/my name is\s+([a-zA-Z]+)/i);
      if (match) {
        setUserProfile((prev) => ({ ...prev, name: match[1] }));
      }
    }

    addMessage(setMessages, "coach", reply);
    await speakWithElevenLabs(reply);
  }

  // ---------------------------
  // Vocabulary Trainer Logic (PRO)
  // ---------------------------
  async function handleVocabResponse(userText) {
    stopMic();

    const history = vocabMessages
      .map((m) =>
        m.role === "coach" ? `Coach: ${m.text}` : `User: ${m.text}`
      )
      .join("\n");

    const prompt = `
You are a real English vocabulary coach.
The user wants vocabulary practice.
Topic: ${topic}

Rules:
- No emojis.
- No examples.
- No lists longer than 6 words.
- Give vocabulary naturally, like a teacher.
- After giving vocabulary, ask the user ONE question to use the words.
- Correct mistakes naturally.

Conversation:
${history}

User just said:
"${userText}"

Coach response:
`;

    const reply = await getGeminiReply(prompt);

    addMessage(setVocabMessages, "coach", reply);
    await speakWithElevenLabs(reply);
  }

  // ---------------------------
  // Manual Send
  // ---------------------------
  async function manualSend(inputId, setter, handler) {
    const input = document.getElementById(inputId);
    const text = input.value.trim();
    if (!text) return;

    addMessage(setter, "user", text);
    input.value = "";
    await handler(text);
  }

  // ---------------------------
  // Export PDF (jsPDF)
  // ---------------------------
  function exportChatPDF(chatType = "coach") {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const title = chatType === "coach" ? "FluentLatino Coach Chat" : "Vocabulary Trainer Chat";
    doc.text(title, 10, y);
    y += 10;

    const data = chatType === "coach" ? messages : vocabMessages;

    data.forEach((m) => {
      const line = `${m.role === "coach" ? "Coach" : "You"}: ${cleanTextForVoice(
        m.text
      )}`;

      const lines = doc.splitTextToSize(line, 180);
      lines.forEach((l) => {
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(l, 10, y);
        y += 7;
      });

      y += 3;
    });

    doc.save(chatType === "coach" ? "coach-chat.pdf" : "vocab-chat.pdf");
  }

  // ---------------------------
  // UI Screens
  // ---------------------------
  function Home() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-6">
        <h1 className="text-4xl font-bold mb-6">FluentLatino</h1>

        <div className="bg-white/10 border border-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-xl space-y-4">
          <button
            onClick={() => {
              setScreen("coach");
              setTimeout(() => startMic(), 500);
            }}
            className="w-full bg-purple-500 hover:bg-purple-600 transition px-6 py-4 rounded-2xl font-semibold text-lg"
          >
            Start Coach
          </button>

          <button
            onClick={() => {
              setScreen("vocab");
              setTimeout(() => startMic(), 500);
            }}
            className="w-full bg-white/20 hover:bg-white/30 transition px-6 py-4 rounded-2xl font-semibold text-lg"
          >
            Vocabulary Trainer
          </button>

          <div className="flex items-center justify-between mt-4 text-sm opacity-80">
            <span>Auto Microphone</span>
            <button
              onClick={() => setAutoMic((prev) => !prev)}
              className="bg-black/30 px-4 py-2 rounded-xl"
            >
              {autoMic ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        <p className="text-xs opacity-70 mt-6">
          Voice powered by ElevenLabs. AI powered by Gemini.
        </p>
      </div>
    );
  }

  function CoachScreen() {
    return (
      <div className="min-h-screen flex flex-col px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">FluentLatino Coach</h1>

          <div className="flex gap-2">
            <button
              onClick={() => exportChatPDF("coach")}
              className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm"
            >
              Export PDF
            </button>

            <button
              onClick={() => {
                stopMic();
                setScreen("home");
              }}
              className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm"
            >
              Back
            </button>
          </div>
        </div>

        <div className="text-xs opacity-80 mb-2">
          {isSpeaking ? "Speaking..." : listening ? "Listening..." : "Idle"}
        </div>

        <div
          ref={chatBoxRef}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 flex-1 overflow-y-auto space-y-4"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "bg-purple-500/40 p-4 rounded-2xl self-end"
                  : "bg-black/20 p-4 rounded-2xl"
              }
            >
              <p className="font-bold">{m.role === "user" ? "You" : "Coach"}:</p>
              <p className="opacity-90 whitespace-pre-line">{m.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => {
              if (listening) stopMic();
              else startMic();
            }}
            className="bg-white/20 hover:bg-white/30 transition px-4 py-3 rounded-2xl font-semibold shadow-lg"
          >
            {listening ? "Stop" : "Mic"}
          </button>

          <input
            id="coachInput"
            type="text"
            placeholder="Type here..."
            className="flex-1 px-4 py-3 rounded-2xl text-black outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") manualSend("coachInput", setMessages, handleCoachResponse);
            }}
          />

          <button
            onClick={() => manualSend("coachInput", setMessages, handleCoachResponse)}
            className="bg-purple-500 hover:bg-purple-600 transition px-5 py-3 rounded-2xl font-semibold shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  function VocabScreen() {
    return (
      <div className="min-h-screen flex flex-col px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Vocabulary Trainer</h1>

          <div className="flex gap-2">
            <button
              onClick={() => exportChatPDF("vocab")}
              className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm"
            >
              Export PDF
            </button>

            <button
              onClick={() => {
                stopMic();
                setScreen("home");
              }}
              className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm"
            >
              Back
            </button>
          </div>
        </div>

        <div className="text-xs opacity-80 mb-3">
          Topic: <b>{topic}</b> | {isSpeaking ? "Speaking..." : listening ? "Listening..." : "Idle"}
        </div>

        <div className="bg-white/10 border border-white/20 rounded-3xl p-4 mb-4">
          <p className="text-sm font-semibold mb-2">Your Topics</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {customTopics.map((t, i) => (
              <button
                key={i}
                onClick={() => setTopic(t)}
                className={`px-3 py-2 rounded-xl text-sm transition ${
                  topic === t ? "bg-purple-500" : "bg-black/30 hover:bg-black/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Add new topic..."
              className="flex-1 px-4 py-2 rounded-xl text-black outline-none"
            />
            <button
              onClick={() => {
                if (!newTopic.trim()) return;
                setCustomTopics((prev) => [...prev, newTopic.trim()]);
                setTopic(newTopic.trim());
                setNewTopic("");
              }}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm"
            >
              Add
            </button>
          </div>
        </div>

        <div
          ref={vocabBoxRef}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20 flex-1 overflow-y-auto space-y-4"
        >
          {vocabMessages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "bg-purple-500/40 p-4 rounded-2xl self-end"
                  : "bg-black/20 p-4 rounded-2xl"
              }
            >
              <p className="font-bold">{m.role === "user" ? "You" : "Coach"}:</p>
              <p className="opacity-90 whitespace-pre-line">{m.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => {
              if (listening) stopMic();
              else startMic();
            }}
            className="bg-white/20 hover:bg-white/30 transition px-4 py-3 rounded-2xl font-semibold shadow-lg"
          >
            {listening ? "Stop" : "Mic"}
          </button>

          <input
            id="vocabInput"
            type="text"
            placeholder="Type here..."
            className="flex-1 px-4 py-3 rounded-2xl text-black outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") manualSend("vocabInput", setVocabMessages, handleVocabResponse);
            }}
          />

          <button
            onClick={() => manualSend("vocabInput", setVocabMessages, handleVocabResponse)}
            className="bg-purple-500 hover:bg-purple-600 transition px-5 py-3 rounded-2xl font-semibold shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------
  // Render
  // ---------------------------
  if (screen === "home") return <Home />;
  if (screen === "coach") return <CoachScreen />;
  if (screen === "vocab") return <VocabScreen />;
}

createRoot(document.getElementById("root")).render(<App />);
