import React from "react";

import VolunteerHeader from "../components/volunteer/VolunteerHeader";
import VolunteerTaskPanel from "../components/volunteer/VolunteerTaskPanel";
import VolunteerAlerts from "../components/volunteer/VolunteerAlerts";
import VolunteerCheckpoint from "../components/volunteer/VolunteerCheckpoint";
import VolunteerPerformance from "../components/volunteer/VolunteerPerformance";

export default function VolunteerAssistantPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <VolunteerHeader />

      <div className="mt-8 grid lg:grid-cols-2 gap-8">

        <VolunteerTaskPanel />

        <VolunteerAlerts />

      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-8">

        <VolunteerCheckpoint />

        <VolunteerPerformance />

      </div>

    </div>
  );
}