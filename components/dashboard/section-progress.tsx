import { KroweCard, OverlineLabel, ProgressBar } from "@/components/krowe"
import { Layers } from "lucide-react"

interface Section {
  name: string
  progress: number
}

interface SectionProgressProps {
  sections?: Section[]
}

const defaultSections: Section[] = [
  { name: "Problem Statement", progress: 100 },
  { name: "Solution Design", progress: 75 },
  { name: "Market Analysis", progress: 50 },
  { name: "Business Model", progress: 25 },
  { name: "Go-to-Market", progress: 10 },
]

export function SectionProgress({ sections = defaultSections }: SectionProgressProps) {
  return (
    <KroweCard>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <Layers className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <OverlineLabel>Section Progress</OverlineLabel>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            Business Plan
          </h3>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {sections.map((section) => (
          <div key={section.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-gray-700">{section.name}</span>
              <span className="text-gray-500">{section.progress}%</span>
            </div>
            <ProgressBar value={section.progress} size="sm" />
          </div>
        ))}
      </div>
    </KroweCard>
  )
}
