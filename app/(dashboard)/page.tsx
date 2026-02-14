import { KpiCards } from "@/components/dashboard/kpi-cards"
import { DashboardCharts } from "@/components/dashboard/charts"
import {
  AlertasUrgentes,
  ProximosVencimentos,
  EvolucaoAlunos,
  AtividadesRecentes,
} from "@/components/dashboard/sections"

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
