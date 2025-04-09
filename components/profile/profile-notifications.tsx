"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ProfileNotifications() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Notificações por E-mail</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-transactions">Transações</Label>
            <p className="text-sm text-muted-foreground">Receba notificações sobre novas transações.</p>
          </div>
          <Switch id="email-transactions" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-goals">Metas</Label>
            <p className="text-sm text-muted-foreground">Receba atualizações sobre o progresso das suas metas.</p>
          </div>
          <Switch id="email-goals" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-reports">Relatórios Semanais</Label>
            <p className="text-sm text-muted-foreground">Receba um resumo semanal das suas finanças.</p>
          </div>
          <Switch id="email-reports" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-tips">Dicas Financeiras</Label>
            <p className="text-sm text-muted-foreground">Receba dicas e sugestões para melhorar suas finanças.</p>
          </div>
          <Switch id="email-tips" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Notificações no Aplicativo</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="app-transactions">Transações</Label>
            <p className="text-sm text-muted-foreground">Receba notificações sobre novas transações.</p>
          </div>
          <Switch id="app-transactions" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="app-goals">Metas</Label>
            <p className="text-sm text-muted-foreground">Receba atualizações sobre o progresso das suas metas.</p>
          </div>
          <Switch id="app-goals" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="app-budget">Alertas de Orçamento</Label>
            <p className="text-sm text-muted-foreground">
              Receba alertas quando estiver próximo de atingir limites de orçamento.
            </p>
          </div>
          <Switch id="app-budget" defaultChecked />
        </div>
      </div>

      <Button>Salvar Preferências</Button>
    </div>
  )
}
