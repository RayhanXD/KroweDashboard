"use client"

import React from "react"

import { useState } from "react"
import { Sidebar, Header } from "@/components/layout"
import { FocusSprintModal } from "@/components/focus-sprint-modal"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const progress = 42 // This would come from a global state or API

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        progress={progress}
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          progress={progress}
          userName="Marcus"
          onStartSprint={() => setIsSprintModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
      <FocusSprintModal
        isOpen={isSprintModalOpen}
        onClose={() => setIsSprintModalOpen(false)}
      />
    </div>
  )
}
