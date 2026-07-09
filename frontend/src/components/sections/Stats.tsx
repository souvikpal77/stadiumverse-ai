export default function Stats() {
  const stats = [
    { value: "50K+", label: "Fans Assisted" },
    { value: "99.9%", label: "AI Accuracy" },
    { value: "15+", label: "AI Agents" },
    { value: "<2 sec", label: "Response Time" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-center"
          >
            <h3 className="text-4xl font-bold text-blue-400">
              {item.value}
            </h3>
            <p className="mt-2 text-slate-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}