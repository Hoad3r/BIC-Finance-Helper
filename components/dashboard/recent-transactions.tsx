"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp } from "lucide-react"
import { useFinance } from "@/lib/finance-context"
import { useEffect, useState } from "react"

export function RecentTransactions() {
  const { transactions, categories } = useFinance()
  const [recentTransactions, setRecentTransactions] = useState([])

  useEffect(() => {
    // Get the most recent transactions
    const sorted = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4)

    setRecentTransactions(sorted)
  }, [transactions])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
        <CardDescription>Suas atividades financeiras mais recentes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhuma transação encontrada.</p>
          ) : (
            recentTransactions.map((transaction) => {
              const category = categories.find((c) => c.name === transaction.category)
              const isIncome = transaction.amount > 0

              return (
                <div key={transaction.id} className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted mr-4">
                    {transaction.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={isIncome ? "outline" : "secondary"}
                      style={
                        category
                          ? {
                              backgroundColor: isIncome ? undefined : `${category.color}20`,
                              borderColor: isIncome ? category.color : undefined,
                            }
                          : undefined
                      }
                    >
                      {transaction.category}
                    </Badge>
                    <div className={`flex items-center ${isIncome ? "text-emerald-500" : "text-rose-500"}`}>
                      {isIncome ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                      <span className="font-medium">R$ {Math.abs(transaction.amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
