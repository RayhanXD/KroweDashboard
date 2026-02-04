"use client"

import { useState } from "react"
import Link from "next/link"
import { KroweCard, OverlineLabel, TaskRow } from "@/components/krowe"
import { ListTodo, ArrowRight } from "lucide-react"

interface Task {
  id: string
  label: string
  completed: boolean
  priority?: "high" | "medium" | "low"
}

interface TopTasksProps {
  tasks?: Task[]
}

const defaultTasks: Task[] = [
  { id: "1", label: "Finalize pricing strategy document", completed: false, priority: "high" },
  { id: "2", label: "Send survey to beta waitlist", completed: false, priority: "high" },
  { id: "3", label: "Update pitch deck with new metrics", completed: true, priority: "medium" },
  { id: "4", label: "Research payment processor options", completed: false },
  { id: "5", label: "Draft social media launch posts", completed: false, priority: "low" },
]

export function TopTasks({ tasks: initialTasks = defaultTasks }: TopTasksProps) {
  const [tasks, setTasks] = useState(initialTasks)

  const handleToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <KroweCard>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <ListTodo className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <OverlineLabel>Task Queue</OverlineLabel>
            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              Top Tasks
            </h3>
          </div>
        </div>
        <Link
          href="/tasks"
          className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
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
