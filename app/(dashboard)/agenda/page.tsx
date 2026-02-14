"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Clock } from "lucide-react"
import { agendaSemanal } from "@/lib/mock-data"

const tipoColors: Record<string, string> = {
  Musculacao: "bg-primary/20 text-primary",
  Funcional: "bg-success/20 text-success",
  HIIT: "bg-destructive/20 text-destructive",
  Cardio: "bg-warning/20 text-warning",
  Alongamento: "bg-chart-4/20 text-chart-4",
}

export default function AgendaPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
          <p className="text-sm text-muted-foreground">Calendario semanal de treinos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agendar treino
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {agendaSemanal.map((dia) => (
          <Card key={dia.dia} className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-base font-bold text-foreground">{dia.dia}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(dia.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {dia.treinos.map((treino, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-secondary p-2.5 transition-colors hover:bg-secondary/80"
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {treino.hora}
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{treino.aluno}</p>
                  <Badge className={`mt-1.5 text-[10px] px-1.5 py-0 ${tipoColors[treino.tipo] || "bg-muted text-muted-foreground"}`}>
                    {treino.tipo}
                  </Badge>
                </div>
              ))}
              {dia.treinos.length === 0 && (
                <p className="text-center text-xs text-muted-foreground py-4">
                  Sem treinos agendados
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
