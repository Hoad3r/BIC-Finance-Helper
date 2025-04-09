import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

interface CategoriesLayoutProps {
  children: React.ReactNode
}

export default async function CategoriesLayout({ children }: CategoriesLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <>{children}</>
}
