"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Plus, Dumbbell, TrendingUp, Loader2, Trash2 } from "lucide-react"

type TreinoItem = { id: string; nome: string; exercicios: { nome: string; series: string; carga: string; obs: string }[] }
type AlunoComTreinos = { id: string; nome: string; plano: string; evolucao: number; treinos: TreinoItem[] }

export default function TreinosPage() {
  const [alunosComTreinos, setAlunosComTreinos] = useState<AlunoComTreinos[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAlunoId, setSelectedAlunoId] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formAlunoId, setFormAlunoId] = useState("")
  const [formNomeTreino, setFormNomeTreino] = useState("")
  const [formExercicios, setFormExercicios] = useState<{ nome: string; series: string; carga: string; obs: string }[]>([
    { nome: "", series: "3x12", carga: "-", obs: "" },
  ])

  const fetchData = useCallback(async () => {
    const [alunosRes, treinosRes] = await Promise.all([
      fetch("/api/alunos"),
      fetch("/api/treinos"),
    ])
    const alunos = alunosRes.ok ? (await alunosRes.json()) as { id: string; nome: string; plano: string; evolucao?: number }[] : []
    const treinosData = treinosRes.ok ? (await treinosRes.json()) as { alunoId: string; aluno: string; treinos: TreinoItem[] }[] : []
    const merged: AlunoComTreinos[] = alunos.map((a) => ({
      id: a.id,
      nome: a.nome,
      plano: a.plano,
      evolucao: a.evolucao ?? 0,
      treinos: treinosData.find((t) => t.alunoId === a.id)?.treinos ?? [],
    }))
    setAlunosComTreinos(merged)
    setSelectedAlunoId((prev) => (prev && merged.some((a) => a.id === prev)) ? prev : merged[0]?.id ?? "")
  }, [])

  useEffect(() => {
    fetchData().catch(() => toast.error("Erro ao carregar")).finally(() => setLoading(false))
  }, [])

  const selectedAluno = alunosComTreinos.find((a) => a.id === selectedAlunoId)

  const handleNovoTreino = async () => {
    if (!formAlunoId.trim() || !formNomeTreino.trim()) {
      toast.error("Selecione o aluno e informe o nome do treino.")
      return
    }
    const exs = formExercicios.filter((e) => e.nome.trim())
    if (exs.length === 0) {
      toast.error("Adicione pelo menos um exercício.")
      return
    }
    setSaving(true)
    try {
      const res = await fetch("/api/treinos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alunoId: formAlunoId,
          nome: formNomeTreino.trim(),
          exercicios: exs.map((e) => ({
            nome: e.nome.trim(),
            series: e.series.trim() || "3x12",
            carga: e.carga.trim() || "-",
            obs: e.obs.trim() || undefined,
          })),
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast.error((err as { error?: string }).error || "Erro ao criar treino")
        return
      }
      setDialogOpen(false)
      setFormAlunoId("")
      setFormNomeTreino("")
      setFormExercicios([{ nome: "", series: "3x12", carga: "-", obs: "" }])
      toast.success("Treino cadastrado!")
      await fetchData()
    } catch {
      toast.error("Erro ao criar treino")
    } finally {
      setSaving(false)
    }
  }

  const addExercicio = () => setFormExercicios((prev) => [...prev, { nome: "", series: "3x12", carga: "-", obs: "" }])
  const removeExercicio = (i: number) => setFormExercicios((prev) => prev.filter((_, idx) => idx !== i))
  const updateExercicio = (i: number, field: "nome" | "series" | "carga" | "obs", value: string) => {
    setFormExercicios((prev) => prev.map((ex, idx) => (idx === i ? { ...ex, [field]: value } : ex)))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (alunosComTreinos.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Treinos</h1>
        <p className="text-muted-foreground">Cadastre alunos na página Alunos para depois adicionar treinos.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Treinos</h1>
          <p className="text-sm text-muted-foreground">Gestao de treinos por aluno</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo treino
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo treino</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Aluno</Label>
                <Select value={formAlunoId} onValueChange={setFormAlunoId}>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {alunosComTreinos.map((a) => (
                      <SelectItem key={a.id} value={a.id}>{a.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Nome do treino</Label>
                <Input
                  placeholder="Ex: Treino A - Superior"
                  value={formNomeTreino}
                  onChange={(e) => setFormNomeTreino(e.target.value)}
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label>Exercícios</Label>
                {formExercicios.map((ex, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-2 rounded-lg bg-secondary p-2">
                    <Input
                      placeholder="Exercício"
                      value={ex.nome}
                      onChange={(e) => updateExercicio(i, "nome", e.target.value)}
                      className="bg-background flex-1 min-w-[120px]"
                    />
                    <Input
                      placeholder="Séries"
                      value={ex.series}
                      onChange={(e) => updateExercicio(i, "series", e.target.value)}
                      className="w-20 bg-background"
                    />
                    <Input
                      placeholder="Carga"
                      value={ex.carga}
                      onChange={(e) => updateExercicio(i, "carga", e.target.value)}
                      className="w-20 bg-background"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeExercicio(i)} className="shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addExercicio} className="w-full">
                  + Adicionar exercício
                </Button>
              </div>
              <Button onClick={handleNovoTreino} disabled={saving} className="w-full">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar treino"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground px-1">Selecionar aluno</p>
          {alunosComTreinos.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAlunoId(a.id)}
              className={`w-full rounded-lg p-3 text-left transition-colors ${
                selectedAlunoId === a.id
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-card border border-border hover:bg-secondary"
              }`}
            >
              <p className="text-sm font-medium text-foreground">{a.nome}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] px-1.5">
                  {a.treinos.length} treino{a.treinos.length !== 1 ? "s" : ""}
                </Badge>
                <span className="text-xs text-muted-foreground">Evolução: {a.evolucao}%</span>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-4">
          {selectedAluno && (
            <>
              <Card className="border-border bg-card">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Dumbbell className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-foreground">{selectedAluno.nome}</p>
                    <p className="text-sm text-muted-foreground">Plano {selectedAluno.plano}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-foreground">{selectedAluno.evolucao}% evolução</span>
                    </div>
                    <Progress value={selectedAluno.evolucao} className="mt-1.5 h-1.5 w-32" />
                  </div>
                </CardContent>
              </Card>

              {selectedAluno.treinos.length > 0 ? (
                <Tabs defaultValue={selectedAluno.treinos[0].id}>
                  <TabsList className="bg-secondary">
                    {selectedAluno.treinos.map((t) => (
                      <TabsTrigger key={t.id} value={t.id} className="text-xs">
                        {t.nome}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {selectedAluno.treinos.map((treino) => (
                    <TabsContent key={treino.id} value={treino.id}>
                      <Card className="border-border bg-card">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base font-semibold">{treino.nome}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="text-muted-foreground">Exercício</TableHead>
                                <TableHead className="text-muted-foreground">Séries</TableHead>
                                <TableHead className="text-muted-foreground">Carga</TableHead>
                                <TableHead className="text-muted-foreground">Observações</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {treino.exercicios.map((ex, idx) => (
                                <TableRow key={idx} className="border-border hover:bg-secondary/50">
                                  <TableCell className="font-medium text-foreground">{ex.nome}</TableCell>
                                  <TableCell className="text-muted-foreground">{ex.series}</TableCell>
                                  <TableCell className="text-muted-foreground">{ex.carga}</TableCell>
                                  <TableCell className="text-muted-foreground text-xs">{ex.obs || "-"}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <Card className="border-border bg-card">
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Nenhum treino para este aluno. Clique em &quot;Novo treino&quot; para adicionar.
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
