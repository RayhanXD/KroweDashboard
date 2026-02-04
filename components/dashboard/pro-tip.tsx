'use client';

import { KroweCard, OverlineLabel } from "@/components/krowe"
import { Lightbulb, X } from "lucide-react"

interface ProTipProps {
  tip?: string
  onDismiss?: () => void
}

export function ProTip({
  tip = "Talk to 5 customers this week. The insights you gain will be worth more than any market report.",
  onDismiss,
}: ProTipProps) {
  return (
    <KroweCard className="relative bg-orange-50 border-orange-100">
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-3 top-3 rounded p-1 text-orange-400 hover:bg-orange-100 hover:text-orange-600"
          aria-label="Dismiss tip"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
          <Lightbulb className="h-5 w-5 text-orange-600" />
        </div>
        <div className="pr-6">
          <OverlineLabel className="text-orange-600">Pro Tip</OverlineLabel>
          <p className="mt-1 text-sm text-orange-900">{tip}</p>
        </div>
      </div>
    </KroweCard>
  )
}
