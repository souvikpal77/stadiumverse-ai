export default function Features() {
  const features = [
    {
      title: "Smart Crowd Management",
      description: "Monitor crowd density and optimize stadium flow using AI."
    },
    {
      title: "Indoor Navigation",
      description: "Guide fans to seats, exits, parking and facilities."
    },
    {
      title: "Emergency Response",
      description: "Provide instant AI-assisted emergency alerts and evacuation guidance."
    },
    {
      title: "Multi-language Assistant",
      description: "Support international visitors in multiple languages."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        AI Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-slate-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}