import React, { useState } from 'react'

export default function App() {
  const [copiedDoc, setCopiedDoc] = useState<string | null>(null)

  const handleCopyCommand = (cmd: string, name: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedDoc(name)
    setTimeout(() => setCopiedDoc(null), 2000)
  }

  const agents = [
    { name: 'Crowd Agent', desc: 'Monitors gate flow rates, stand densities, and queues.', file: 'crowd_agent.py', color: 'border-cyan-500/20 text-cyan-400' },
    { name: 'Navigation Agent', desc: 'Generates route walkthroughs and wayfinding logs.', file: 'navigation_agent.py', color: 'border-emerald-500/20 text-emerald-400' },
    { name: 'Operations Agent', desc: 'Manages facilities issues, inventory, and staff tasks.', file: 'operations_agent.py', color: 'border-violet-500/20 text-violet-400' },
    { name: 'Emergency Agent', desc: 'Alerts operations center and issues bypass evacuations.', file: 'emergency_agent.py', color: 'border-rose-500/20 text-rose-400' },
    { name: 'Volunteer Agent', desc: 'Coordinates shifts, check-in flows, and briefings.', file: 'volunteer_agent.py', color: 'border-amber-500/20 text-amber-400' },
    { name: 'Translation Agent', desc: 'Translates text logs, alerts, and instructions to target languages.', file: 'translation_agent.py', color: 'border-indigo-500/20 text-indigo-400' },
    { name: 'Fan Agent', desc: 'Engages spectator interactions, trivia, and concessions queries.', file: 'fan_agent.py', color: 'border-pink-500/20 text-pink-400' }
  ]

  return (
    <div className="min-h-screen bg-radial from-slate-900 via-slate-950 to-black text-slate-100 flex flex-col items-center justify-between p-6 md:p-12 relative overflow-hidden font-sans">
      
      {/* Background glowing blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 z-10 border-b border-slate-800/60 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 font-bold text-lg tracking-wider text-white">
            SV
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              StadiumVerse AI
            </h1>
            <p className="text-xs text-slate-500 font-mono">v0.1.0-foundation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-slate-400 font-mono bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
            System Foundation Ready
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl flex flex-col lg:grid lg:grid-cols-12 gap-8 my-12 z-10 items-stretch">
        
        {/* Left Side: Welcome and Commands */}
        <section className="lg:col-span-7 flex flex-col justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-mono mb-4">
              ✨ React + Vite + TypeScript + Tailwind CSS v4 + FastAPI
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Production-Ready <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Multi-Agent Framework
              </span>
            </h2>
            <p className="text-slate-400 text-base max-w-lg leading-relaxed mb-6">
              Welcome to the foundation of StadiumVerse AI. The architecture has been generated with strict decoupling rules: the frontend proxies all AI conversations through the secure FastAPI orchestration server.
            </p>
          </div>

          {/* Quick-start guides and Commands card */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase mb-4 font-mono">
              Workspace Execution Setup
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1.5 font-mono"># Start Backend API</p>
                <div className="flex items-center justify-between bg-black/50 border border-slate-800/80 rounded-lg p-3 font-mono text-xs text-slate-300">
                  <span>cd backend && python -m venv venv && .\venv\Scripts\Activate.ps1 && pip install -r requirements.txt && uvicorn app.main:app --reload</span>
                  <button 
                    onClick={() => handleCopyCommand("cd backend && python -m venv venv && .\\venv\\Scripts\\Activate.ps1 && pip install -r requirements.txt && uvicorn app.main:app --reload", "backend")}
                    className="ml-3 text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedDoc === 'backend' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1.5 font-mono"># Start Frontend Client</p>
                <div className="flex items-center justify-between bg-black/50 border border-slate-800/80 rounded-lg p-3 font-mono text-xs text-slate-300">
                  <span>cd frontend && npm install && npm run dev</span>
                  <button 
                    onClick={() => handleCopyCommand("cd frontend && npm install && npm run dev", "frontend")}
                    className="ml-3 text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedDoc === 'frontend' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Agents listing */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-900/20 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-6 shadow-2xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1 text-slate-200">
                Cognitive Agents Scaffolding
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Specialized agents ready to consume system directives and model calls.
              </p>
              
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {agents.map((agent, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-850 hover:border-slate-800 hover:bg-slate-950/60 transition-all group"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                        {agent.name}
                      </span>
                      <span className="text-[11px] text-slate-500 leading-normal max-w-[280px]">
                        {agent.desc}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono border px-2 py-0.5 rounded ${agent.color}`}>
                      {agent.file}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800/60 pt-4 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Orchestrated by:</span>
              <span className="font-mono text-slate-300 font-bold bg-slate-900 px-2.5 py-1 rounded">
                app/ai/router.py
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/40 pt-6 z-10 text-xs text-slate-500 font-mono">
        <div>
          <span>StadiumVerse AI Scaffolding Project</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="../docs/architecture.md" className="hover:text-slate-300 transition-colors">Architecture Doc</a>
          <span>•</span>
          <a href="../docs/api.md" className="hover:text-slate-300 transition-colors">API Spec</a>
          <span>•</span>
          <a href="../docs/ai-modules.md" className="hover:text-slate-300 transition-colors">AI Modules</a>
        </div>
      </footer>
    </div>
  )
}
