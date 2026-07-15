import { useState } from "react";

export default function AIReportGenerator() {
  const [report, setReport] = useState("");

  function generateReport() {
    const time = new Date().toLocaleTimeString();

    setReport(`
🏟 StadiumVerse AI Match Report

Generated: ${time}

━━━━━━━━━━━━━━━━━━━━━━

✔ Stadium Health : 98%

✔ Crowd Managed Successfully

✔ Peak Crowd : Gate C

✔ Visitors Redirected : 1,842

✔ Parking Utilization : 82%

✔ Medical Incidents : 1

✔ Security Alerts : 2

✔ Average Wait Reduced : 6 minutes

━━━━━━━━━━━━━━━━━━━━━━

🤖 AI Summary

Stadium operations remained stable throughout the event.
AI successfully predicted crowd movement and recommended alternate routes, reducing waiting time and improving visitor safety.
`);
  }

  return (
    <div className="rounded-2xl border border-cyan-500 bg-slate-900 p-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-cyan-400">
          📄 AI Match Report
        </h2>

        <button
          onClick={generateReport}
          className="rounded-lg bg-cyan-500 px-5 py-2 font-bold text-slate-900 hover:bg-cyan-400"
        >
          Generate Report
        </button>

      </div>

      {report && (

        <pre className="mt-6 whitespace-pre-wrap rounded-xl bg-slate-800 p-5 text-slate-300">

          {report}

        </pre>

      )}

    </div>
  );
}