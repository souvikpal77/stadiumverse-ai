import { useState } from "react";

const replies: Record<string, string> = {
  "where is gate a": "Gate A is located near the North Entrance.",
  "where is gate b": "Gate B is located near Parking Zone A.",
  "where is gate c": "Gate C currently has heavy crowd. AI recommends Gate D instead.",
  "where is gate d": "Gate D is the fastest entry with the lowest waiting time.",
  "parking": "Parking Zone A has the highest number of available spaces.",
  "food": "The nearest food court is beside Gate B.",
  "washroom": "The nearest washroom is 50 meters from your current location.",
  "help": "You can ask about gates, parking, food courts, washrooms or emergencies."
};

export default function AIVoiceAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Hello! I'm StadiumVerse AI. Ask me anything about the stadium."
  );

  function askAI() {
    const q = question.toLowerCase().trim();

    let response =
      replies[q] ||
      "I couldn't understand that. Try asking about gates, parking, food or emergencies.";

    setAnswer(response);
    const speech = new SpeechSynthesisUtterance(response);

speech.rate = 1;

speech.pitch = 1;

speech.volume = 1;

window.speechSynthesis.cancel();

window.speechSynthesis.speak(speech);
  }

  function startListening() {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = (event: any) => {
    const text = event.results[0][0].transcript;

    setQuestion(text);
  };
}

  return (
    <div className="rounded-2xl border border-cyan-500 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🎤 AI Stadium Assistant
      </h2>

      <div className="flex gap-3">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
        />

        <button
          onClick={askAI}
          className="rounded-lg bg-cyan-500 px-6 text-slate-900 font-bold hover:bg-cyan-400"
        >
          Ask
        </button>

        <button
          onClick={startListening}
          className="rounded-lg bg-green-500 px-5 text-white hover:bg-green-400"
        >
          🎤
        </button>

      </div>

      <div className="mt-6 rounded-xl bg-slate-800 p-5">

        <p className="text-cyan-300 font-semibold">
          🤖 AI Response
        </p>

        <p className="mt-3 text-slate-300">
          {answer}
        </p>

      </div>

    </div>
  );
}