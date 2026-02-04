import { KroweCard, OverlineLabel, TagPill } from "@/components/krowe"
import { Users } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  status: "active" | "away" | "offline"
}

interface TeamMembersProps {
  members?: TeamMember[]
}

const defaultMembers: TeamMember[] = [
  { name: "Marcus Chen", role: "Founder & CEO", status: "active" },
  { name: "Sarah Kim", role: "Co-Founder & CTO", status: "active" },
  { name: "David Park", role: "Advisor", status: "away" },
]

export function TeamMembers({ members = defaultMembers }: TeamMembersProps) {
  const statusColors = {
    active: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-300",
  }

  return (
    <KroweCard>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
          <Users className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <OverlineLabel>Team</OverlineLabel>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {members.length} Members
          </h3>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${statusColors[member.status]}`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
            <TagPill variant="neutral">{member.status}</TagPill>
          </div>
        ))}
      </div>
    </KroweCard>
  )
}
