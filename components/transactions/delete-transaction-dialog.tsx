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
import { useToast } from "@/components/ui/use-toast"

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
}

export function DeleteTransactionDialog({
  children,
  transaction,
  onDelete,
}: {
  children: React.ReactNode
  transaction: Transaction
  onDelete?: () => void
}) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = () => {
    // Aqui você executa a lógica de exclusão. Em uma aplicação real,
    // isso removeria a transação do seu banco de dados ou atualizaria o estado.
    if (onDelete) {
      onDelete()
    }

    toast({
      title: "Transação excluída",
      description: "A transação foi excluída com sucesso.",
      variant: "destructive",
    })

    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a transação "{transaction.description}" da sua conta.
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
