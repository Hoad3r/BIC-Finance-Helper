import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

interface GoalsLayoutProps {
  children: React.ReactNode
}

export default async function GoalsLayout({ children }: GoalsLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <>{children}</>
}
