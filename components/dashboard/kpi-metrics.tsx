import { KroweCard, OverlineLabel, MetricRow } from "@/components/krowe"
import { TrendingUp } from "lucide-react"

interface Metric {
  label: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

interface KPIMetricsProps {
  metrics?: Metric[]
}

const defaultMetrics: Metric[] = [
  { label: "Tasks Completed", value: "18/24", trend: "up", trendValue: "+6" },
  { label: "Customer Interviews", value: "12", trend: "up", trendValue: "+3" },
  { label: "Waitlist Signups", value: "847", trend: "up", trendValue: "+124" },
  { label: "NPS Score", value: "72", trend: "up", trendValue: "+8" },
]

export function KPIMetrics({ metrics = defaultMetrics }: KPIMetricsProps) {
  return (
    <KroweCard>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <OverlineLabel>KPI Snapshot</OverlineLabel>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            This Week
          </h3>
        </div>
      </div>
      <div className="mt-4 divide-y divide-gray-100">
        {metrics.map((metric) => (
          <MetricRow
            key={metric.label}
            label={metric.label}
            value={metric.value}
            trend={metric.trend}
            trendValue={metric.trendValue}
          />
        ))}
      </div>
    </KroweCard>
  )
}
