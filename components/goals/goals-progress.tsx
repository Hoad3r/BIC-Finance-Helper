"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, AlertCircle, Clock } from "lucide-react"
import { useGoals } from "@/lib/goals-context"
import { useEffect, useState } from "react"
import { format, addMonths, differenceInMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"

export function GoalsProgress() {
  const { goals } = useGoals()
  const [activeGoals, setActiveGoals] = useState([])
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Filtrar apenas metas ativas e ordenar por progresso
    const filtered = goals
      .filter((goal) => goal.status === "active")
      .sort((a, b) => {
        // Ordenar por progresso (decrescente)
        const progressA = (a.current / a.target) * 100
        const progressB = (b.current / b.target) * 100
        return progressB - progressA
      })

    setActiveGoals(filtered)

    // Preparar dados para o gráfico de conclusão estimada
    const data = filtered
      .map((goal) => {
        const monthsToCompletion = calculateMonthsToCompletion(goal)

        return {
          name: goal.name.length > 12 ? goal.name.substring(0, 12) + "..." : goal.name,
          meses: monthsToCompletion === Number.POSITIVE_INFINITY ? 0 : monthsToCompletion,
          infinito: monthsToCompletion === Number.POSITIVE_INFINITY,
          color: goal.color,
          estimativa: getEstimatedCompletionText(goal),
        }
      })
      .sort((a, b) => {
        // Ordenar por meses para conclusão (crescente)
        if (a.infinito && !b.infinito) return 1
        if (!a.infinito && b.infinito) return -1
        return a.meses - b.meses
      })

    setChartData(data)
  }, [goals])

  // Função para calcular meses até a conclusão
  const calculateMonthsToCompletion = (goal) => {
    const { current, target, monthlyContribution } = goal

    if (monthlyContribution <= 0) {
      return Number.POSITIVE_INFINITY // Representa "sem aporte definido"
    }

    const remaining = target - current
    return Math.ceil(remaining / monthlyContribution)
  }

  // Função para obter texto de conclusão estimada
  const getEstimatedCompletionText = (goal) => {
    const { current, target, monthlyContribution } = goal

    if (monthlyContribution <= 0) {
      return "Sem aporte definido"
    }

    const remaining = target - current
    const monthsNeeded = Math.ceil(remaining / monthlyContribution)

    if (monthsNeeded <= 0) {
      return "Meta concluída"
    }

    const estimatedDate = addMonths(new Date(), monthsNeeded)
    return format(estimatedDate, "MMMM yyyy", { locale: ptBR })
  }

  // Função para calcular a data limite em meses a partir de agora
  const getDeadlineInMonths = (deadline) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    return differenceInMonths(deadlineDate, today)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Progresso das Metas Ativas</h3>
          <p className="text-sm text-muted-foreground">Acompanhe o progresso das suas metas financeiras ativas.</p>
        </div>

        <div className="space-y-4">
          {activeGoals.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <div className="flex flex-col items-center text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Nenhuma meta ativa encontrada.</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Crie uma nova meta para acompanhar seu progresso.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            activeGoals.map((goal) => {
              const progress = Math.round((goal.current / goal.target) * 100)
              const estimatedCompletion = getEstimatedCompletionText(goal)
              const deadlineMonths = getDeadlineInMonths(goal.deadline)

              return (
                <Card key={goal.name} className="overflow-hidden h-[140px]">
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <span className="mr-2">{goal.icon}</span>
                        {goal.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        R$ {goal.current.toLocaleString("pt-BR")} / R$ {goal.target.toLocaleString("pt-BR")}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${progress}%`, backgroundColor: goal.color }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium">{progress}%</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Prazo: {new Date(goal.deadline).toLocaleDateString("pt-BR")}
                          {deadlineMonths < 0 ? " (vencido)" : deadlineMonths === 0 ? " (este mês)" : ""}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{ borderColor: goal.color, color: goal.color }}
                      >
                        Conclusão: {estimatedCompletion}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Estimativa de Conclusão</h4>
            <p className="text-xs text-muted-foreground">Tempo estimado para conclusão de cada meta</p>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground text-sm">Nenhuma meta ativa para exibir no gráfico.</p>
          </div>
        ) : (
          <div className="h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" barGap={0} barSize={20}>
                <XAxis
                  type="number"
                  tickFormatter={(value) => `${value} meses`}
                  domain={[0, "dataMax"]}
                  allowDecimals={false}
                />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} tickLine={false} />
                <Tooltip
                  formatter={(value, name) => [
                    value === 0 && chartData.find((d) => d.name === name)?.infinito
                      ? "Sem estimativa"
                      : `${value} meses`,
                    "Tempo estimado",
                  ]}
                  labelFormatter={(name) => {
                    const item = chartData.find((d) => d.name === name)
                    return `${name}${item?.infinito ? " (sem aporte definido)" : `: ${item?.estimativa}`}`
                  }}
                  cursor={false}
                />
                <Bar
                  dataKey="meses"
                  radius={[0, 4, 4, 0]}
                  fill={(data) => (data.infinito ? "#d1d5db" : data.color || "#3b82f6")}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
