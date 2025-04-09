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

export function AddTransactionDialog({
  children,
  onAddTransaction,
}: {
  children: React.ReactNode
  onAddTransaction?: (transaction: any) => void
}) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState("expense")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState<number>(0)
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const { toast } = useToast()

  // Em uma aplicação real, estas categorias viriam de uma API ou banco de dados
  const categories = ["Alimentação", "Moradia", "Transporte", "Lazer", "Serviços", "Receita"]


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!description || !amount || !category || !date) {
      toast({
        title: "Erro ao adicionar transação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    // Criar a nova transação
    const newTransaction = {
      id: Date.now().toString(), // ID temporário
      description,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      date,
      category,
      status: "completed",
      icon: type === "expense" ? "💸" : "💰", // Ícone padrão
    }

    // Em uma aplicação real, isso salvaria a transação no banco de dados
    if (onAddTransaction) {
      onAddTransaction(newTransaction)
    }

    toast({
      title: "Transação adicionada",
      description: "A transação foi adicionada com sucesso.",
    })

    // Limpar o formulário e fechar o diálogo
    setDescription("")
    setAmount(0)
    setCategory("")
    setDate("")
    setType("expense")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>Crie uma nova transação. Clique em salvar quando terminar.</DialogDescription>
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
              <Input
                id="description"
                placeholder="Digite a descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Valor</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione a categoria" />
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
            <Button type="submit">Salvar Transação</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
