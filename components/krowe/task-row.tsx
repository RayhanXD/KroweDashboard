'use client';

import { cn } from "@/lib/utils"
import { TagPill } from "./tag-pill"

interface TaskRowProps {
  label: string
  completed?: boolean
  priority?: "high" | "medium" | "low"
  onToggle?: () => void
  className?: string
}

export function TaskRow({
  label,
  completed = false,
  priority,
  onToggle,
  className,
}: TaskRowProps) {
  const priorityLabels = {
    high: "High",
    medium: "Medium",
    low: "Low",
  }

  const priorityVariants: Record<string, "primary" | "neutral"> = {
    high: "primary",
    medium: "neutral",
    low: "neutral",
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 py-2",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
          completed
            ? "border-orange-500 bg-orange-500"
            : "border-gray-300 hover:border-orange-300"
        )}
        aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {completed && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
      <span
        className={cn(
          "flex-1 text-sm",
          completed ? "text-gray-400 line-through" : "text-gray-900"
        )}
      >
        {label}
      </span>
      {priority && (
        <TagPill variant={priorityVariants[priority]}>
          {priorityLabels[priority]}
        </TagPill>
      )}
    </div>
  )
}
