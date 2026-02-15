"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send, Settings, Clock, CheckCircle, AlertTriangle, Zap } from "lucide-react"
import { alunos } from "@/lib/mock-data"

const cobrancasAutomaticas = [
  {
    aluno: "Julia Ferreira",
    valor: "R$ 250,00",
    status: "Enviada",
    dataEnvio: "10/02/2026",
    metodo: "WhatsApp + Email",
    tentativas: 3,
  },
  {
    aluno: "Beatriz Almeida",
    valor: "R$ 250,00",
    status: "Enviada",
    dataEnvio: "10/01/2026",
    metodo: "WhatsApp + Email",
    tentativas: 5,
  },
  {
    aluno: "Carlos Oliveira",
    valor: "R$ 250,00",
    status: "Agendada",
    dataEnvio: "15/02/2026",
    metodo: "WhatsApp",
    tentativas: 0,
  },
  {
    aluno: "Lucas Mendes",
    valor: "R$ 650,00",
    status: "Agendada",
    dataEnvio: "20/02/2026",
    metodo: "Email",
    tentativas: 0,
  },
]

function CobrancaStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Enviada":
      return <Badge className="bg-primary/20 text-primary hover:bg-primary/20">Enviada</Badge>
    case "Agendada":
      return <Badge className="bg-warning/20 text-warning hover:bg-warning/20">Agendada</Badge>
    case "Paga":
      return <Badge className="bg-success/20 text-success hover:bg-success/20">Paga</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function CobrancasPage() {
  const inadimplentes = alunos.filter((a) => a.status === "Inadimplente")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cobrancas automaticas</h1>
          <p className="text-sm text-muted-foreground">Gestao de cobrancas automatizadas</p>
        </div>
        <Button className="gap-2" onClick={() => toast.success("Cobranca manual enviada!")}>
          <Send className="h-4 w-4" />
          Enviar cobranca manual
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cobrancas ativas</p>
                <p className="text-xl font-bold text-foreground">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2.5">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recuperadas este mes</p>
                <p className="text-xl font-bold text-foreground">R$ 1.450</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2.5">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inadimplentes</p>
                <p className="text-xl font-bold text-foreground">{inadimplentes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Settings className="h-4 w-4 text-primary" />
            Configuracoes de cobranca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-cobranca" className="text-sm">Cobranca automatica</Label>
                <Switch id="auto-cobranca" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="whatsapp" className="text-sm">Envio por WhatsApp</Label>
                <Switch id="whatsapp" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-cob" className="text-sm">Envio por Email</Label>
                <Switch id="email-cob" defaultChecked />
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Dias antes do vencimento</Label>
                <Select defaultValue="3">
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 dia</SelectItem>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Tentativas apos vencimento</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 tentativas</SelectItem>
                    <SelectItem value="5">5 tentativas</SelectItem>
                    <SelectItem value="10">10 tentativas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Intervalo entre tentativas</Label>
                <Select defaultValue="3">
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">A cada 1 dia</SelectItem>
                    <SelectItem value="3">A cada 3 dias</SelectItem>
                    <SelectItem value="7">A cada 7 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full mt-3" onClick={() => toast.success("Configuracoes salvas!")}>
                Salvar configuracoes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Historico de cobrancas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cobrancasAutomaticas.map((cob, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 rounded-lg bg-secondary p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{cob.aluno}</p>
                    <CobrancaStatusBadge status={cob.status} />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{cob.valor}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cob.dataEnvio}
                    </span>
                    <span>{cob.metodo}</span>
                    <span>{cob.tentativas} tentativa{cob.tentativas !== 1 ? "s" : ""}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => toast.success(`Cobranca reenviada para ${cob.aluno}`)}>
                    <Send className="h-3 w-3" />
                    Reenviar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
