"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function SettingsAppearance() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Tema</Label>
        <RadioGroup defaultValue="system" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Claro</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Escuro</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system">Sistema</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Esquema de Cores</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="h-12 w-full border-2 border-primary">
            <span className="sr-only">Azul</span>
            <span className="flex h-6 w-full items-center justify-center rounded-sm bg-blue-500" />
          </Button>
          <Button variant="outline" className="h-12 w-full">
            <span className="sr-only">Verde</span>
            <span className="flex h-6 w-full items-center justify-center rounded-sm bg-green-500" />
          </Button>
          <Button variant="outline" className="h-12 w-full">
            <span className="sr-only">Roxo</span>
            <span className="flex h-6 w-full items-center justify-center rounded-sm bg-purple-500" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tamanho da Fonte</Label>
        <Slider defaultValue={[16]} max={24} min={12} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Moeda Padrão</Label>
        <Select defaultValue="BRL">
          <SelectTrigger>
            <SelectValue placeholder="Selecione a moeda" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
            <SelectItem value="USD">Dólar Americano ($)</SelectItem>
            <SelectItem value="EUR">Euro (€)</SelectItem>
            <SelectItem value="GBP">Libra Esterlina (£)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="animations">Animações</Label>
          <p className="text-sm text-muted-foreground">Ativar animações na interface.</p>
        </div>
        <Switch id="animations" defaultChecked />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="compact-view">Modo Compacto</Label>
          <p className="text-sm text-muted-foreground">Reduzir o espaçamento entre elementos.</p>
        </div>
        <Switch id="compact-view" />
      </div>

      <Button>Salvar Preferências</Button>
    </div>
  )
}
