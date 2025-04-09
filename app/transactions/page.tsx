"use client"

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { TransactionsFilter } from "@/components/transactions/transactions-filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"
import { useFinance } from "@/lib/finance-context"

export default async function TransactionsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <TransactionsClientContent />
      <Toaster />
    </DashboardShell>
  )
}

// Componente cliente para gerenciar o estado das transações
function TransactionsClientContent() {
  // Use the finance context
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance()

  // Estado para os filtros
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "Todas as Categorias",
    startDate: undefined,
    endDate: undefined,
  })

  // Calcular os totais para o resumo
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    incomeChange: 12.5, // porcentagem fixa para demonstração
    expenseChange: -5.2, // porcentagem fixa para demonstração
  })

  // Atualizar o resumo quando as transações mudarem
  useEffect(() => {
    const totalIncome = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const balance = totalIncome - totalExpenses

    setSummary({
      totalIncome,
      totalExpenses,
      balance,
      incomeChange: 12.5, // porcentagem fixa para demonstração
      expenseChange: -5.2, // porcentagem fixa para demonstração
    })
  }, [transactions])

  // Função para aplicar os filtros
  const applyFilters = (filterData) => {
    setFilters(filterData)
  }

  // Transações filtradas com base nos filtros aplicados
  const filteredTransactions = transactions.filter((transaction) => {
    // Filtro por termo de busca
    if (filters.searchTerm && !transaction.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false
    }

    // Filtro por categoria
    if (filters.category !== "Todas as Categorias" && transaction.category !== filters.category) {
      return false
    }

    // Filtro por data inicial
    if (filters.startDate) {
      const transactionDate = new Date(transaction.date)
      const startDate = new Date(filters.startDate)
      if (transactionDate < startDate) {
        return false
      }
    }

    // Filtro por data final
    if (filters.endDate) {
      const transactionDate = new Date(transaction.date)
      const endDate = new Date(filters.endDate)
      endDate.setHours(23, 59, 59, 999) // Definir para o final do dia
      if (transactionDate > endDate) {
        return false
      }
    }

    return true
  })

  return (
    <>
      <DashboardHeader heading="Transações" text="Visualize e gerencie suas transações financeiras.">
        <AddTransactionDialog onAddTransaction={addTransaction}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
        </AddTransactionDialog>
      </DashboardHeader>

      <Card className="mb-6">
        <CardContent className="pt-6">
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
                <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">{summary.incomeChange}% em relação ao mês anterior</span>
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
                <TrendingDown className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">{Math.abs(summary.expenseChange)}% em relação ao mês anterior</span>
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
                  {summary.balance > 0
                    ? "Você está economizando este mês!"
                    : "Suas despesas superaram as receitas este mês."}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="income">Receitas</TabsTrigger>
          <TabsTrigger value="expense">Despesas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="p-6">
            <TransactionsFilter onApplyFilters={applyFilters} />
            <div className="mt-6">
              <TabsContent value="all" className="m-0">
                <TransactionsTable
                  transactions={filteredTransactions}
                  onUpdateTransaction={updateTransaction}
                  onDeleteTransaction={deleteTransaction}
                />
              </TabsContent>
              <TabsContent value="income" className="m-0">
                <TransactionsTable
                  transactions={filteredTransactions}
                  onUpdateTransaction={updateTransaction}
                  onDeleteTransaction={deleteTransaction}
                  filterType="income"
                />
              </TabsContent>
              <TabsContent value="expense" className="m-0">
                <TransactionsTable
                  transactions={filteredTransactions}
                  onUpdateTransaction={updateTransaction}
                  onDeleteTransaction={deleteTransaction}
                  filterType="expense"
                />
              </TabsContent>
              <TabsContent value="pending" className="m-0">
                <TransactionsTable
                  transactions={filteredTransactions}
                  onUpdateTransaction={updateTransaction}
                  onDeleteTransaction={deleteTransaction}
                  filterType="pending"
                />
              </TabsContent>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </>
  )
}
