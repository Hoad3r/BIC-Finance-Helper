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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FileSpreadsheet, FileText, Download, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/components/ui/use-toast"

export function ExportReportDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [exportFormat, setExportFormat] = useState("pdf")
  const [reportType, setReportType] = useState("summary")
  const [isLoading, setIsLoading] = useState(false)
  const [includeData, setIncludeData] = useState({
    transactions: true,
    categories: true,
    goals: true,
    charts: true,
  })

  const { toast } = useToast()

  const handleExport = async () => {
    // Simulação de exportação
    setIsLoading(true)

    // Validação básica
    if (!startDate || !endDate) {
      toast({
        title: "Erro ao exportar",
        description: "Por favor, selecione o período para exportação.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (startDate > endDate) {
      toast({
        title: "Erro ao exportar",
        description: "A data inicial não pode ser posterior à data final.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simular processamento
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Relatório exportado com sucesso",
        description: `Seu relatório foi exportado no formato ${exportFormat.toUpperCase()}.`,
      })

      setOpen(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Exportar Relatório</DialogTitle>
          <DialogDescription>Configure as opções de exportação do seu relatório financeiro.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Data Inicial</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="start-date" variant="outline" className="w-full justify-start text-left font-normal">
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
              <Label htmlFor="end-date">Data Final</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="end-date" variant="outline" className="w-full justify-start text-left font-normal">
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
            <Label>Tipo de Relatório</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Resumo Financeiro</SelectItem>
                <SelectItem value="detailed">Relatório Detalhado</SelectItem>
                <SelectItem value="categories">Análise por Categorias</SelectItem>
                <SelectItem value="goals">Progresso de Metas</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Formato de Exportação</Label>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center">
                  <FileText className="mr-1.5 h-4 w-4" />
                  PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center">
                  <FileSpreadsheet className="mr-1.5 h-4 w-4" />
                  Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center">
                  <FileSpreadsheet className="mr-1.5 h-4 w-4" />
                  CSV
                </Label>
              </div>
            </RadioGroup>
          </div>

          {reportType === "custom" && (
            <div className="space-y-2">
              <Label>Incluir no Relatório</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transactions"
                    checked={includeData.transactions}
                    onCheckedChange={(checked) => setIncludeData({ ...includeData, transactions: !!checked })}
                  />
                  <Label htmlFor="transactions">Transações</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="categories"
                    checked={includeData.categories}
                    onCheckedChange={(checked) => setIncludeData({ ...includeData, categories: !!checked })}
                  />
                  <Label htmlFor="categories">Categorias</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="goals"
                    checked={includeData.goals}
                    onCheckedChange={(checked) => setIncludeData({ ...includeData, goals: !!checked })}
                  />
                  <Label htmlFor="goals">Metas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="charts"
                    checked={includeData.charts}
                    onCheckedChange={(checked) => setIncludeData({ ...includeData, charts: !!checked })}
                  />
                  <Label htmlFor="charts">Gráficos</Label>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="filename">Nome do Arquivo</Label>
            <Input
              id="filename"
              placeholder="relatorio-financeiro"
              defaultValue={`relatorio-financeiro-${format(new Date(), "yyyy-MM-dd")}`}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleExport} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
