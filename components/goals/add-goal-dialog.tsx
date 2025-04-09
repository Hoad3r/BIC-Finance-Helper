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

export function AddGoalDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em uma aplicação real, isso salvaria a meta no banco de dados
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Meta</DialogTitle>
            <DialogDescription>Crie uma nova meta financeira. Clique em salvar quando terminar.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Meta</Label>
              <Input id="name" placeholder="Ex: Fundo de Emergência" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target">Valor Alvo</Label>
              <Input id="target" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="current">Valor Inicial</Label>
              <Input id="current" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">Data Limite</Label>
              <Input id="deadline" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Ícone</Label>
              <Input id="icon" placeholder="Ex: 🛡️" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Cor</Label>
              <div className="flex items-center gap-2">
                <Input id="color" type="color" defaultValue="#3b82f6" className="w-12 h-8 p-1" />
                <Input defaultValue="#3b82f6" className="flex-1" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthlyContribution">Contribuição Mensal</Label>
              <Input id="monthlyContribution" type="number" placeholder="0.00" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Meta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
