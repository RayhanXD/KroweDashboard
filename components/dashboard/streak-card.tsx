import { KroweCard, OverlineLabel } from "@/components/krowe"
import { Flame } from "lucide-react"

interface StreakCardProps {
  streakDays?: number
  bestStreak?: number
}

export function StreakCard({
  streakDays = 7,
  bestStreak = 14,
}: StreakCardProps) {
  return (
    <KroweCard>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100">
            <Flame className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <OverlineLabel>Current Streak</OverlineLabel>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{streakDays}</span>
              <span className="text-sm text-gray-500">days</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Best streak</p>
          <p className="text-lg font-semibold text-gray-700">{bestStreak} days</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < streakDays % 7 || streakDays >= 7
                ? "bg-orange-500"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-gray-500">
        Keep the momentum going!
      </p>
    </KroweCard>
  )
}
