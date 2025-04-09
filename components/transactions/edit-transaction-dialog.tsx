"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
}

export function EditTransactionDialog({
  children,
  transaction,
  onTransactionUpdated,
}: {
  children: React.ReactNode
  transaction: Transaction
  onTransactionUpdated?: (updatedTransaction: Transaction) => void
}) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(transaction.amount > 0 ? "income" : "expense")
  const [description, setDescription] = useState(transaction.description)
  const [amount, setAmount] = useState(Math.abs(transaction.amount))
  const [category, setCategory] = useState(transaction.category)
  const [date, setDate] = useState(transaction.date)

  const { toast } = useToast()

  // Em uma aplicação real, estas categorias viriam de uma API ou banco de dados
  const categories = ["Alimentação", "Moradia", "Transporte", "Lazer", "Serviços", "Receita"]
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Criar a transação atualizada
    const updatedTransaction = {
      ...transaction,
      description,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      category,
      date,
    }

    // Em uma aplicação real, isso atualizaria a transação no banco de dados
    if (onTransactionUpdated) {
      onTransactionUpdated(updatedTransaction)
    }

    toast({
      title: "Transação atualizada",
      description: "A transação foi atualizada com sucesso.",
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
            <DialogDescription>Faça alterações nesta transação. Clique em salvar quando terminar.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Transação</Label>
              <RadioGroup id="type" value={type} onValueChange={setType} className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense">Despesa</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income">Receita</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Valor</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Data</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
