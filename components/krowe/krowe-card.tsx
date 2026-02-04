'use client';

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface KroweCardProps {
  children: ReactNode
  variant?: "base" | "featured" | "clickable"
  className?: string
  onClick?: () => void
}

export function KroweCard({
  children,
  variant = "base",
  className,
  onClick,
}: KroweCardProps) {
  const baseClasses = "rounded-xl border border-gray-200 bg-white p-6 shadow-sm"

  const variantClasses = {
    base: "",
    featured: "border-t-2 border-t-orange-500",
    clickable:
      "cursor-pointer hover:border-orange-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 motion-reduce:hover:translate-y-0",
  }

  const Component = onClick ? "button" : "div"

  return (
    <Component
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      {children}
    </Component>
  )
}
