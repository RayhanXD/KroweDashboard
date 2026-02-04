"use client"

import Link from "next/link"
import { Bell, Plus } from "lucide-react"
import { ProgressBar } from "@/components/krowe"
import { MobileNav } from "./mobile-nav"

interface HeaderProps {
  progress?: number
  userName?: string
  onStartSprint?: () => void
}

export function Header({
  progress = 42,
  userName = "Marcus",
  onStartSprint,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      {/* Left: Mobile nav + Logo (mobile only) */}
      <div className="flex items-center gap-3 lg:hidden">
        <MobileNav progress={progress} />
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
            <span className="text-sm font-bold text-white">K</span>
          </div>
        </Link>
      </div>

      {/* Center: Mini progress (desktop) */}
      <div className="hidden items-center gap-3 lg:flex">
        <span className="text-sm font-medium text-gray-700">Journey Progress</span>
        <div className="w-32">
          <ProgressBar value={progress} size="sm" />
        </div>
        <span className="text-xs text-gray-500">{progress}%</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onStartSprint}
          className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Focus Sprint</span>
        </button>
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" />
        </button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  )
}
