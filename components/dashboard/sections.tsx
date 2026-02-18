"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Send, FileText, DollarSign, Users, Dumbbell, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

type Inadimplente = { id: string; nome: string; plano: string }
type ProximoVencimento = { aluno: string; valor: string; vencimento: string }
type AlunoEvolucao = { id: string; nome: string; evolucao: number }
type Atividade = { tipo: string; descricao: string; tempo: string }

type DashboardData = {
  inadimplentes: Inadimplente[]
  proximosVencimentos: ProximoVencimento[]
  alunosEvolucao: AlunoEvolucao[]
  atividades: Atividade[]
}

const activityIcons: Record<string, React.ElementType> = {
  contrato: FileText,
  pagamento: DollarSign,
  aluno: Users,
  treino: Dumbbell,
  cobranca: Send,
}

export function AlertasUrgentes() {
  const [data, setData] = useState<Inadimplente[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setData(d.inadimplentes ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Alertas urgentes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <AlertCircle className="h-4 w-4 text-destructive" />
          Alertas urgentes
        </CardTitle>
        <Badge variant="destructive" className="text-xs">
          {data.length} inadimplentes
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum aluno inadimplente.</p>
          ) : (
            data.map((aluno) => (
              <div
                key={aluno.id}
                className="flex items-center justify-between rounded-lg bg-secondary p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{aluno.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    Plano {aluno.plano} - Pagamento atrasado
                  </p>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => toast.success(`Cobranca enviada para ${aluno.nome}`)}>
                  <Send className="h-3 w-3" />
                  Enviar cobranca
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProximosVencimentos() {
  const [data, setData] = useState<ProximoVencimento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setData(d.proximosVencimentos ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Próximos vencimentos</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Proximos vencimentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum vencimento próximo.</p>
          ) : (
            data.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-secondary p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.aluno}</p>
                  <p className="text-xs text-muted-foreground">Vencimento: {item.vencimento}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{item.valor}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function EvolucaoAlunos() {
  const [data, setData] = useState<AlunoEvolucao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setData(d.alunosEvolucao ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Evolução dos alunos</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Evolucao dos alunos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum aluno ativo com evolução.</p>
          ) : (
            data.map((aluno) => (
              <div key={aluno.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{aluno.nome}</p>
                  <span className="text-xs font-medium text-muted-foreground">
                    {aluno.evolucao}%
                  </span>
                </div>
                <Progress value={aluno.evolucao} className="h-1.5" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function AtividadesRecentes() {
  const [data, setData] = useState<Atividade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.ok ? res.json() : null)
      .then((d) => { if (d) setData(d.atividades ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Atividades recentes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Atividades recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma atividade recente.</p>
          ) : (
            data.map((atividade, idx) => {
              const Icon = activityIcons[atividade.tipo] || FileText
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-secondary p-2">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{atividade.descricao}</p>
                    <p className="text-xs text-muted-foreground">{atividade.tempo}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
