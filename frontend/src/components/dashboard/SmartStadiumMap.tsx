import React from "react";

export default function SmartStadiumMap() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

      <h2 className="text-3xl font-bold text-cyan-400 mb-8">
        🗺 Smart Stadium Map
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="rounded-xl bg-green-500/20 border border-green-500 p-6 text-center hover:scale-105 transition">
          <div className="text-5xl">🟢</div>
          <h3 className="mt-3 font-bold">Gate A</h3>
          <p className="text-green-400">Low Crowd</p>
        </div>

        <div className="rounded-xl bg-yellow-500/20 border border-yellow-500 p-6 text-center hover:scale-105 transition">
          <div className="text-5xl">🟡</div>
          <h3 className="mt-3 font-bold">Gate B</h3>
          <p className="text-yellow-400">Medium Crowd</p>
        </div>

        <div className="rounded-xl bg-red-500/20 border border-red-500 p-6 text-center hover:scale-105 transition">
          <div className="text-5xl">🔴</div>
          <h3 className="mt-3 font-bold">Gate C</h3>
          <p className="text-red-400">Heavy Crowd</p>
        </div>

        <div className="rounded-xl bg-green-500/20 border border-green-500 p-6 text-center hover:scale-105 transition">
          <div className="text-5xl">🟢</div>
          <h3 className="mt-3 font-bold">Gate D</h3>
          <p className="text-green-400">Recommended</p>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="rounded-xl bg-blue-500/20 border border-blue-500 p-6 text-center">
          <div className="text-4xl">🚗</div>
          <p className="mt-2">Parking</p>
        </div>

        <div className="rounded-xl bg-orange-500/20 border border-orange-500 p-6 text-center">
          <div className="text-4xl">🍔</div>
          <p className="mt-2">Food Court</p>
        </div>

        <div className="rounded-xl bg-cyan-500/20 border border-cyan-500 p-6 text-center">
          <div className="text-4xl">🚻</div>
          <p className="mt-2">Restrooms</p>
        </div>

      </div>

    </div>
  );
}