"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CpfInput } from "@/components/ui/cpf-input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

type Aluno = {
  id: string
  nome: string
  email: string
  telefone: string
  plano: string
  planoId?: string | null
  status: string
  situacaoFinanceira: string
  evolucao: number
  proximoTreino: string
}

type Plano = { id: string; nome: string; valor: number; duracaoMeses: number }

function StatusBadge({ status }: { status: string }) {
  if (status === "Ativo") {
    return <Badge className="bg-success/20 text-success hover:bg-success/20">Ativo</Badge>
  }
  return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/20">Inadimplente</Badge>
}

function FinanceBadge({ status }: { status: string }) {
  if (status === "Em dia") {
    return <Badge variant="outline" className="border-success/30 text-success">Em dia</Badge>
  }
  return <Badge variant="outline" className="border-warning/30 text-warning">Atrasado</Badge>
}

export default function AlunosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [removerAlunoId, setRemoverAlunoId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formNome, setFormNome] = useState("")
  const [formCpf, setFormCpf] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formTelefone, setFormTelefone] = useState("")
  const [formPlanoId, setFormPlanoId] = useState("")

  const fetchAlunos = useCallback(async () => {
    try {
      const res = await fetch("/api/alunos", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setAlunos(Array.isArray(data) ? data : [])
      }
    } catch (e) {
      toast.error("Erro ao carregar alunos")
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPlanos = useCallback(async () => {
    try {
      const res = await fetch("/api/planos")
      if (res.ok) setPlanos(await res.json())
    } catch (_) {}
  }, [])

  useEffect(() => {
    fetchAlunos()
    fetchPlanos()
  }, [fetchAlunos, fetchPlanos])

  useEffect(() => {
    const q = searchParams.get("q")
    if (q) setSearchTerm(q)
  }, [searchParams])

  const filtered = alunos.filter(
    (a) =>
      a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.email && a.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleCadastrarAluno = async () => {
    if (!formNome.trim()) {
      toast.error("Nome é obrigatório")
      return
    }
    setSaving(true)
    try {
      const res = await fetch("/api/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formNome.trim(),
          email: formEmail.trim() || undefined,
          telefone: formTelefone.trim() || undefined,
          cpf: formCpf.trim() || undefined,
          ...(formPlanoId?.trim() ? { planoId: formPlanoId.trim() } : {}),
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast.error((err as { error?: string }).error || "Erro ao cadastrar")
        return
      }
      const novoAluno = (await res.json()) as Aluno
      setAlunos((prev) => [...prev, novoAluno].sort((a, b) => a.nome.localeCompare(b.nome)))
      setDialogOpen(false)
      setFormNome("")
      setFormCpf("")
      setFormEmail("")
      setFormTelefone("")
      setFormPlanoId("")
      toast.success("Aluno cadastrado com sucesso!")
      await fetchAlunos()
    } catch {
      toast.error("Erro ao cadastrar aluno")
    } finally {
      setSaving(false)
    }
  }

  const handleRemoverAluno = async () => {
    if (!removerAlunoId) return
    try {
      const res = await fetch(`/api/alunos/${removerAlunoId}`, { method: "DELETE" })
      if (!res.ok) {
        toast.error("Erro ao remover aluno")
        return
      }
      toast.success("Aluno removido da lista.")
      setRemoverAlunoId(null)
      fetchAlunos()
    } catch {
      toast.error("Erro ao remover aluno")
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
          <h1 className="text-2xl font-bold text-foreground">Alunos</h1>
          <p className="text-sm text-muted-foreground">{alunos.length} alunos cadastrados</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo aluno
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Cadastrar novo aluno</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Nome do aluno"
                  className="bg-secondary"
                  value={formNome}
                  onChange={(e) => setFormNome(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cpf">CPF</Label>
                <CpfInput
                  id="cpf"
                  className="bg-secondary"
                  value={formCpf}
                  onChange={(valor) => setFormCpf(valor ?? "")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    className="bg-secondary"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    className="bg-secondary"
                    value={formTelefone}
                    onChange={(e) => setFormTelefone(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan">Plano</Label>
                <Select value={formPlanoId} onValueChange={setFormPlanoId}>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    {planos.filter((p) => p.id).map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.nome} - R$ {p.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                className="mt-2 w-full"
                onClick={handleCadastrarAluno}
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Cadastrar aluno"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <AlertDialog open={removerAlunoId !== null} onOpenChange={(open) => !open && setRemoverAlunoId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover aluno?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acao nao pode ser desfeita. O aluno sera removido da lista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoverAluno} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">Lista de alunos</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar aluno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary pl-9 text-sm sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Nome</TableHead>
                  <TableHead className="text-muted-foreground">Telefone</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Plano</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Proximo treino</TableHead>
                  <TableHead className="text-muted-foreground">Financeiro</TableHead>
                  <TableHead className="text-muted-foreground sr-only">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      Nenhum aluno cadastrado. Clique em Novo aluno para começar.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((aluno) => (
                    <TableRow key={aluno.id} className="border-border hover:bg-secondary/50">
                      <TableCell className="font-medium text-foreground">{aluno.nome}</TableCell>
                      <TableCell className="text-muted-foreground">{aluno.telefone}</TableCell>
                      <TableCell className="text-muted-foreground">{aluno.email}</TableCell>
                      <TableCell className="text-muted-foreground">{aluno.plano}</TableCell>
                      <TableCell>
                        <StatusBadge status={aluno.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">{aluno.proximoTreino}</TableCell>
                      <TableCell>
                        <FinanceBadge status={aluno.situacaoFinanceira} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Acoes</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info(`Perfil de ${aluno.nome}`)}>Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info(`Editar ${aluno.nome}`)}>Editar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push("/treinos")}>Ver treinos</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => setRemoverAlunoId(aluno.id)}>
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
