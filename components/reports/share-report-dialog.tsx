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
import { Copy, Mail, Share2, Check, Loader2, Facebook, Twitter, Linkedin, PhoneIcon as WhatsApp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ShareReportDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shareOption, setShareOption] = useState("view")
  const [emailRecipients, setEmailRecipients] = useState("")
  const [emailMessage, setEmailMessage] = useState("")

  const { toast } = useToast()

  // URL de compartilhamento simulada
  const shareUrl = "https://financetrack.app/shared/report/abc123"

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
        description: "O relatório foi enviado por e-mail com sucesso.",
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Compartilhar Relatório</DialogTitle>
          <DialogDescription>Compartilhe seu relatório financeiro com outras pessoas.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="email">E-mail</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
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

            <Button className="w-full" onClick={handleShareEmail} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar por E-mail
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

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Compartilhe seu relatório financeiro nas redes sociais</p>
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
