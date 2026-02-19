"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Plus, Clock, Loader2 } from "lucide-react"

const TIPOS_TREINO = ["Musculacao", "Funcional", "HIIT", "Cardio", "Alongamento"]

const tipoColors: Record<string, string> = {
  Musculacao: "bg-primary/20 text-primary",
  Funcional: "bg-success/20 text-success",
  HIIT: "bg-destructive/20 text-destructive",
  Cardio: "bg-warning/20 text-warning",
  Alongamento: "bg-chart-4/20 text-chart-4",
}

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

type AgendamentoItem = { id: string; data: string; hora: string; aluno: string; tipo: string }

function buildAgendaSemanal(agendamentos: AgendamentoItem[]) {
  const byDate = new Map<string, AgendamentoItem[]>()
  for (const a of agendamentos) {
    const list = byDate.get(a.data) ?? []
    list.push(a)
    byDate.set(a.data, list)
  }
  for (const list of byDate.values()) list.sort((x, y) => x.hora.localeCompare(y.hora))
  const hoje = new Date()
  const result: { dia: string; data: string; treinos: { hora: string; aluno: string; tipo: string }[] }[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(hoje)
    d.setDate(d.getDate() + i)
    const dataStr = d.toISOString().slice(0, 10)
    const diaNome = diasSemana[d.getDay()]
    const treinos = (byDate.get(dataStr) ?? []).map((t) => ({ hora: t.hora, aluno: t.aluno, tipo: t.tipo }))
    result.push({ dia: diaNome, data: dataStr, treinos })
  }
  return result
}

export default function AgendaPage() {
  const [agendaSemanal, setAgendaSemanal] = useState<{ dia: string; data: string; treinos: { hora: string; aluno: string; tipo: string }[] }[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [alunos, setAlunos] = useState<{ id: string; nome: string }[]>([])
  const [formData, setFormData] = useState("")
  const [formHora, setFormHora] = useState("08:00")
  const [formAlunoId, setFormAlunoId] = useState("")
  const [formTipo, setFormTipo] = useState("Musculacao")

  const fetchAgenda = useCallback(async () => {
    const res = await fetch("/api/agendamentos")
    const list = res.ok ? (await res.json()) as AgendamentoItem[] : []
    setAgendaSemanal(buildAgendaSemanal(list))
  }, [])

  useEffect(() => {
    fetch("/api/agendamentos")
      .then((res) => res.ok ? res.json() : [])
      .then((list: AgendamentoItem[]) => setAgendaSemanal(buildAgendaSemanal(list)))
      .catch(() => toast.error("Erro ao carregar agenda"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch("/api/alunos")
      .then((res) => res.ok ? res.json() : [])
      .then((list: { id: string; nome: string }[]) => setAlunos(list.map((a) => ({ id: a.id, nome: a.nome }))))
      .catch(() => {})
  }, [])

  const hoje = new Date().toISOString().slice(0, 10)

  const handleAgendar = async () => {
    if (!formData.trim() || !formHora.trim() || !formAlunoId.trim() || !formTipo.trim()) {
      toast.error("Preencha data, hora, aluno e tipo.")
      return
    }
    setSaving(true)
    try {
      const res = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alunoId: formAlunoId,
          data: formData,
          hora: formHora,
          tipo: formTipo,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast.error((err as { error?: string }).error || "Erro ao agendar")
        return
      }
      setDialogOpen(false)
      setFormData(hoje)
      setFormHora("08:00")
      setFormAlunoId("")
      setFormTipo("Musculacao")
      toast.success("Treino agendado!")
      const listRes = await fetch("/api/agendamentos")
      const list = listRes.ok ? (await listRes.json()) as AgendamentoItem[] : []
      setAgendaSemanal(buildAgendaSemanal(list))
    } catch {
      toast.error("Erro ao agendar")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
          <p className="text-sm text-muted-foreground">Calendario semanal de treinos</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agendar treino
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Agendar treino / aula</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Data</Label>
                <Input
                  type="date"
                  value={formData || hoje}
                  onChange={(e) => setFormData(e.target.value)}
                  className="bg-secondary"
                />
              </div>
              <div className="grid gap-2">
                <Label>Hora</Label>
                <Input
                  type="time"
                  value={formHora}
                  onChange={(e) => setFormHora(e.target.value)}
                  className="bg-secondary"
                />
              </div>
              <div className="grid gap-2">
                <Label>Aluno</Label>
                <Select value={formAlunoId} onValueChange={setFormAlunoId}>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {alunos.map((a) => (
                      <SelectItem key={a.id} value={a.id}>{a.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Tipo</Label>
                <Select value={formTipo} onValueChange={setFormTipo}>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_TREINO.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAgendar} disabled={saving} className="w-full">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Agendar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {agendaSemanal.map((dia) => (
          <Card key={dia.data} className="border-border bg-card">
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
