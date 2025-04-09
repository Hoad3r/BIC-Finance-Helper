"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

// Define types for our data
export interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
  status: string
  icon: string
}

export interface Category {
  id: string
  name: string
  type: string
  icon: string
  color: string
  transactionCount: number
  budget: number
  spent: number
}

interface FinanceContextType {
  transactions: Transaction[]
  categories: Category[]
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  getCategoryByName: (name: string) => Category | undefined
  getCategorySpending: (categoryId: string) => number
}

// Create the context
const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Initial data
const initialCategories: Category[] = [
  {
    id: "1",
    name: "Alimentação",
    type: "expense",
    icon: "🍔",
    color: "#ef4444",
    transactionCount: 12,
    budget: 800,
    spent: 650,
  },
  {
    id: "2",
    name: "Moradia",
    type: "expense",
    icon: "🏠",
    color: "#8b5cf6",
    transactionCount: 3,
    budget: 1500,
    spent: 1200,
  },
  {
    id: "3",
    name: "Transporte",
    type: "expense",
    icon: "🚗",
    color: "#3b82f6",
    transactionCount: 8,
    budget: 400,
    spent: 350,
  },
  {
    id: "4",
    name: "Lazer",
    type: "expense",
    icon: "🎮",
    color: "#f97316",
    transactionCount: 5,
    budget: 300,
    spent: 180,
  },
  {
    id: "5",
    name: "Serviços",
    type: "expense",
    icon: "📱",
    color: "#14b8a6",
    transactionCount: 4,
    budget: 500,
    spent: 450,
  },
  {
    id: "6",
    name: "Salário",
    type: "income",
    icon: "💰",
    color: "#22c55e",
    transactionCount: 2,
    budget: 0,
    spent: 0,
  },
  {
    id: "7",
    name: "Freelance",
    type: "income",
    icon: "💻",
    color: "#10b981",
    transactionCount: 3,
    budget: 0,
    spent: 0,
  },
  {
    id: "8",
    name: "Investimentos",
    type: "income",
    icon: "📈",
    color: "#6366f1",
    transactionCount: 1,
    budget: 0,
    spent: 0,
  },
]

const initialTransactions: Transaction[] = [
  {
    id: "1",
    description: "Supermercado",
    amount: -520.5,
    date: "2025-04-01",
    category: "Alimentação",
    status: "completed",
    icon: "🛒",
  },
  {
    id: "2",
    description: "Salário",
    amount: 3800.0,
    date: "2025-04-01",
    category: "Salário",
    status: "completed",
    icon: "💰",
  },
  {
    id: "3",
    description: "Aluguel",
    amount: -1200.0,
    date: "2025-03-31",
    category: "Moradia",
    status: "completed",
    icon: "🏠",
  },
  {
    id: "4",
    description: "Café",
    amount: -15.5,
    date: "2025-03-30",
    category: "Alimentação",
    status: "completed",
    icon: "☕",
  },
  {
    id: "5",
    description: "Freelance",
    amount: 1050.0,
    date: "2025-03-28",
    category: "Freelance",
    status: "completed",
    icon: "💻",
  },
  {
    id: "6",
    description: "Internet",
    amount: -120.0,
    date: "2025-03-25",
    category: "Serviços",
    status: "completed",
    icon: "📡",
  },
  {
    id: "7",
    description: "Cinema",
    amount: -45.0,
    date: "2025-03-22",
    category: "Lazer",
    status: "completed",
    icon: "🎬",
  },
  {
    id: "8",
    description: "Combustível",
    amount: -150.0,
    date: "2025-03-20",
    category: "Transporte",
    status: "pending",
    icon: "⛽",
  },
]

// Provider component
export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const { toast } = useToast()

  // Calculate category spending based on transactions
  useEffect(() => {
    const updatedCategories = categories.map((category) => {
      // Filter transactions for this category
      const categoryTransactions = transactions.filter((t) => t.category === category.name)

      // Calculate spent amount (only for expense transactions)
      const spent = Math.abs(
        categoryTransactions
          .filter((t) => t.amount < 0 && t.status === "completed")
          .reduce((total, t) => total + t.amount, 0),
      )

      // Calculate income amount (only for income transactions)
      const income = categoryTransactions.filter((t) => t.amount > 0).reduce((total, t) => total + t.amount, 0)

      // Count all transactions for this category
      const transactionCount = categoryTransactions.length

      return {
        ...category,
        spent,
        income,
        transactionCount,
      }
    })

    setCategories(updatedCategories)
  }, [transactions])

  // Get a category by name
  const getCategoryByName = (name: string) => {
    return categories.find((c) => c.name === name)
  }

  // Get total spending for a category
  const getCategorySpending = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.spent || 0
  }

  // Add a new transaction
  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction])
    toast({
      title: "Transação adicionada",
      description: "A transação foi adicionada com sucesso.",
    })
  }

  // Update an existing transaction
  const updateTransaction = (transaction: Transaction) => {
    setTransactions((prev) => prev.map((t) => (t.id === transaction.id ? transaction : t)))
    toast({
      title: "Transação atualizada",
      description: "A transação foi atualizada com sucesso.",
    })
  }

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    toast({
      title: "Transação excluída",
      description: "A transação foi excluída com sucesso.",
      variant: "destructive",
    })
  }

  // Add a new category
  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category])
    toast({
      title: "Categoria adicionada",
      description: "A categoria foi adicionada com sucesso.",
    })
  }

  // Update an existing category
  const updateCategory = (category: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === category.id ? category : c)))
    toast({
      title: "Categoria atualizada",
      description: "A categoria foi atualizada com sucesso.",
    })
  }

  // Delete a category
  const deleteCategory = (id: string) => {
    // Check if there are transactions using this category
    const category = categories.find((c) => c.id === id)
    if (category && transactions.some((t) => t.category === category.name)) {
      toast({
        title: "Não é possível excluir",
        description: "Esta categoria possui transações associadas.",
        variant: "destructive",
      })
      return
    }

    setCategories((prev) => prev.filter((c) => c.id !== id))
    toast({
      title: "Categoria excluída",
      description: "A categoria foi excluída com sucesso.",
      variant: "destructive",
    })
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        categories,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryByName,
        getCategorySpending,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

// Custom hook to use the finance context
export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}
