"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { EditCategoryDialog } from "./edit-category-dialog"
import { DeleteCategoryDialog } from "./delete-category-dialog"
import { Progress } from "@/components/ui/progress"
import { CategoriesStats } from "./categories-stats"
import { useFinance } from "@/lib/finance-context"

interface CategoriesGridProps {
  filterType?: "all" | "income" | "expense"
}

export function CategoriesGrid({ filterType = "all" }: CategoriesGridProps) {
  // Use the finance context instead of local state
  const { categories, updateCategory, deleteCategory } = useFinance()

  // Filtra as categorias com base no tipo selecionado
  const filteredCategories = categories.filter((category) => {
    if (filterType === "all") return true
    return category.type === filterType
  })

  // Calcular totais para o resumo
  const totalBudget = categories.filter((cat) => cat.type === "expense").reduce((sum, cat) => sum + cat.budget, 0)
  const totalSpent = categories.filter((cat) => cat.type === "expense").reduce((sum, cat) => sum + cat.spent, 0)

  return (
    <div className="space-y-6">
      {/* Resumo das categorias */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{categories.filter((c) => c.type === "expense").length} despesas</span>
              <span>{categories.filter((c) => c.type === "income").length} receitas</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Soma de todos os orçamentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">R$ {totalSpent.toFixed(2)}</div>
            <div className="flex items-center justify-between mt-1">
              <Progress
                value={(totalSpent / totalBudget) * 100}
                className="h-2 flex-1"
                indicatorClassName={totalSpent > totalBudget ? "bg-rose-500" : ""}
              />
              <span className="text-xs ml-2">{Math.round((totalSpent / totalBudget) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição de despesas por categoria - only show in "all" view */}
      {filterType === "all" && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CategoriesStats />
          </CardContent>
        </Card>
      )}

      {/* Grid de categorias */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="pb-2" style={{ borderBottom: `2px solid ${category.color}` }}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  <span className="mr-2 text-xl">{category.icon}</span>
                  {category.name}
                </CardTitle>
                <Badge variant={category.type === "income" ? "outline" : "secondary"}>
                  {category.type === "income" ? "Receita" : "Despesa"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{category.transactionCount} transações</span>
                {category.type === "expense" && (
                  <span>
                    R$ {category.spent.toFixed(2)} / R$ {category.budget.toFixed(2)}
                  </span>
                )}
              </div>
              {category.type === "expense" && category.budget > 0 && (
                <div className="mt-2">
                  <Progress
                    value={(category.spent / category.budget) * 100}
                    className="h-2"
                    indicatorClassName={category.spent > category.budget ? "bg-rose-500" : ""}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
              <EditCategoryDialog category={category} onCategoryUpdated={updateCategory}>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </EditCategoryDialog>
              <DeleteCategoryDialog category={category} onDelete={() => deleteCategory(category.id)}>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-rose-500 hover:text-rose-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </DeleteCategoryDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
