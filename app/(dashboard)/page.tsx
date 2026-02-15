import dynamic from "next/dynamic"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import {
  AlertasUrgentes,
  ProximosVencimentos,
  EvolucaoAlunos,
  AtividadesRecentes,
} from "@/components/dashboard/sections"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const DashboardCharts = dynamic(
  () => import("@/components/dashboard/charts").then((m) => ({ default: m.DashboardCharts })),
  {
    loading: () => (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="border-border bg-card lg:col-span-4">
          <CardHeader><Skeleton className="h-5 w-40" /></CardHeader>
          <CardContent><Skeleton className="h-64 w-full rounded-lg" /></CardContent>
        </Card>
        <Card className="border-border bg-card lg:col-span-3">
          <CardHeader><Skeleton className="h-5 w-44" /></CardHeader>
          <CardContent><Skeleton className="h-64 w-full rounded-lg" /></CardContent>
        </Card>
      </div>
    ),
  }
)

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visao geral do seu negocio
        </p>
      </div>

      <KpiCards />

      <DashboardCharts />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AlertasUrgentes />
        <ProximosVencimentos />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <EvolucaoAlunos />
        <AtividadesRecentes />
      </div>
    </div>
  )
}
