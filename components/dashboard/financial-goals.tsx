"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function FinancialGoals() {
  // In a real app, this data would come from an API or database
  const goals = [
    {
      id: "1",
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2025-12-31",
    },
    {
      id: "2",
      name: "Vacation Savings",
      target: 3000,
      current: 1200,
      deadline: "2025-07-15",
    },
    {
      id: "3",
      name: "New Laptop",
      target: 1500,
      current: 900,
      deadline: "2025-05-30",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
        <CardDescription>Track your progress towards your financial goals.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {goals.map((goal) => {
            const progress = Math.round((goal.current / goal.target) * 100)

            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{goal.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div>{progress}% complete</div>
                  <div>Due {new Date(goal.deadline).toLocaleDateString()}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
