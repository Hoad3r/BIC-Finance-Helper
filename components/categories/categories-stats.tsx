"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useFinance } from "@/lib/finance-context"
import { useState, useEffect } from "react"

export function CategoriesStats() {
  // Use the finance context to get categories and transactions
  const { categories, transactions } = useFinance()
  const [chartData, setChartData] = useState([])

  // Process data for the chart
  useEffect(() => {
    // Filter expense categories with spending
    const data = categories
      .filter((cat) => cat.type === "expense" && cat.spent > 0)
      .map((cat) => ({
        name: cat.name,
        value: cat.spent,
        color: cat.color,
      }))

    setChartData(data)
  }, [categories, transactions])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col justify-center space-y-4">
        <h3 className="text-lg font-medium">Distribuição de Despesas por Categoria</h3>
        <p className="text-sm text-muted-foreground">
          Visualize como seus gastos estão distribuídos entre as diferentes categorias.
          {chartData.length > 0 &&
            `${chartData[0].name}${chartData.length > 1 ? ` e ${chartData[1].name}` : ""} representam a maior parte dos seus gastos mensais.`}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">R$ {item.value.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`R$ ${value}`, "Valor"]} labelFormatter={(name) => `Categoria: ${name}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
