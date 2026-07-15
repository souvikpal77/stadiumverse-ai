import { useState } from "react";
import DashboardService from "../../services/dashboard";

export default function AIVoiceAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Hello! I'm StadiumVerse AI. Ask me anything about the stadium."
  );

  async function askAI() {
    const q = question.toLowerCase().trim();

    try {
      const system: any = await DashboardService.getSystemStatus();
      const emergency: any = await DashboardService.getEmergencyStatus();

      let response = "";

      if (
        q.includes("emergency") ||
        q.includes("fire") ||
        q.includes("accident")
      ) {
        if (emergency.active) {
          response = `${emergency.type} detected at ${emergency.location}. ${emergency.message} Please use ${emergency.recommended_gate}.`;
        } else {
          response = "There is currently no emergency inside the stadium.";
        }
      }

      else if (
        q.includes("gate") ||
        q.includes("which gate") ||
        q.includes("recommended gate")
      ) {
        response = `AI recommends using ${system.activeGate}. It currently has the shortest waiting time.`;
      }

      else if (q.includes("crowd")) {
        response = `Current stadium crowd level is ${system.crowdLevel} percent.`;
      }

      else if (q.includes("weather")) {
        response = `Current weather is ${system.weather}.`;
      }

      else if (q.includes("event")) {
        response = `Today's event is ${system.event}.`;
      }

      else if (
        q.includes("navigation") ||
        q.includes("visitor")
      ) {
        response = `${system.navigationUsers} visitors are currently using AI Navigation.`;
      }

      else if (
        q.includes("health") ||
        q.includes("stadium health")
      ) {
        response = `Current stadium health score is ${system.stadiumHealth} percent.`;
      }

      else {
        response =
          "I can answer questions about gates, emergencies, weather, crowd, event, navigation and stadium status.";
      }

      setAnswer(response);

      const speech = new SpeechSynthesisUtterance(response);
      speech.rate = 1;
      speech.pitch = 1;
      speech.volume = 1;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);

    } catch (err) {
      console.error(err);
      setAnswer("Unable to connect to Stadium AI server.");
    }
  }

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
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