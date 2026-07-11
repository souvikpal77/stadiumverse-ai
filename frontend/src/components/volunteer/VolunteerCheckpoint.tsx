import React from "react";

const checkpoints = [
  {
    name: "Gate A",
    status: "Completed",
    color: "text-green-400",
  },
  {
    name: "Gate B",
    status: "Pending",
    color: "text-yellow-400",
  },
  {
    name: "Food Court",
    status: "Completed",
    color: "text-green-400",
  },
  {
    name: "VIP Entrance",
    status: "Pending",
    color: "text-yellow-400",
  },
];

export default function VolunteerCheckpoint() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-blue-400 mb-6">
        📍 Checkpoint Status
      </h2>

      <div className="space-y-4">

        {checkpoints.map((point) => (
          <div
            key={point.name}
            className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <span className="font-medium text-white">
              {point.name}
            </span>

            <span className={`font-semibold ${point.color}`}>
              {point.status}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}