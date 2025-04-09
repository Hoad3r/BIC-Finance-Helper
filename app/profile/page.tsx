import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { ProfileNotifications } from "@/components/profile/profile-notifications"
import { PageTransition } from "@/components/page-transition"

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <DashboardShell>
        <DashboardHeader heading="Perfil" text="Gerencie suas informações pessoais e preferências." />

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg" alt="Foto de perfil" />
                    <AvatarFallback className="text-4xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Alterar foto</Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" type="tel" defaultValue="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Moeda Padrão</Label>
                      <Input id="currency" defaultValue="BRL" />
                    </div>
                  </div>
                  <Button>Salvar Alterações</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="security" className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="security">Segurança</TabsTrigger>
              <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>

            <Card>
              <TabsContent value="security" className="m-0">
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Atualize sua senha e configurações de segurança.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Atualizar Senha</Button>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="activity" className="m-0">
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>Veja suas atividades recentes na plataforma.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ProfileActivity />
                </CardContent>
              </TabsContent>

              <TabsContent value="notifications" className="m-0">
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Gerencie suas preferências de notificação.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ProfileNotifications />
                </CardContent>
              </TabsContent>
            </Card>
          </Tabs>
        </div>
      </DashboardShell>
    </PageTransition>
  )
}
