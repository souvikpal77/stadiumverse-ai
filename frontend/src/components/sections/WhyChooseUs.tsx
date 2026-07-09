export default function WhyChooseUs() {
  const items = [
    {
      title: "AI Crowd Intelligence",
      description: "Monitor crowd density and reduce congestion in real time."
    },
    {
      title: "Smart Navigation",
      description: "Help fans find seats, exits, food courts, and parking easily."
    },
    {
      title: "Emergency Response",
      description: "Provide AI-assisted alerts and evacuation guidance instantly."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why StadiumVerse AI?
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6"
          >
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-slate-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}