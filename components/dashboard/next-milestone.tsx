import { KroweCard, OverlineLabel, TagPill } from "@/components/krowe"
import { Flag, Calendar } from "lucide-react"

interface NextMilestoneProps {
  milestoneName?: string
  dueDate?: string
  daysRemaining?: number
  description?: string
}

export function NextMilestone({
  milestoneName = "MVP Launch",
  dueDate = "Feb 15, 2026",
  daysRemaining = 12,
  description = "Ship the first testable version to 50 beta users",
}: NextMilestoneProps) {
  return (
    <KroweCard variant="clickable">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
          <Flag className="h-5 w-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <OverlineLabel>Next Milestone</OverlineLabel>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {milestoneName}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{dueDate}</span>
        </div>
        <TagPill variant={daysRemaining <= 3 ? "primary" : "neutral"}>
          {daysRemaining} days left
        </TagPill>
      </div>
    </KroweCard>
  )
}
