"use client"

import { useEffect, useState } from "react"
import { DollarSign, TrendingUp, Clock, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

type Kpis = {
  faturamentoMes: number
  receitaPrevista: number
  pagamentosPendentes: number
  cobrancasPendentes: number
  alunosAtivos: number
  alunosInadimplentes: number
}

const defaultKpis: Kpis = {
  faturamentoMes: 0,
  receitaPrevista: 0,
  pagamentosPendentes: 0,
  cobrancasPendentes: 0,
  alunosAtivos: 0,
  alunosInadimplentes: 0,
}

export function KpiCards() {
  const [kpis, setKpis] = useState<Kpis | null>(null)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => data && setKpis(data.kpis ?? defaultKpis))
      .catch(() => setKpis(defaultKpis))
  }, [])

  if (kpis === null) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="border-border bg-card">
            <CardContent className="p-5 flex items-center justify-center h-[88px]">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const items = [
    {
      title: "Faturamento do mes",
      value: `R$ ${kpis.faturamentoMes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      change: "+18.2%",
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Receita prevista",
      value: `R$ ${kpis.receitaPrevista.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      change: "+8.5%",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Pagamentos pendentes",
      value: `R$ ${kpis.pagamentosPendentes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      change: `${kpis.cobrancasPendentes} cobranças`,
      positive: false,
      icon: Clock,
    },
    {
      title: "Alunos ativos",
      value: String(kpis.alunosAtivos),
      change: "Este mês",
      positive: true,
      icon: Users,
    },
    {
      title: "Alunos inadimplentes",
      value: String(kpis.alunosInadimplentes),
      change: "Atenção",
      positive: false,
      icon: AlertTriangle,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {items.map((kpi) => (
        <Card key={kpi.title} className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
              <div className="rounded-lg bg-secondary p-2">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className={`mt-1 text-xs font-medium ${kpi.positive ? "text-success" : "text-warning"}`}>
              {kpi.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
