import { KroweCard, OverlineLabel } from "@/components/krowe"
import { Map, Construction } from "lucide-react"

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <KroweCard className="text-center">
        <div className="flex flex-col items-center py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <Map className="h-8 w-8 text-orange-600" />
          </div>
          <OverlineLabel className="mt-4">Roadmap</OverlineLabel>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Coming Soon
          </h1>
          <p className="mt-2 max-w-md text-gray-500">
            Your visual journey planner is under construction. Track milestones, 
            set goals, and visualize your startup path.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-orange-600">
            <Construction className="h-4 w-4" />
            <span>Under development</span>
          </div>
        </div>
      </KroweCard>
    </div>
  )
}
