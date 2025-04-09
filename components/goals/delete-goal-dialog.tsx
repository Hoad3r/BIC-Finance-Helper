"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Goal {
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

export function DeleteGoalDialog({
  children,
  goal,
}: {
  children: React.ReactNode
  goal: Goal
}) {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    // Em uma aplicação real, isso excluiria a meta do banco de dados
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a meta "{goal.name}" e todo o seu progresso.
            {goal.current > 0 && (
              <span className="block mt-2 font-medium text-destructive">
                Atenção: Esta meta possui R$ {goal.current.toFixed(2)} já acumulados.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
