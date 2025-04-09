"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function CategoryBreakdownChart() {
  // Em uma aplicação real, esses dados viriam de uma API ou banco de dados
  const data = [
    { name: "Alimentação", value: 650, color: "#ef4444" },
    { name: "Moradia", value: 950, color: "#8b5cf6" },
    { name: "Transporte", value: 300, color: "#3b82f6" },
    { name: "Lazer", value: 200, color: "#f97316" },
    { name: "Serviços", value: 150, color: "#14b8a6" },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`R$ ${value}`, "Valor"]} labelFormatter={(name) => `Categoria: ${name}`} />
      </PieChart>
    </ResponsiveContainer>
  )
}
