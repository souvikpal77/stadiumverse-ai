export default function Footer() {
  return (
    <footer className="border-t border-slate-700 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h3 className="text-xl font-bold text-white">
            StadiumVerse AI
          </h3>

          <p className="text-slate-400 text-sm mt-2">
            AI Powered Smart Stadium Platform
          </p>
        </div>

        <div className="flex gap-6 text-slate-400">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Dashboard</a>
          <a href="#">Contact</a>
        </div>

        <div className="text-slate-500 text-sm">
          © 2026 StadiumVerse AI
        </div>

      </div>
    </footer>
  );
}