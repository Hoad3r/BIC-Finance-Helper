import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthlySpendingChart } from "@/components/reports/monthly-spending-chart"
import { CategoryBreakdownChart } from "@/components/reports/category-breakdown-chart"
import { IncomeVsExpenseChart } from "@/components/reports/income-vs-expense-chart"
import { BalanceHistoryChart } from "@/components/reports/balance-history-chart"
import { ReportsSummary } from "@/components/reports/reports-summary"
import { Button } from "@/components/ui/button"
import { Download, Share } from "lucide-react"
import { PageTransition } from "@/components/page-transition"

export default async function ReportsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <DashboardShell>
        <DashboardHeader heading="Relatórios" text="Visualize seus dados financeiros com gráficos e análises.">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
          </div>
        </DashboardHeader>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <ReportsSummary />
          </CardContent>
        </Card>

        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="monthly">Gastos Mensais</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="income-expense">Receitas vs Despesas</TabsTrigger>
            <TabsTrigger value="balance">Histórico de Saldo</TabsTrigger>
          </TabsList>

          <Card>
            <TabsContent value="monthly" className="m-0">
              <CardHeader>
                <CardTitle>Gastos Mensais</CardTitle>
                <CardDescription>Seus padrões de gastos nos últimos 6 meses.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <MonthlySpendingChart />
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="categories" className="m-0">
              <CardHeader>
                <CardTitle>Distribuição por Categorias</CardTitle>
                <CardDescription>Como suas despesas estão distribuídas entre as categorias.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <CategoryBreakdownChart />
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="income-expense" className="m-0">
              <CardHeader>
                <CardTitle>Receitas vs Despesas</CardTitle>
                <CardDescription>Comparação entre suas receitas e despesas ao longo do tempo.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <IncomeVsExpenseChart />
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="balance" className="m-0">
              <CardHeader>
                <CardTitle>Histórico de Saldo</CardTitle>
                <CardDescription>Evolução do seu saldo ao longo do tempo.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <BalanceHistoryChart />
                </div>
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
      </DashboardShell>
    </PageTransition>
  )
}
