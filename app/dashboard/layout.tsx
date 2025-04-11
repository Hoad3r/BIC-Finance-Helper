import type React from "react"
import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardClient from "./DashboardClient"

export const metadata: Metadata = {
  title: "BIC - Dashboard",
  description: "Gerencie suas finanças pessoais",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <DashboardClient children={children} />
}
