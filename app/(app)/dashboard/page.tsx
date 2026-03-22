"use client";

import { useState } from "react";
import { usePlatformSession } from "@/components/platform-session-provider";
import {
  WelcomeBanner,
  CurrentIdea,
  TodaysFocus,
  SectionProgress,
  NextMilestone,
  KPIMetrics,
  TopTasks,
  TeamMembers,
  ProTip,
  StreakCard,
  UserProfile,
} from "@/components/dashboard";

export default function DashboardPage() {
  const [showProTip, setShowProTip] = useState(true);
  const { sessionId, data, loading, error } = usePlatformSession();

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-dashed border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-700">
          Open this dashboard from signup using <strong>Continue to dashboard</strong>, or append{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">?session_id=</code> plus your
          session UUID to the URL.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-gray-600" aria-live="polite">
        Loading dashboard…
      </p>
    );
  }

  if (error || !data) {
    return (
      <p className="text-center text-red-600" role="alert">
        {error ?? "Could not load dashboard data."}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <WelcomeBanner userName={data.welcomeUserName} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2">
            <TodaysFocus key={`${sessionId}-focus`} tasks={data.todaysFocusTasks} />
            <CurrentIdea
              key={`${sessionId}-idea`}
              ideaName={data.currentIdeaTitle}
              phaseName={data.currentIdeaPhaseLabel}
              progress={data.journeyProgressPercent}
              description={data.currentIdeaDescription}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <NextMilestone
              milestoneName={data.nextMilestone.milestoneName}
              dueDate={data.nextMilestone.dueDate}
              daysRemaining={data.nextMilestone.daysRemaining}
              description={data.nextMilestone.description}
            />
            <SectionProgress sections={data.sectionProgress} />
          </div>

          <TopTasks key={`${sessionId}-tasks`} tasks={data.topTasks} sessionId={sessionId} />

          {showProTip && (
            <ProTip
              tip="Focus on one task at a time. Use the Focus Sprint feature to block distractions and track your progress."
              onDismiss={() => setShowProTip(false)}
            />
          )}
        </div>

        <div className="space-y-6">
          <UserProfile userName={data.welcomeUserName} />
          <StreakCard />
          <KPIMetrics />
          <TeamMembers />
        </div>
      </div>
    </div>
  );
}
