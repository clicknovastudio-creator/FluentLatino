const { createRoot } = ReactDOM;

function App() {
  return (
    React.createElement("div", { className: "min-h-screen flex flex-col items-center justify-center px-6 text-center text-white" },
      React.createElement("h1", { className: "text-5xl font-bold mb-4 drop-shadow-lg" }, "FluentLatino"),

      React.createElement("p", { className: "text-lg max-w-xl opacity-90 mb-8" },
        "Tu coach de inglés para hispanohablantes. Practicá vocabulario, frases y conversaciones básicas paso a paso."
      ),

      React.createElement("div", { className: "bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xl w-full" },
        React.createElement("p", { className: "text-base mb-4" }, "✅ La PWA ya está funcionando."),
        React.createElement("p", { className: "text-sm opacity-80" }, "Próximo paso: conectar Gemini API con una clave segura.")
      ),

      React.createElement("footer", { className: "mt-10 text-xs opacity-70" },
        `FluentLatino © ${new Date().getFullYear()}`
      )
    )
  );
}

createRoot(document.getElementById("root")).render(React.createElement(App));
