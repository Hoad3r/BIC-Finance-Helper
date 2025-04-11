"use client"

import type React from "react"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import Link from "next/link"
import { BarChart3, CreditCard, Home, LayoutDashboard, List, Menu, Settings, Target, User, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transações",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Categorias",
    href: "/categories",
    icon: List,
  },
  {
    title: "Metas",
    href: "/goals",
    icon: Target,
  },
  {
    title: "Relatórios",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Perfil",
    href: "/profile",
    icon: User,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardClient({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b bg-background md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Home className="h-5 w-5" />
            <span>BIC</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <div className="flex h-full flex-col">
                <div className="flex h-14 items-center justify-between border-b px-4">
                  <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <Home className="h-5 w-5" />
                    <span>BIC</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Fechar menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  <SidebarNav items={sidebarNavItems} className="px-2" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex-1 items-start md:grid md:grid-cols-[240px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
        {/* Desktop Sidebar */}
        <aside className="fixed top-0 z-30 hidden h-screen w-full shrink-0 border-r md:sticky md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex h-14 items-center px-4 font-semibold">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span>BIC</span>
              </Link>
            </div>
            <SidebarNav items={sidebarNavItems} className="px-2" />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>

      {/* Floating back to top button */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Home className="h-5 w-5" />
        </Button>
      </div>
      <footer className="border-t py-6">
  <div className="container flex flex-col items-center justify-center gap-4 md:h-24">
    <p className="text-center text-sm leading-loose text-muted-foreground">
      © 2025 BIC - BACK IN CONTROL. All rights reserved.
    </p>
  </div>
</footer>

    </div>
  )
}
