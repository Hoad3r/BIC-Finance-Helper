import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

interface ReportsLayoutProps {
  children: React.ReactNode
}

export default async function ReportsLayout({ children }: ReportsLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <>{children}</>
}
