import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return <div className="container mx-auto grid items-start gap-8 pb-8 pt-4 px-4 md:px-6">{children}</div>
}
