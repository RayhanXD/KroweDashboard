"use client"

import { useState } from "react"
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
} from "@/components/dashboard"

export default function DashboardPage() {
  const [showProTip, setShowProTip] = useState(true)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Welcome Banner - Full width */}
      <WelcomeBanner />

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - 2 cols on desktop */}
        <div className="space-y-6 lg:col-span-2">
          {/* Featured row */}
          <div className="grid gap-6 md:grid-cols-2">
            <TodaysFocus />
            <CurrentIdea />
          </div>

          {/* Secondary row */}
          <div className="grid gap-6 md:grid-cols-2">
            <NextMilestone />
            <SectionProgress />
          </div>

          {/* Tasks */}
          <TopTasks />

          {/* Pro Tip */}
          {showProTip && (
            <ProTip
              tip="Focus on one task at a time. Use the Focus Sprint feature to block distractions and track your progress."
              onDismiss={() => setShowProTip(false)}
            />
          )}
        </div>

        {/* Right column - 1 col on desktop */}
        <div className="space-y-6">
          <UserProfile />
          <StreakCard />
          <KPIMetrics />
          <TeamMembers />
        </div>
      </div>
    </div>
  )
}
