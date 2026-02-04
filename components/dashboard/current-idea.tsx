import { KroweCard, OverlineLabel, TagPill, ProgressBar } from "@/components/krowe"
import { Lightbulb } from "lucide-react"

interface CurrentIdeaProps {
  ideaName?: string
  phaseName?: string
  progress?: number
  description?: string
}

export function CurrentIdea({
  ideaName = "EcoTrack",
  phaseName = "Validation",
  progress = 42,
  description = "Carbon footprint tracking app for conscious consumers",
}: CurrentIdeaProps) {
  return (
    <KroweCard>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
          <Lightbulb className="h-5 w-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <OverlineLabel>Current Idea</OverlineLabel>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">{ideaName}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <TagPill variant="primary">{phaseName}</TagPill>
        <span className="text-sm text-gray-500">{progress}% complete</span>
      </div>
      <div className="mt-3">
        <ProgressBar value={progress} />
      </div>
    </KroweCard>
  )
}
