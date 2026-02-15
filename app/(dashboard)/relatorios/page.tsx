"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Download, Users, DollarSign, TrendingUp, Activity } from "lucide-react"

const retencaoData = [
  { mes: "Set", taxa: 85 },
  { mes: "Out", taxa: 88 },
  { mes: "Nov", taxa: 82 },
  { mes: "Dez", taxa: 90 },
  { mes: "Jan", taxa: 87 },
  { mes: "Fev", taxa: 92 },
]

const receitaPorPlano = [
  { plano: "Mensal", receita: 750 },
  { plano: "Trimestral", receita: 1300 },
  { plano: "Semestral", receita: 2400 },
  { plano: "Anual", receita: 2200 },
]

const alunosPorMes = [
  { mes: "Set", novos: 2, cancelados: 1 },
  { mes: "Out", novos: 3, cancelados: 0 },
  { mes: "Nov", novos: 1, cancelados: 1 },
  { mes: "Dez", novos: 2, cancelados: 0 },
  { mes: "Jan", novos: 4, cancelados: 1 },
  { mes: "Fev", novos: 2, cancelados: 0 },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-medium text-foreground">
            {p.name}: {typeof p.value === "number" && p.name.includes("R$") ? `R$ ${p.value.toLocaleString("pt-BR")}` : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relatorios</h1>
          <p className="text-sm text-muted-foreground">Analise de desempenho e metricas</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="fev">
            <SelectTrigger className="w-40 bg-secondary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jan">Janeiro 2026</SelectItem>
              <SelectItem value="fev">Fevereiro 2026</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={() => toast.success("Relatorio exportado! (PDF)")}>
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total alunos</p>
                <p className="text-xl font-bold text-foreground">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <DollarSign className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Receita total</p>
                <p className="text-xl font-bold text-foreground">R$ 12.450</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <TrendingUp className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Taxa retencao</p>
                <p className="text-xl font-bold text-foreground">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-chart-4/10 p-2">
                <Activity className="h-4 w-4 text-chart-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ticket medio</p>
                <p className="text-xl font-bold text-foreground">R$ 1.556</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Taxa de retencao
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retencaoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 16%)" />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(215, 25%, 16%)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(215, 25%, 16%)" }}
                    tickLine={false}
                    domain={[70, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="taxa"
                    name="Taxa"
                    stroke="hsl(160, 60%, 45%)"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "hsl(160, 60%, 45%)", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Receita por plano
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={receitaPorPlano}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 16%)" />
                  <XAxis
                    dataKey="plano"
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(215, 25%, 16%)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(215, 25%, 16%)" }}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="receita"
                    name="R$ Receita"
                    fill="hsl(217, 91%, 60%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground">
            Movimentacao de alunos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alunosPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 16%)" />
                <XAxis
                  dataKey="mes"
                  tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(215, 25%, 16%)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(215, 25%, 16%)" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="novos" name="Novos" fill="hsl(160, 60%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cancelados" name="Cancelados" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
