"use client"

import { ArrowDown, ArrowUp, DollarSign, TrendingDown, TrendingUp } from "lucide-react"

export function ReportsSummary() {
  // Em uma aplicação real, esses dados viriam de uma API ou banco de dados
  const summary = {
    totalIncome: 11450.0,
    totalExpenses: 7250.5,
    balance: 4199.5,
    savingsRate: 36.7, // porcentagem de economia
    topExpenseCategory: "Moradia",
    topExpenseAmount: 2400.0,
    monthlyChange: 8.3, // porcentagem de mudança no saldo em relação ao mês anterior
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total de Receitas</p>
            <h3 className="text-2xl font-bold text-emerald-500">R$ {summary.totalIncome.toFixed(2)}</h3>
          </div>
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-500">
            <ArrowUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total de Despesas</p>
            <h3 className="text-2xl font-bold text-rose-500">R$ {summary.totalExpenses.toFixed(2)}</h3>
          </div>
          <div className="rounded-full bg-rose-100 p-2 text-rose-500">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Saldo</p>
            <h3 className="text-2xl font-bold text-blue-500">R$ {summary.balance.toFixed(2)}</h3>
          </div>
          <div className="rounded-full bg-blue-100 p-2 text-blue-500">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          {summary.monthlyChange > 0 ? (
            <>
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">+{summary.monthlyChange}% em relação ao mês anterior</span>
            </>
          ) : (
            <>
              <TrendingDown className="mr-1 h-3 w-3 text-rose-500" />
              <span className="text-rose-500">{Math.abs(summary.monthlyChange)}% em relação ao mês anterior</span>
            </>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Taxa de Economia</p>
            <h3 className="text-2xl font-bold text-purple-500">{summary.savingsRate}%</h3>
          </div>
          <div className="rounded-full bg-purple-100 p-2 text-purple-500">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Maior despesa: {summary.topExpenseCategory}</span>
          <span className="font-medium">R$ {summary.topExpenseAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
