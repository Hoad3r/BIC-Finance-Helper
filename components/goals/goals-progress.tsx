"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function GoalsProgress() {
  // Em uma aplicação real, esses dados viriam de uma API ou banco de dados
  const goalsData = [
    {
      name: "Fundo de Emergência",
      progress: 65,
      target: 10000,
      current: 6500,
    },
    {
      name: "Viagem de Férias",
      progress: 56,
      target: 5000,
      current: 2800,
    },
    {
      name: "Entrada Apartamento",
      progress: 30,
      target: 50000,
      current: 15000,
    },
  ]

  const chartData = goalsData.map((goal) => ({
    name: goal.name,
    progresso: goal.progress,
    meta: 100,
  }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Progresso das Metas Ativas</h3>
          <p className="text-sm text-muted-foreground">Acompanhe o progresso das suas metas financeiras ativas.</p>
        </div>

        <div className="space-y-4">
          {goalsData.map((goal) => (
            <Card key={goal.name} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{goal.name}</CardTitle>
                  <CardDescription className="text-xs">
                    R$ {goal.current.toLocaleString("pt-BR")} / R$ {goal.target.toLocaleString("pt-BR")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-2 pt-0">
                <div className="flex items-center justify-between">
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${goal.progress}%` }} />
                  </div>
                  <span className="ml-2 text-sm font-medium">{goal.progress}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Comparativo de Progresso</h4>
            <p className="text-xs text-muted-foreground">Visualize o progresso de todas as suas metas</p>
          </div>
        </div>

        <div className="h-[180px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" barGap={0} barSize={20}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip formatter={(value, name) => [`${value}%`, name === "progresso" ? "Progresso" : "Meta"]} />
              <Bar dataKey="meta" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
              <Bar dataKey="progresso" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
