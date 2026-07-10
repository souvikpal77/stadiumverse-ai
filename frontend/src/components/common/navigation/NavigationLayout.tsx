import React from "react";

interface NavigationLayoutProps {
  children: React.ReactNode;
}

export default function NavigationLayout({
  children,
}: NavigationLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </div>
    </div>
  );
}