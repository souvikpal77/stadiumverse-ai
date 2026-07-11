import React from "react";

const tasks = [
  {
    id: 1,
    title: "Guide fans to Gate B",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Assist wheelchair visitor",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Check Section C seating",
    priority: "Low",
    status: "Completed",
  },
];

export default function VolunteerTaskPanel() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        📋 AI Assigned Tasks
      </h2>

      <div className="space-y-4">

        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <h3 className="font-semibold text-white">
              {task.title}
            </h3>

            <div className="mt-3 flex justify-between text-sm">

              <span className="text-yellow-400">
                Priority: {task.priority}
              </span>

              <span className="text-green-400">
                {task.status}
              </span>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}