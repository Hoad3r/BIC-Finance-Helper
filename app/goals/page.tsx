import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { GoalsGrid } from "@/components/goals/goals-grid"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddGoalDialog } from "@/components/goals/add-goal-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoalsProgress } from "@/components/goals/goals-progress"
import { PageTransition } from "@/components/page-transition"

export default async function GoalsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <DashboardShell>
        <DashboardHeader heading="Metas Financeiras" text="Defina e acompanhe suas metas financeiras.">
          <AddGoalDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Meta
            </Button>
          </AddGoalDialog>
        </DashboardHeader>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <GoalsProgress />
          </CardContent>
        </Card>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="active">Ativas</TabsTrigger>
            <TabsTrigger value="completed">Concluídas</TabsTrigger>
            <TabsTrigger value="all">Todas</TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="p-6">
              <TabsContent value="active" className="m-0">
                <GoalsGrid filterStatus="active" />
              </TabsContent>
              <TabsContent value="completed" className="m-0">
                <GoalsGrid filterStatus="completed" />
              </TabsContent>
              <TabsContent value="all" className="m-0">
                <GoalsGrid />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </DashboardShell>
    </PageTransition>
  )
}
