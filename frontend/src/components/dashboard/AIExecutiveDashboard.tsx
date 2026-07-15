export default function AIExecutiveDashboard() {
  const stats = [
    {
      title: "AI Confidence",
      value: "98%",
      color: "text-cyan-400",
      icon: "🧠",
    },
    {
      title: "Prediction Accuracy",
      value: "96%",
      color: "text-green-400",
      icon: "🎯",
    },
    {
      title: "Incidents Resolved",
      value: "12",
      color: "text-yellow-400",
      icon: "🚨",
    },
    {
      title: "Visitors Redirected",
      value: "1,842",
      color: "text-blue-400",
      icon: "👥",
    },
    {
      title: "Average Wait Saved",
      value: "6 min",
      color: "text-purple-400",
      icon: "⏱️",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      color: "text-emerald-400",
      icon: "❤️",
    },
  ];

  return (
    <div className="rounded-2xl border border-cyan-500 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        📊 AI Executive Dashboard
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {stats.map((item) => (

          <div
            key={item.title}
            className="rounded-xl bg-slate-800 p-5 border border-slate-700 hover:border-cyan-500 transition"
          >

            <div className="text-4xl">
              {item.icon}
            </div>

            <h3 className="mt-3 text-slate-400">
              {item.title}
            </h3>

            <p className={`text-3xl font-bold mt-2 ${item.color}`}>
              {item.value}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}