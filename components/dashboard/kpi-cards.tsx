"use client"

import { DollarSign, TrendingUp, Clock, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const kpis = [
  {
    title: "Faturamento do mes",
    value: "R$ 12.450",
    change: "+18.2%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Receita prevista",
    value: "R$ 14.800",
    change: "+8.5%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Pagamentos pendentes",
    value: "R$ 1.150",
    change: "2 cobranças",
    positive: false,
    icon: Clock,
  },
  {
    title: "Alunos ativos",
    value: "6",
    change: "+2 este mes",
    positive: true,
    icon: Users,
  },
  {
    title: "Alunos inadimplentes",
    value: "2",
    change: "Atencao",
    positive: false,
    icon: AlertTriangle,
  },
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {kpis.map((kpi) => (
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
