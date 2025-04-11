"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Goal, useGoals } from "@/lib/goals-context"
import { useEffect, useState } from "react"

export function FinancialGoals() {
  const { goals } = useGoals()
  const [activeGoals, setActiveGoals] = useState<Goal[]>([])

  useEffect(() => {
    // Filtrar apenas metas ativas e ordenar por progresso
    const filtered = goals
      .filter((goal) => goal.status === "active")
      .sort((a, b) => {
        const progressA = (a.current / a.target) * 100
        const progressB = (b.current / b.target) * 100
        return progressB - progressA
      })
      .slice(0, 3) // Mostrar apenas as 3 principais metas

    setActiveGoals(filtered)
  }, [goals])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metas Financeiras</CardTitle>
        <CardDescription>Acompanhe o progresso das suas metas financeiras.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activeGoals.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhuma meta ativa encontrada.</p>
          ) : (
            activeGoals.map((goal) => {
              const progress = Math.round((goal.current / goal.target) * 100)

              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium flex items-center">
                      <span className="mr-2">{goal.icon}</span>
                      {goal.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      R$ {goal.current.toFixed(2)} / R$ {goal.target.toFixed(2)}
                    </div>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded">
                    <div
                      className="absolute top-0 left-0 h-full rounded"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: goal.color,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>{progress}% completo</div>
                    <div>Prazo: {new Date(goal.deadline).toLocaleDateString("pt-BR")}</div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
