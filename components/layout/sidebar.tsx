"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  Search,
  CheckSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ProgressBar } from "@/components/krowe"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/research", label: "Research", icon: Search },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/reports", label: "Reports", icon: BarChart3 },
]

interface SidebarProps {
  progress?: number
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ progress = 42, collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "hidden shrink-0 border-r border-gray-200 bg-white transition-all duration-300 ease-in-out lg:block",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className={cn(
          "flex h-16 items-center border-b border-gray-200",
          collapsed ? "justify-center px-2" : "px-4"
        )}>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/KroweLogo.png"
              alt="Krowe"
              width={collapsed ? 32 : 120}
              height={collapsed ? 32 : 40}
              className={cn("shrink-0 object-contain", collapsed ? "h-8 w-8" : "h-10 w-[120px]")}
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 space-y-1 py-4", collapsed ? "px-2" : "px-3")}>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors",
                  collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2",
                  isActive
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-orange-500" : "text-gray-500"
                  )}
                />
                {!collapsed && item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className={cn("border-t border-gray-200", collapsed ? "p-2" : "p-4")}>
          {/* Progress summary - hidden when collapsed */}
          {!collapsed && (
            <div className="mb-4 rounded-lg bg-gray-50 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700">Overall Progress</span>
                <span className="text-gray-500">{progress}%</span>
              </div>
              <ProgressBar value={progress} size="sm" />
            </div>
          )}

          {/* Settings link */}
          <Link
            href="/settings"
            title={collapsed ? "Settings" : undefined}
            className={cn(
              "flex items-center rounded-lg text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900",
              collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"
            )}
          >
            <Settings className="h-4 w-4 shrink-0 text-gray-500" />
            {!collapsed && "Settings"}
          </Link>

          {/* Toggle button */}
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "mt-2 flex w-full items-center rounded-lg text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700",
              collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
