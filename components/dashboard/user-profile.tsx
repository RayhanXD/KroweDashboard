import { KroweCard, OverlineLabel, TagPill } from "@/components/krowe"
import { User, Mail, Calendar } from "lucide-react"

interface UserProfileProps {
  userName?: string
  email?: string
  joinDate?: string
  plan?: "free" | "pro" | "enterprise"
}

export function UserProfile({
  userName = "Marcus Chen",
  email = "marcus@ecotrack.io",
  joinDate = "January 2026",
  plan = "pro",
}: UserProfileProps) {
  const planLabels = {
    free: "Free",
    pro: "Pro",
    enterprise: "Enterprise",
  }

  return (
    <KroweCard>
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-700">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{userName}</h3>
              <TagPill variant={plan === "pro" ? "primary" : "neutral"}>
                {planLabels[plan]}
              </TagPill>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Joined {joinDate}</span>
            </div>
          </div>
        </div>
      </div>
    </KroweCard>
  )
}
