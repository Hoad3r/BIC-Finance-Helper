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

export function EditGoalDialog({
  children,
  goal,
}: {
  children: React.ReactNode
  goal: Goal
}) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em uma aplicação real, isso atualizaria a meta no banco de dados
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Meta</DialogTitle>
            <DialogDescription>
              Faça alterações nesta meta financeira. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Meta</Label>
              <Input id="name" defaultValue={goal.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target">Valor Alvo</Label>
              <Input id="target" type="number" defaultValue={goal.target} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="current">Valor Atual</Label>
              <Input id="current" type="number" defaultValue={goal.current} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">Data Limite</Label>
              <Input id="deadline" type="date" defaultValue={goal.deadline} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Ícone</Label>
              <Input id="icon" defaultValue={goal.icon} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Cor</Label>
              <div className="flex items-center gap-2">
                <Input id="color" type="color" defaultValue={goal.color} className="w-12 h-8 p-1" />
                <Input defaultValue={goal.color} className="flex-1" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthlyContribution">Contribuição Mensal</Label>
              <Input id="monthlyContribution" type="number" defaultValue={goal.monthlyContribution} />
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
