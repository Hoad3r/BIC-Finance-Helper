import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { CategoriesGrid } from "@/components/categories/categories-grid"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddCategoryDialog } from "@/components/categories/add-category-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/page-transition"
import { Toaster } from "@/components/ui/toaster"

export default async function CategoriesPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <DashboardShell>
        <DashboardHeader heading="Categorias" text="Gerencie suas categorias de transações.">
          <AddCategoryDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </AddCategoryDialog>
        </DashboardHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="expense">Despesas</TabsTrigger>
            <TabsTrigger value="income">Receitas</TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="p-6">
              <TabsContent value="all" className="m-0">
                <CategoriesGrid />
              </TabsContent>
              <TabsContent value="expense" className="m-0">
                <CategoriesGrid filterType="expense" />
              </TabsContent>
              <TabsContent value="income" className="m-0">
                <CategoriesGrid filterType="income" />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
        <Toaster />
      </DashboardShell>
    </PageTransition>
  )
}
