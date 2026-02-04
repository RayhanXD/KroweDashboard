import { KroweCard, OverlineLabel } from "@/components/krowe"
import { BarChart3, Construction } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <KroweCard className="text-center">
        <div className="flex flex-col items-center py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
          <OverlineLabel className="mt-4">Reports</OverlineLabel>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Coming Soon
          </h1>
          <p className="mt-2 max-w-md text-gray-500">
            Your analytics dashboard is being crafted. Track progress, analyze 
            trends, and export beautiful reports.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-purple-600">
            <Construction className="h-4 w-4" />
            <span>Under development</span>
          </div>
        </div>
      </KroweCard>
    </div>
  )
}
