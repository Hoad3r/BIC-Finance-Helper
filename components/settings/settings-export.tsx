"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, FileSpreadsheet, FileText } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SettingsExport() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Data Inicial</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus locale={ptBR} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Data Final</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus locale={ptBR} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tipo de Dados</Label>
        <Select defaultValue="transactions">
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de dados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transactions">Transações</SelectItem>
            <SelectItem value="categories">Categorias</SelectItem>
            <SelectItem value="goals">Metas</SelectItem>
            <SelectItem value="reports">Relatórios</SelectItem>
            <SelectItem value="all">Todos os Dados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Exportar como CSV</CardTitle>
            <CardDescription>Formato para planilhas</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Exportar como PDF</CardTitle>
            <CardDescription>Formato para impressão</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <Download className="h-8 w-8 text-muted-foreground" />
          <div>
            <h3 className="font-medium">Baixar Todos os Seus Dados</h3>
            <p className="text-sm text-muted-foreground">
              Exporte todos os seus dados financeiros em um único arquivo.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button>Baixar Todos os Dados</Button>
        </div>
      </div>
    </div>
  )
}
