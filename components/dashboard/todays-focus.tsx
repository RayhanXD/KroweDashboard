"use client"

import { useState } from "react"
import { KroweCard, OverlineLabel, TaskRow } from "@/components/krowe"
import { Target } from "lucide-react"

interface Task {
  id: string
  label: string
  completed: boolean
  priority?: "high" | "medium" | "low"
}

interface TodaysFocusProps {
  tasks?: Task[]
}

const defaultTasks: Task[] = [
  { id: "1", label: "Complete competitive analysis draft", completed: false, priority: "high" },
  { id: "2", label: "Schedule call with potential advisor", completed: true },
  { id: "3", label: "Review landing page copy", completed: false, priority: "medium" },
]

export function TodaysFocus({ tasks: initialTasks = defaultTasks }: TodaysFocusProps) {
  const [tasks, setTasks] = useState(initialTasks)

  const handleToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <KroweCard variant="featured">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
            <Target className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <OverlineLabel>Today&apos;s Focus</OverlineLabel>
            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              Priority Tasks
            </h3>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {completedCount}/{tasks.length} done
        </span>
      </div>
      <div className="mt-4 divide-y divide-gray-100">
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            label={task.label}
            completed={task.completed}
            priority={task.priority}
            onToggle={() => handleToggle(task.id)}
          />
        ))}
      </div>
    </KroweCard>
  )
}
