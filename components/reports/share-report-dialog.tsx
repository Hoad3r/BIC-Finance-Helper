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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Copy,
  Mail,
  Share2,
  Check,
  Loader2,
  Facebook,
  Twitter,
  Linkedin,
  PhoneIcon as WhatsApp,
  CalendarIcon,
  Clock,
  Eye,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"

export function ShareReportDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shareOption, setShareOption] = useState("view")
  const [emailRecipients, setEmailRecipients] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [scheduleShare, setScheduleShare] = useState(false)
  const [scheduleDate, setScheduleDate] = useState<Date>()
  const [scheduleTime, setScheduleTime] = useState("09:00")
  const [recurring, setRecurring] = useState(false)
  const [recurringFrequency, setRecurringFrequency] = useState("monthly")
  const [includeData, setIncludeData] = useState({
    summary: true,
    transactions: true,
    categories: true,
    charts: true,
  })

  const { toast } = useToast()

  // URL de compartilhamento simulada
  const shareUrl = "https://bic-app.com/shared/report/abc123"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareEmail = () => {
    if (!emailRecipients) {
      toast({
        title: "Erro ao compartilhar",
        description: "Por favor, informe pelo menos um destinatário.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulação de envio de e-mail
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Relatório compartilhado",
        description: scheduleShare
          ? "O relatório foi agendado para compartilhamento."
          : "O relatório foi enviado por e-mail com sucesso.",
      })
      setOpen(false)
    }, 1500)
  }

  const handleShareSocial = (platform: string) => {
    toast({
      title: "Compartilhando relatório",
      description: `Abrindo ${platform} para compartilhar seu relatório.`,
    })
    // Em uma aplicação real, abriria a janela de compartilhamento da plataforma
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compartilhar Relatório</DialogTitle>
          <DialogDescription>Compartilhe seu relatório financeiro com outras pessoas.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="email">E-mail</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
            <TabsTrigger value="preview">Visualizar</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Permissões de Acesso</Label>
              <RadioGroup value={shareOption} onValueChange={setShareOption} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="view" id="view" />
                  <Label htmlFor="view">Somente visualização</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="edit" id="edit" />
                  <Label htmlFor="edit">Permitir edição</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="password" id="password" />
                  <Label htmlFor="password">Protegido por senha</Label>
                </div>
              </RadioGroup>
            </div>

            {shareOption === "password" && (
              <div className="space-y-2">
                <Label htmlFor="password-input">Senha de Acesso</Label>
                <Input id="password-input" type="password" placeholder="Digite uma senha" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="share-link">Link de Compartilhamento</Label>
              <div className="flex space-x-2">
                <Input id="share-link" value={shareUrl} readOnly />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Conteúdo do Relatório</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="summary-link"
                    checked={includeData.summary}
                    onCheckedChange={(checked) => setIncludeData({ ...includeData, summary: !!checked })}
                  />
                  <Label htmlFor="summary-link">Resumo Financeiro</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transactions-link"
                    checked={includeData.transactions}
                    onCheckedChange={(checked) => setIncludeData({ ...includeData, transactions: !!checked })}
                  />
                  <Label htmlFor="transactions-link">Transações</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="categories-link"
                    checked={includeData.categories}
                    onCheckedChange={(checked) => setIncludeData({ ...includeData, categories: !!checked })}
                  />
                  <Label htmlFor="categories-link">Categorias</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="charts-link"
                    checked={includeData.charts}
                    onCheckedChange={(checked) => setIncludeData({ ...includeData, charts: !!checked })}
                  />
                  <Label htmlFor="charts-link">Gráficos</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="link-expiry">Expiração do Link</Label>
                <Switch id="link-expiry" />
              </div>
              <Select disabled defaultValue="7days">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1day">1 dia</SelectItem>
                  <SelectItem value="7days">7 dias</SelectItem>
                  <SelectItem value="30days">30 dias</SelectItem>
                  <SelectItem value="never">Nunca expira</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Destinatários</Label>
              <Input
                id="recipients"
                placeholder="email@exemplo.com, outro@exemplo.com"
                value={emailRecipients}
                onChange={(e) => setEmailRecipients(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separe múltiplos e-mails com vírgulas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input id="subject" defaultValue="Compartilhando meu relatório financeiro" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Escreva uma mensagem personalizada..."
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="schedule-share">Agendar Envio</Label>
                <Switch id="schedule-share" checked={scheduleShare} onCheckedChange={setScheduleShare} />
              </div>
              {scheduleShare && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? (
                            format(scheduleDate, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          initialFocus
                          locale={ptBR}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-time">Horário</Label>
                    <Input
                      id="schedule-time"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="recurring-share">Compartilhamento Recorrente</Label>
                <Switch id="recurring-share" checked={recurring} onCheckedChange={setRecurring} />
              </div>
              {recurring && (
                <div className="mt-2">
                  <Select value={recurringFrequency} onValueChange={setRecurringFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                      <SelectItem value="monthly">Mensalmente</SelectItem>
                      <SelectItem value="quarterly">Trimestralmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Button className="w-full" onClick={handleShareEmail} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {scheduleShare ? "Agendando..." : "Enviando..."}
                </>
              ) : (
                <>
                  {scheduleShare ? (
                    <>
                      <Clock className="mr-2 h-4 w-4" />
                      Agendar Envio
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar por E-mail
                    </>
                  )}
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="social" className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-16"
                onClick={() => handleShareSocial("WhatsApp")}
              >
                <WhatsApp className="h-6 w-6 text-green-500" />
                <span>WhatsApp</span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-16"
                onClick={() => handleShareSocial("Facebook")}
              >
                <Facebook className="h-6 w-6 text-blue-600" />
                <span>Facebook</span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-16"
                onClick={() => handleShareSocial("Twitter")}
              >
                <Twitter className="h-6 w-6 text-blue-400" />
                <span>Twitter</span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 h-16"
                onClick={() => handleShareSocial("LinkedIn")}
              >
                <Linkedin className="h-6 w-6 text-blue-700" />
                <span>LinkedIn</span>
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <Label>Personalizar Compartilhamento</Label>
              <Textarea
                placeholder="Confira meu relatório financeiro mensal! #FinanceTrack #FinançasPessoais"
                className="min-h-[80px]"
              />

              <div className="space-y-2">
                <Label>Incluir no Compartilhamento</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox defaultChecked id="include-link" />
                    <Label htmlFor="include-link">Link para o relatório</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-image" />
                    <Label htmlFor="include-image">Imagem do resumo</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Prévia do Relatório</h3>
              </div>

              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {includeData.summary && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-medium">Resumo Financeiro</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded-md border p-2 text-center">
                            <div className="text-xs text-muted-foreground">Receitas</div>
                            <div className="text-sm font-medium text-emerald-500">R$ 3.200,00</div>
                          </div>
                          <div className="rounded-md border p-2 text-center">
                            <div className="text-xs text-muted-foreground">Despesas</div>
                            <div className="text-sm font-medium text-rose-500">R$ 1.450,58</div>
                          </div>
                          <div className="rounded-md border p-2 text-center">
                            <div className="text-xs text-muted-foreground">Saldo</div>
                            <div className="text-sm font-medium text-blue-500">R$ 1.749,42</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {includeData.charts && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-medium">Gráficos</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-md border p-2 flex items-center justify-center">
                            <PieChart className="h-16 w-16 text-muted-foreground opacity-50" />
                          </div>
                          <div className="rounded-md border p-2 flex items-center justify-center">
                            <LineChart className="h-16 w-16 text-muted-foreground opacity-50" />
                          </div>
                        </div>
                      </div>
                    )}

                    {includeData.transactions && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-medium">Transações</h4>
                        </div>
                        <div className="rounded-md border p-2">
                          <div className="text-xs text-muted-foreground">Últimas transações incluídas...</div>
                        </div>
                      </div>
                    )}

                    {includeData.categories && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-sm font-medium">Categorias</h4>
                        </div>
                        <div className="rounded-md border p-2">
                          <div className="text-xs text-muted-foreground">Análise de categorias incluída...</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="text-xs text-muted-foreground text-center">
                Esta é uma prévia simplificada. O relatório completo terá mais detalhes e formatação.
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button>
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
