"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { faturamentoMensal, distribuicaoPlanos } from "@/lib/mock-data"

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(160, 60%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 60%)",
]

function CustomTooltipLine({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-bold text-foreground">
          R$ {payload[0].value.toLocaleString("pt-BR")}
        </p>
      </div>
    )
  }
  return null
}

function CustomTooltipPie({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{payload[0].name}</p>
        <p className="text-sm font-bold text-foreground">{payload[0].value} alunos</p>
      </div>
    )
  }
  return null
}

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
      <Card className="border-border bg-card lg:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground">Faturamento mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={faturamentoMensal}>
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
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltipLine />} />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "hsl(217, 91%, 60%)", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "hsl(217, 91%, 60%)", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground">Distribuicao por planos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribuicaoPlanos}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distribuicaoPlanos.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltipPie />} />
                <Legend
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
