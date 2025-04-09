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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFinance } from "@/lib/finance-context"

export function AddCategoryDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [type, setType] = useState("expense")
  const [icon, setIcon] = useState("")
  const [color, setColor] = useState("#3b82f6")
  const [budget, setBudget] = useState<number>(0)

  const { addCategory } = useFinance()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create the new category
    const newCategory = {
      id: Date.now().toString(), // Temporary ID
      name,
      type,
      icon,
      color,
      transactionCount: 0,
      budget: type === "expense" ? budget : 0,
      spent: 0,
    }

    // Add the category using the context
    addCategory(newCategory)

    // Clear the form and close the dialog
    setName("")
    setIcon("")
    setColor("#3b82f6")
    setBudget(0)
    setType("expense")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Categoria</DialogTitle>
            <DialogDescription>
              Crie uma nova categoria de transação. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Categoria</Label>
              <Input
                id="name"
                placeholder="Ex: Alimentação"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Categoria</Label>
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
              <Label htmlFor="icon">Ícone</Label>
              <Input id="icon" placeholder="Ex: 🍔" value={icon} onChange={(e) => setIcon(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Cor</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
              </div>
            </div>
            {type === "expense" && (
              <div className="grid gap-2">
                <Label htmlFor="budget">Orçamento</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="0.00"
                  value={budget || ""}
                  onChange={(e) => setBudget(Number(e.target.value))}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Categoria</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
