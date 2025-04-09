import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

interface TransactionsLayoutProps {
  children: React.ReactNode
}

export default async function TransactionsLayout({ children }: TransactionsLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <>{children}</>
}
