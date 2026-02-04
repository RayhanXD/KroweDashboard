import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  size?: "sm" | "md"
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
  }

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-gray-100",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "rounded-full bg-orange-500 transition-all duration-300 motion-reduce:transition-none",
            sizeClasses[size]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
