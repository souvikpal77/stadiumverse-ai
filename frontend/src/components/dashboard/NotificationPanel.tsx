import { useEffect, useState } from "react";

const notifications = [
  {
    type: "warning",
    title: "Gate C Crowd Alert",
    message: "Crowd density exceeded 90%. Redirect visitors to Gate B.",
  },
  {
    type: "success",
    title: "Medical Team Ready",
    message: "Nearest medical team is available within 2 minutes.",
  },
  {
    type: "info",
    title: "Parking Update",
    message: "Parking Zone A has 64 available spaces.",
  },
  {
    type: "warning",
    title: "Weather Notice",
    message: "Light rain expected after 30 minutes.",
  },
  {
    type: "success",
    title: "Volunteer Check-in",
    message: "52 volunteers are currently active.",
  },
];

export default function NotificationPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % notifications.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const notification = notifications[index];

  const border =
    notification.type === "warning"
      ? "border-yellow-500"
      : notification.type === "success"
      ? "border-green-500"
      : "border-cyan-500";

  const icon =
    notification.type === "warning"
      ? "⚠️"
      : notification.type === "success"
      ? "✅"
      : "ℹ️";

  return (
    <div
      className={`rounded-2xl border ${border} bg-slate-900 p-6 transition-all duration-500`}
    >
      <h2 className="text-2xl font-bold mb-4">
        🔔 Live AI Notifications
      </h2>

      <div className="space-y-3">

        <h3 className="text-lg font-semibold">
          {icon} {notification.title}
        </h3>

        <p className="text-slate-300">
          {notification.message}
        </p>

      </div>
    </div>
  );
}