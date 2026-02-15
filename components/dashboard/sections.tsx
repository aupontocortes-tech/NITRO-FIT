"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Send, FileText, DollarSign, Users, Dumbbell, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { alunos, atividadesRecentes } from "@/lib/mock-data"

const inadimplentes = alunos.filter((a) => a.status === "Inadimplente")

const proximosVencimentos = [
  { aluno: "Carlos Oliveira", valor: "R$ 250,00", vencimento: "15/02/2026" },
  { aluno: "Lucas Mendes", valor: "R$ 650,00", vencimento: "20/02/2026" },
  { aluno: "Ana Silva", valor: "R$ 650,00", vencimento: "10/03/2026" },
]

const activityIcons: Record<string, React.ElementType> = {
  contrato: FileText,
  pagamento: DollarSign,
  aluno: Users,
  treino: Dumbbell,
  cobranca: Send,
}

export function AlertasUrgentes() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <AlertCircle className="h-4 w-4 text-destructive" />
          Alertas urgentes
        </CardTitle>
        <Badge variant="destructive" className="text-xs">
          {inadimplentes.length} inadimplentes
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {inadimplentes.map((aluno) => (
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProximosVencimentos() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Proximos vencimentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {proximosVencimentos.map((item, idx) => (
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function EvolucaoAlunos() {
  const alunosAtivos = alunos.filter((a) => a.status === "Ativo")
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Evolucao dos alunos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alunosAtivos.slice(0, 5).map((aluno) => (
            <div key={aluno.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{aluno.nome}</p>
                <span className="text-xs font-medium text-muted-foreground">
                  {aluno.evolucao}%
                </span>
              </div>
              <Progress value={aluno.evolucao} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function AtividadesRecentes() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Atividades recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {atividadesRecentes.map((atividade, idx) => {
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
          })}
        </div>
      </CardContent>
    </Card>
  )
}
