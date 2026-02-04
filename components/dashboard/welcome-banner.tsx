import { KroweCard, OverlineLabel, TagPill } from "@/components/krowe"
import { Sparkles } from "lucide-react"

interface WelcomeBannerProps {
  userName?: string
  greeting?: string
  motivationalQuote?: string
}

export function WelcomeBanner({
  userName = "Marcus",
  greeting,
  motivationalQuote = "The best time to start was yesterday. The second best time is now.",
}: WelcomeBannerProps) {
  const getGreeting = () => {
    if (greeting) return greeting
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <KroweCard variant="featured" className="col-span-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <OverlineLabel>Welcome Back</OverlineLabel>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {getGreeting()}, {userName}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-gray-600">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-pretty">{motivationalQuote}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TagPill variant="primary">Founder</TagPill>
        </div>
      </div>
    </KroweCard>
  )
}
