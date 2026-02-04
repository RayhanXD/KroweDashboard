import { KroweCard, OverlineLabel } from "@/components/krowe"
import { Search, Construction } from "lucide-react"

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <KroweCard className="text-center">
        <div className="flex flex-col items-center py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <OverlineLabel className="mt-4">Research</OverlineLabel>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Coming Soon
          </h1>
          <p className="mt-2 max-w-md text-gray-500">
            Your research hub is being built. Organize findings, track competitors, 
            and document market insights all in one place.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-blue-600">
            <Construction className="h-4 w-4" />
            <span>Under development</span>
          </div>
        </div>
      </KroweCard>
    </div>
  )
}
