import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsExport } from "@/components/settings/settings-export"
import { SettingsAppearance } from "@/components/settings/settings-appearance"
import { SettingsIntegrations } from "@/components/settings/settings-integrations"
import { PageTransition } from "@/components/page-transition"

export default async function SettingsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <DashboardShell>
        <DashboardHeader heading="Configurações" text="Gerencie as configurações da sua conta e preferências." />

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="export">Exportação</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
          </TabsList>

          <Card>
            <TabsContent value="appearance" className="m-0">
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>Personalize a aparência do aplicativo.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SettingsAppearance />
              </CardContent>
            </TabsContent>

            <TabsContent value="notifications" className="m-0">
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Configure suas preferências de notificação.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notificações</Label>
                    <p className="text-sm text-muted-foreground">Receba alertas sobre suas finanças.</p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                    <p className="text-sm text-muted-foreground">Receba relatórios semanais por e-mail.</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="budget-alerts">Alertas de Orçamento</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas quando estiver próximo de atingir limites de orçamento.
                    </p>
                  </div>
                  <Switch id="budget-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="goal-notifications">Notificações de Metas</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre o progresso das suas metas.
                    </p>
                  </div>
                  <Switch id="goal-notifications" defaultChecked />
                </div>

                <Button>Salvar Preferências</Button>
              </CardContent>
            </TabsContent>

            <TabsContent value="export" className="m-0">
              <CardHeader>
                <CardTitle>Exportação de Dados</CardTitle>
                <CardDescription>Exporte seus dados financeiros.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SettingsExport />
              </CardContent>
            </TabsContent>

            <TabsContent value="integrations" className="m-0">
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>Conecte-se com outros serviços e aplicativos.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SettingsIntegrations />
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
      </DashboardShell>
    </PageTransition>
  )
}
