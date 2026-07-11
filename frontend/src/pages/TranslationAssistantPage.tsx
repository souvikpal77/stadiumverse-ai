import React from "react";

import LanguageSelector from "../components/translation/LanguageSelector";
import TranslationCard from "../components/translation/TranslationCard";
import VoiceRecorder from "../components/translation/VoiceRecorder";
import TranslateHistory from "../components/translation/TranslateHistory";

export default function TranslationAssistantPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-3">
        🌍 AI Translation Assistant
      </h1>

      <p className="text-slate-400 mb-10">
        Break language barriers for FIFA World Cup 2026 fans with AI-powered multilingual communication.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-8">
          <LanguageSelector />
          <TranslationCard />
          <VoiceRecorder />
        </div>

        <div>
          <TranslateHistory />
        </div>

      </div>

    </div>
  );
}