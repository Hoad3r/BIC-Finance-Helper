"use client"

import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"
import { useMemo } from "react"

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
  status: string
  icon: string
}

interface TransactionsSummaryProps {
  transactions: Transaction[]
}

export function TransactionsSummary({ transactions }: TransactionsSummaryProps) {
  // Usando useMemo para calcular os valores apenas quando as transações mudarem
  const summary = useMemo(() => {
    // Filtra as transações do mês atual
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const currentMonthTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
    })

    // Calcula totais
    const totalIncome = currentMonthTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = currentMonthTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const balance = totalIncome - totalExpenses

    return {
      totalIncome,
      totalExpenses,
      balance,
      incomeChange: 12.5, // porcentagem de mudança em relação ao mês anterior (fixo para demonstração)
      expenseChange: -5.2, // porcentagem de mudança em relação ao mês anterior (fixo para demonstração)
    }
  }, [transactions])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Receitas do Mês</p>
            <h3 className="text-2xl font-bold text-emerald-500">R$ {summary.totalIncome.toFixed(2)}</h3>
          </div>
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-500">
            <ArrowUp className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          {summary.incomeChange > 0 ? (
            <>
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">{summary.incomeChange}% em relação ao mês anterior</span>
            </>
          ) : (
            <>
              <TrendingDown className="mr-1 h-3 w-3 text-rose-500" />
              <span className="text-rose-500">{Math.abs(summary.incomeChange)}% em relação ao mês anterior</span>
            </>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Despesas do Mês</p>
            <h3 className="text-2xl font-bold text-rose-500">R$ {summary.totalExpenses.toFixed(2)}</h3>
          </div>
          <div className="rounded-full bg-rose-100 p-2 text-rose-500">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          {summary.expenseChange < 0 ? (
            <>
              <TrendingDown className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">{Math.abs(summary.expenseChange)}% em relação ao mês anterior</span>
            </>
          ) : (
            <>
              <TrendingUp className="mr-1 h-3 w-3 text-rose-500" />
              <span className="text-rose-500">{summary.expenseChange}% em relação ao mês anterior</span>
            </>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Saldo do Mês</p>
            <h3 className="text-2xl font-bold text-blue-500">R$ {summary.balance.toFixed(2)}</h3>
          </div>
          <div className="rounded-full bg-blue-100 p-2 text-blue-500">
            <div className="relative h-5 w-5">
              <ArrowUp className="absolute h-5 w-5 opacity-50" />
              <ArrowDown className="absolute h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className="text-muted-foreground">
            {summary.balance > 0 ? "Você está economizando este mês!" : "Suas despesas superaram as receitas este mês."}
          </span>
        </div>
      </div>
    </div>
  )
}
