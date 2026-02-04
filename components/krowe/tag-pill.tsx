import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TagPillProps {
  children: ReactNode
  variant?: "primary" | "neutral"
  className?: string
}

export function TagPill({
  children,
  variant = "neutral",
  className,
}: TagPillProps) {
  const variantClasses = {
    primary: "bg-orange-100 text-orange-700",
    neutral: "bg-gray-100 text-gray-700",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
