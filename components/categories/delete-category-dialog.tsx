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
import { useFinance, type Category } from "@/lib/finance-context"

export function DeleteCategoryDialog({
  children,
  category,
  onDelete,
}: {
  children: React.ReactNode
  category: Category
  onDelete?: () => void
}) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { deleteCategory } = useFinance()

  const handleDelete = () => {
    // Exclui a categoria usando o contexto
    if (onDelete) {
      onDelete()
    }
    deleteCategory(category.id)

    toast({
      title: "Categoria excluída",
      description: `A categoria "${category.name}" foi excluída com sucesso.`,
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
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a categoria "{category.name}" e todas as suas
            associações.
            {category.transactionCount > 0 && (
              <span className="block mt-2 font-medium text-destructive">
                Atenção: Esta categoria possui {category.transactionCount} transações associadas.
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
