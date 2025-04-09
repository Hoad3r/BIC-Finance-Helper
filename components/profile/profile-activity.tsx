"use client"

import { Clock, CreditCard, LogIn, Settings, User } from "lucide-react"

export function ProfileActivity() {
  // Em uma aplicação real, esses dados viriam de uma API ou banco de dados
  const activities = [
    {
      id: "1",
      type: "login",
      description: "Login realizado com sucesso",
      date: "2025-04-08T10:30:00",
      icon: LogIn,
    },
    {
      id: "2",
      type: "transaction",
      description: "Nova transação adicionada: Supermercado",
      date: "2025-04-07T15:45:00",
      icon: CreditCard,
    },
    {
      id: "3",
      type: "profile",
      description: "Informações de perfil atualizadas",
      date: "2025-04-05T09:15:00",
      icon: User,
    },
    {
      id: "4",
      type: "settings",
      description: "Configurações de notificação alteradas",
      date: "2025-04-03T14:20:00",
      icon: Settings,
    },
    {
      id: "5",
      type: "transaction",
      description: "Nova transação adicionada: Aluguel",
      date: "2025-04-01T11:10:00",
      icon: CreditCard,
    },
  ]

  return (
    <div className="space-y-6">
      {activities.map((activity) => {
        const Icon = activity.icon
        const date = new Date(activity.date)

        return (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="rounded-full bg-muted p-2">
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{activity.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {date.toLocaleDateString("pt-BR")} às{" "}
                {date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
