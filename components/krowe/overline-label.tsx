import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface OverlineLabelProps {
  children: ReactNode
  className?: string
}

export function OverlineLabel({ children, className }: OverlineLabelProps) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-widest text-gray-500",
        className
      )}
    >
      {children}
    </span>
  )
}
