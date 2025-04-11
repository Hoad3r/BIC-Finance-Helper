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
import type { Category } from "@/lib/finance-context"

export function DeleteCategoryDialog({
  children,
  category,
  onDelete,
}: {
  children: React.ReactNode
  category: Category
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = () => {
    // Verifica se a categoria pode ser excluída
    if (category.transactionCount > 0) {
      toast({
        title: "Ação não permitida",
        description: `A categoria "${category.name}" possui transações associadas e não pode ser excluída.`,
        variant: "destructive",
      })
      return
    }

    // Chama a função de exclusão passada como prop
    onDelete()

    // Exibe a notificação de sucesso
    toast({
      title: "Categoria excluída",
      description: `A categoria "${category.name}" foi excluída com sucesso.`,
      variant: "destructive",
    })

    // Fecha o diálogo
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a categoria "{category.name}" e todas as suas
            associações.
            {category.transactionCount > 0 && (
              <span className="block mt-2 font-medium text-destructive">
                Atenção: Esta categoria possui {category.transactionCount} transações associadas e não pode ser excluída.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={category.transactionCount > 0}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
