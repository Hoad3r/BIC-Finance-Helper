"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

// Define types for our data
export interface Goal {
  id: string
  name: string
  target: number
  current: number
  deadline: string
  status: string
  icon: string
  color: string
  monthlyContribution: number
}

interface GoalsContextType {
  goals: Goal[]
  addGoal: (goal: Goal) => void
  updateGoal: (goal: Goal) => void
  deleteGoal: (id: string) => void
}

// Create the context
const GoalsContext = createContext<GoalsContextType | undefined>(undefined)

// Initial data
const initialGoals: Goal[] = [
  {
    id: "1",
    name: "Fundo de Emergência",
    target: 10000,
    current: 6500,
    deadline: "2025-12-31",
    status: "active",
    icon: "🛡️",
    color: "#3b82f6",
    monthlyContribution: 500,
  },
  {
    id: "2",
    name: "Viagem de Férias",
    target: 5000,
    current: 2800,
    deadline: "2025-07-15",
    status: "active",
    icon: "✈️",
    color: "#8b5cf6",
    monthlyContribution: 300,
  },
  {
    id: "3",
    name: "Novo Notebook",
    target: 4500,
    current: 4500,
    deadline: "2025-05-30",
    status: "completed",
    icon: "💻",
    color: "#10b981",
    monthlyContribution: 0,
  },
  {
    id: "4",
    name: "Entrada Apartamento",
    target: 50000,
    current: 15000,
    deadline: "2026-12-31",
    status: "active",
    icon: "🏢",
    color: "#f97316",
    monthlyContribution: 1000,
  },
  {
    id: "5",
    name: "Novo Celular",
    target: 3000,
    current: 3000,
    deadline: "2025-01-15",
    status: "completed",
    icon: "📱",
    color: "#ef4444",
    monthlyContribution: 0,
  },
]

// Provider component
export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const { toast } = useToast()

  // Add a new goal
  const addGoal = (goal: Goal) => {
    setGoals((prev) => [...prev, goal])
    toast({
      title: "Meta adicionada",
      description: "A meta foi adicionada com sucesso.",
    })
  }

  // Update an existing goal
  const updateGoal = (goal: Goal) => {
    setGoals((prev) => prev.map((g) => (g.id === goal.id ? goal : g)))
    toast({
      title: "Meta atualizada",
      description: "A meta foi atualizada com sucesso.",
    })
  }

  // Delete a goal
  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
    toast({
      title: "Meta excluída",
      description: "A meta foi excluída com sucesso.",
      variant: "destructive",
    })
  }

  return (
    <GoalsContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
      }}
    >
      {children}
    </GoalsContext.Provider>
  )
}

// Custom hook to use the goals context
export function useGoals() {
  const context = useContext(GoalsContext)
  if (context === undefined) {
    throw new Error("useGoals must be used within a GoalsProvider")
  }
  return context
}
