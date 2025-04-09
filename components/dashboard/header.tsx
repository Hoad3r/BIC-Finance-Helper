"use client"

import type React from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  showBackButton?: boolean
}

export function DashboardHeader({ heading, text, children, showBackButton = true }: DashboardHeaderProps) {
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard"

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6">
      <div className="grid gap-1">
        <div className="flex items-center gap-3">
          {showBackButton && !isDashboard && (
            <Button variant="ghost" size="icon" asChild className="h-9 w-9">
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
          )}
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{heading}</h1>
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
