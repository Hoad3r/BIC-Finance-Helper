"use client"

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function IncomeVsExpenseChart() {
  // Em uma aplicação real, esses dados viriam de uma API ou banco de dados
  const data = [
    {
      name: "Jan",
      receitas: 3200,
      despesas: 1200,
    },
    {
      name: "Fev",
      receitas: 3200,
      despesas: 1800,
    },
    {
      name: "Mar",
      receitas: 3500,
      despesas: 1400,
    },
    {
      name: "Abr",
      receitas: 3200,
      despesas: 1300,
    },
    {
      name: "Mai",
      receitas: 3200,
      despesas: 1200,
    },
    {
      name: "Jun",
      receitas: 3200,
      despesas: 1500,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
          tickMargin={8}
        />
        <Tooltip formatter={(value) => [`R$ ${value}`, ""]} labelFormatter={(name) => `Mês: ${name}`} />
        <Legend />
        <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
