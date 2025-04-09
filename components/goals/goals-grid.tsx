"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { EditGoalDialog } from "./edit-goal-dialog"
import { DeleteGoalDialog } from "./delete-goal-dialog"
import { Progress } from "@/components/ui/progress"

interface GoalsGridProps {
  filterStatus?: "all" | "active" | "completed"
}

export function GoalsGrid({ filterStatus = "all" }: GoalsGridProps) {
  // Em uma aplicação real, esses dados viriam de uma API ou banco de dados
  const [goals, setGoals] = useState([
    {
      id: "1",
      name: "Fundo de Emergência",
      target: 10000,
      current: 6500,
      deadline: "2025-12-31",
      status: "active",
      icon: "🛡️",
      color: "#3b82f6",
      monthlyContribution: 500,
    },
    {
      id: "2",
      name: "Viagem de Férias",
      target: 5000,
      current: 2800,
      deadline: "2025-07-15",
      status: "active",
      icon: "✈️",
      color: "#8b5cf6",
      monthlyContribution: 300,
    },
    {
      id: "3",
      name: "Novo Notebook",
      target: 4500,
      current: 4500,
      deadline: "2025-05-30",
      status: "completed",
      icon: "💻",
      color: "#10b981",
      monthlyContribution: 0,
    },
    {
      id: "4",
      name: "Entrada Apartamento",
      target: 50000,
      current: 15000,
      deadline: "2026-12-31",
      status: "active",
      icon: "🏢",
      color: "#f97316",
      monthlyContribution: 1000,
    },
    {
      id: "5",
      name: "Novo Celular",
      target: 3000,
      current: 3000,
      deadline: "2025-01-15",
      status: "completed",
      icon: "📱",
      color: "#ef4444",
      monthlyContribution: 0,
    },
  ])

  // Filtra as metas com base no status selecionado
  const filteredGoals = goals.filter((goal) => {
    if (filterStatus === "all") return true
    return goal.status === filterStatus
  })

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredGoals.map((goal) => {
        const progress = Math.round((goal.current / goal.target) * 100)
        const isCompleted = goal.status === "completed"
        const remainingAmount = goal.target - goal.current
        const today = new Date()
        const deadline = new Date(goal.deadline)
        const remainingMonths = Math.max(
          0,
          Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)),
        )

        return (
          <Card key={goal.id} className="overflow-hidden">
            <CardHeader className="pb-2" style={{ borderBottom: `2px solid ${goal.color}` }}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  <span className="mr-2 text-xl">{goal.icon}</span>
                  {goal.name}
                </CardTitle>
                <Badge variant={isCompleted ? "outline" : "secondary"}>
                  {isCompleted ? "Concluída" : `${remainingMonths} meses restantes`}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progresso</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Meta</p>
                  <p className="font-medium">R$ {goal.target.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Acumulado</p>
                  <p className="font-medium">R$ {goal.current.toLocaleString("pt-BR")}</p>
                </div>
                {!isCompleted && (
                  <>
                    <div>
                      <p className="text-muted-foreground">Faltam</p>
                      <p className="font-medium">R$ {remainingAmount.toLocaleString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Contribuição Mensal</p>
                      <p className="font-medium">R$ {goal.monthlyContribution.toLocaleString("pt-BR")}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
              <EditGoalDialog goal={goal}>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </EditGoalDialog>
              <DeleteGoalDialog goal={goal}>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-rose-500 hover:text-rose-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </DeleteGoalDialog>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
