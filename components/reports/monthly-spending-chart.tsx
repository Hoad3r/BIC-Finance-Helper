"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function MonthlySpendingChart() {
  // Em uma aplicação real, esses dados viriam de uma API ou banco de dados
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
    {
      name: "Jul",
      total: 1700,
    },
    {
      name: "Ago",
      total: 1400,
    },
    {
      name: "Set",
      total: 1600,
    },
    {
      name: "Out",
      total: 1800,
    },
    {
      name: "Nov",
      total: 1900,
    },
    {
      name: "Dez",
      total: 2200,
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
        <Tooltip formatter={(value) => [`R$ ${value}`, "Valor"]} labelFormatter={(name) => `Mês: ${name}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
