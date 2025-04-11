import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { FinanceProvider } from "@/lib/finance-context"
import { GoalsProvider } from "@/lib/goals-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinanceTrack - Controle suas finanças",
  description: "Aplicativo para controle de finanças pessoais",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <FinanceProvider>
          <GoalsProvider>
            {children}
            <Toaster />
          </GoalsProvider>
        </FinanceProvider>
      </body>
    </html>
  )
}
