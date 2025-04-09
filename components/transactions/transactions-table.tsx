"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Edit, Eye, Trash } from "lucide-react"
import { EditTransactionDialog } from "./edit-transaction-dialog"
import { DeleteTransactionDialog } from "./delete-transaction-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
  status: string
  icon: string
}

interface TransactionsTableProps {
  filterType?: "all" | "income" | "expense" | "pending"
  transactions: Transaction[]
  onUpdateTransaction?: (transaction: Transaction) => void
  onDeleteTransaction?: (id: string) => void
}

export function TransactionsTable({
  filterType = "all",
  transactions,
  onUpdateTransaction,
  onDeleteTransaction,
}: TransactionsTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const { toast } = useToast()

  // Filtra as transações com base no tipo selecionado
  const filteredTransactions = transactions.filter((transaction) => {
    if (filterType === "all") return true
    if (filterType === "income") return transaction.amount > 0
    if (filterType === "expense") return transaction.amount < 0
    if (filterType === "pending") return transaction.status === "pending"
    return true
  })

  // Função para atualizar uma transação
  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    if (onUpdateTransaction) {
      onUpdateTransaction(updatedTransaction)
    }
    toast({
      title: "Transação atualizada",
      description: "A transação foi atualizada com sucesso.",
    })
  }

  // Função para excluir uma transação
  const handleDeleteTransaction = (id: string) => {
    if (onDeleteTransaction) {
      onDeleteTransaction(id)
      toast({
        title: "Transação excluída",
        description: "A transação foi excluída com sucesso.",
        variant: "destructive",
      })
    }
  }

  // Função para mostrar detalhes da transação
  const showTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDetailsOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => {
                const isIncome = transaction.amount > 0
                const isPending = transaction.status === "pending"

                return (
                  <TableRow key={transaction.id} className={isPending ? "opacity-70" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-muted">
                          <AvatarFallback>{transaction.icon}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          {isPending && <p className="text-xs text-muted-foreground">Pendente</p>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={isIncome ? "outline" : "secondary"}>
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell className={`text-right ${isIncome ? "text-emerald-500" : "text-rose-500"}`}>
                      <div className="flex items-center justify-end">
                        {isIncome ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                        R$ {Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Ver detalhes"
                          onClick={() => showTransactionDetails(transaction)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <EditTransactionDialog
                          transaction={transaction}
                          onTransactionUpdated={handleUpdateTransaction}
                        >
                          <Button variant="ghost" size="icon" title="Editar">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </EditTransactionDialog>
                        <DeleteTransactionDialog
                          transaction={transaction}
                          onDelete={() => handleDeleteTransaction(transaction.id)}
                        >
                          {/* Remova o onClick do botão para que o diálogo seja disparado corretamente */}
                          <Button variant="ghost" size="icon" title="Excluir">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DeleteTransactionDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo de detalhes da transação */}
      {selectedTransaction && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes da Transação</DialogTitle>
              <DialogDescription>Informações detalhadas sobre esta transação.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 bg-muted">
                  <AvatarFallback>{selectedTransaction.icon}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedTransaction.description}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedTransaction.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categoria</p>
                  <p>{selectedTransaction.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="capitalize">
                    {selectedTransaction.status === "completed" ? "Concluído" : "Pendente"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                  <p>{selectedTransaction.amount > 0 ? "Receita" : "Despesa"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor</p>
                  <p className={selectedTransaction.amount > 0 ? "text-emerald-500" : "text-rose-500"}>
                    R$ {Math.abs(selectedTransaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
