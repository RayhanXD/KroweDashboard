import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

interface MetricRowProps {
  label: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function MetricRow({
  label,
  value,
  trend,
  trendValue,
  className,
}: MetricRowProps) {
  const trendConfig = {
    up: {
      icon: ArrowUp,
      color: "text-green-600",
    },
    down: {
      icon: ArrowDown,
      color: "text-red-600",
    },
    neutral: {
      icon: Minus,
      color: "text-gray-500",
    },
  }

  const TrendIcon = trend ? trendConfig[trend].icon : null

  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-900">{value}</span>
        {trend && TrendIcon && (
          <div
            className={cn(
              "flex items-center gap-0.5 text-xs",
              trendConfig[trend].color
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {trendValue && <span>{trendValue}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
