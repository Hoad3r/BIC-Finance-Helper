import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardSummary } from "@/components/dashboard/dashboard-summary"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { FinancialGoals } from "@/components/dashboard/financial-goals"
import { PageTransition } from "@/components/page-transition"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <DashboardShell>
        <DashboardHeader
          heading="Painel Financeiro"
          text="Visualize e gerencie suas finanças em um só lugar."
          showBackButton={false}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardSummary />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <SpendingChart />
          </div>
          <div className="col-span-3">
            <FinancialGoals />
          </div>
        </div>
        <RecentTransactions />
      </DashboardShell>
    </PageTransition>
  )
}
