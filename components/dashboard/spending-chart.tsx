"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function SpendingChart() {
  // In a real app, this data would come from an API or database
  const data = [
    {
      name: "Jan",
      total: 1200,
    },
    {
      name: "Fev",
      total: 1800,
    },
    {
      name: "Mar",
      total: 1400,
    },
    {
      name: "Abr",
      total: 1300,
    },
    {
      name: "Mai",
      total: 1200,
    },
    {
      name: "Jun",
      total: 1500,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos Mensais</CardTitle>
        <CardDescription>Seus padrões de gastos nos últimos 6 meses.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$${value}`}
            />
            <Tooltip
              formatter={(value) => [`R$ ${value.toFixed(2)}`, "Total"]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
