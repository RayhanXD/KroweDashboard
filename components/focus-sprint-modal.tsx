"use client"

import { useState } from "react"
import { X, Clock, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { KroweCard, TaskRow, OverlineLabel } from "@/components/krowe"

interface FocusSprintModalProps {
  isOpen: boolean
  onClose: () => void
}

const focusTasks = [
  { id: "1", label: "Write competitive analysis summary", completed: false },
  { id: "2", label: "Draft customer interview questions", completed: false },
  { id: "3", label: "Review landing page wireframes", completed: false },
]

export function FocusSprintModal({ isOpen, onClose }: FocusSprintModalProps) {
  const [tasks, setTasks] = useState(focusTasks)
  const [duration, setDuration] = useState(25)

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-lg -translate-y-1/2 sm:inset-x-auto">
        <KroweCard className="relative">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <OverlineLabel>Focus Mode</OverlineLabel>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              Start a Focus Sprint
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Select tasks to focus on and set your timer duration.
            </p>
          </div>

          {/* Duration selector */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="h-4 w-4 text-gray-500" />
              Sprint Duration
            </div>
            <div className="flex gap-2">
              {[15, 25, 45, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDuration(mins)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    duration === mins
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Task selection */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Target className="h-4 w-4 text-gray-500" />
              Focus Tasks
            </div>
            <div className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-gray-50 px-3">
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  label={task.label}
                  completed={task.completed}
                  onToggle={() => handleToggleTask(task.id)}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
            >
              Start Sprint
            </button>
          </div>

          {/* Timer placeholder */}
          <p className="mt-4 text-center text-xs text-gray-400">
            Timer will appear here when sprint starts
          </p>
        </KroweCard>
      </div>
    </>
  )
}
