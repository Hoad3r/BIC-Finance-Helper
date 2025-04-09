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
import { useFinance, type Category } from "@/lib/finance-context"

export function EditCategoryDialog({
  children,
  category,
  onCategoryUpdated,
}: {
  children: React.ReactNode
  category: Category
  onCategoryUpdated?: (updatedCategory: Category) => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(category.name)
  const [type, setType] = useState(category.type)
  const [icon, setIcon] = useState(category.icon)
  const [color, setColor] = useState(category.color)
  const [budget, setBudget] = useState(category.budget)

  const { updateCategory } = useFinance()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create the updated category
    const updatedCategory = {
      ...category,
      name,
      type,
      icon,
      color,
      budget: type === "expense" ? budget : 0,
    }

    // Update the category using the context
    updateCategory(updatedCategory)

    // Also call the prop callback if provided
    if (onCategoryUpdated) {
      onCategoryUpdated(updatedCategory)
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>Faça alterações nesta categoria. Clique em salvar quando terminar.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Categoria</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
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
              <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} required />
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
                <Input id="budget" type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
