"use client";

import { useState } from "react";
import { Sidebar, Header } from "@/components/layout";
import { FocusSprintModal } from "@/components/focus-sprint-modal";
import { usePlatformSession } from "@/components/platform-session-provider";

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { sessionId, data, loading, error } = usePlatformSession();

  const hasLiveSessionData =
    Boolean(sessionId) && Boolean(data) && !loading && !error;

  const progress = hasLiveSessionData ? data!.journeyProgressPercent : 42;
  const userName = hasLiveSessionData ? data!.welcomeUserName : "Marcus";

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        progress={progress}
        sessionId={sessionId}
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          progress={progress}
          userName={userName}
          sessionId={sessionId}
          onStartSprint={() => setIsSprintModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
      <FocusSprintModal
        isOpen={isSprintModalOpen}
        onClose={() => setIsSprintModalOpen(false)}
      />
    </div>
  );
}
