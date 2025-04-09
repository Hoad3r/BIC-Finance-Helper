"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function SettingsIntegrations() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Google Drive</CardTitle>
            <Switch id="google-drive" />
          </div>
          <CardDescription>Sincronize seus relatórios com o Google Drive</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Faça backup automático dos seus relatórios financeiros no Google Drive.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Configurar
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Microsoft Excel</CardTitle>
            <Switch id="excel" />
          </div>
          <CardDescription>Exporte dados diretamente para o Excel</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Exporte seus dados financeiros diretamente para planilhas do Excel.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Configurar
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Bancos</CardTitle>
            <Switch id="banks" />
          </div>
          <CardDescription>Conecte-se com suas contas bancárias</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Importe transações automaticamente das suas contas bancárias.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Conectar Bancos
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Calendário</CardTitle>
            <Switch id="calendar" />
          </div>
          <CardDescription>Sincronize com seu calendário</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Adicione lembretes de pagamentos e metas ao seu calendário.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Configurar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
