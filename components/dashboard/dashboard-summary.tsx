"use client"

import { ArrowDown, ArrowUp, DollarSign, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinance } from "@/lib/finance-context"
import { useEffect, useState } from "react"

export function DashboardSummary() {
  const { transactions, categories } = useFinance()
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    savings: 0,
  })

  useEffect(() => {
    // Calculate summary based on transactions
    const income = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const expenses = Math.abs(transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))

    const balance = income - expenses
    const savings = income > 0 ? (balance / income) * 100 : 0

    setSummary({
      balance,
      income,
      expenses,
      savings,
    })
  }, [transactions])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summary.balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Total disponível</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
          <ArrowUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">${summary.income.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">+14% em relação ao mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas Mensais</CardTitle>
          <ArrowDown className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-500">${summary.expenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">-5% em relação ao mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Economias Mensais</CardTitle>
          <Target className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">${summary.balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">{summary.savings.toFixed(1)}% da receita</p>
        </CardContent>
      </Card>
    </>
  )
}
"use client"

import { ArrowDown, ArrowUp, DollarSign, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinance } from "@/lib/finance-context"
import { useEffect, useState } from "react"

export function DashboardSummary() {
  const { transactions } = useFinance()
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    savings: 0,
    incomeChange: 0,
    expenseChange: 0,
  })

  useEffect(() => {
    // Obter data atual
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Mês anterior
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    // Filtrar transações do mês atual
    const currentMonthTransactions = transactions.filter((t) => {
      const date = new Date(t.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })

    // Filtrar transações do mês anterior
    const lastMonthTransactions = transactions.filter((t) => {
      const date = new Date(t.date)
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
    })

    // Calcular receitas e despesas do mês atual
    const currentIncome = currentMonthTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const currentExpenses = Math.abs(
      currentMonthTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0),
    )

    // Calcular receitas e despesas do mês anterior
    const lastIncome = lastMonthTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const lastExpenses = Math.abs(
      lastMonthTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0),
    )

    // Calcular variações percentuais
    const incomeChange = lastIncome > 0 ? ((currentIncome - lastIncome) / lastIncome) * 100 : 0

    const expenseChange = lastExpenses > 0 ? ((currentExpenses - lastExpenses) / lastExpenses) * 100 : 0

    const balance = currentIncome - currentExpenses
    const savings = currentIncome > 0 ? (balance / currentIncome) * 100 : 0

    setSummary({
      balance,
      income: currentIncome,
      expenses: currentExpenses,
      savings,
      incomeChange,
      expenseChange,
    })
  }, [transactions])

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {summary.balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Total disponível</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
          <ArrowUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">R$ {summary.income.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {summary.incomeChange > 0 ? "+" : ""}
            {summary.incomeChange.toFixed(1)}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas Mensais</CardTitle>
          <ArrowDown className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-500">R$ {summary.expenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {summary.expenseChange > 0 ? "+" : ""}
            {summary.expenseChange.toFixed(1)}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Economias Mensais</CardTitle>
          <Target className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">R$ {summary.balance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">{summary.savings.toFixed(1)}% da receita</p>
        </CardContent>
      </Card>
    </>
  )
}
