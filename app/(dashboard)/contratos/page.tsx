"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
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
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, FileSignature, MoreHorizontal, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Contrato = {
  id: string
  aluno: string
  alunoId: string
  plano: string
  planoId: string
  dataInicio: string
  dataFim: string
  dataNascimento: string | null
  status: string
  situacaoFinanceira: string
  assinatura: string
}

function ContractStatusBadge({ status }: { status: string }) {
  if (status === "Ativo") {
    return <Badge className="bg-success/20 text-success hover:bg-success/20">Ativo</Badge>
  }
  return <Badge className="bg-muted text-muted-foreground hover:bg-muted">Expirado</Badge>
}

function SignatureBadge({ status }: { status: string }) {
  if (status === "Assinado") {
    return (
      <Badge variant="outline" className="gap-1 border-success/30 text-success">
        <FileSignature className="h-3 w-3" />
        Assinado
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="gap-1 border-warning/30 text-warning">
      <FileSignature className="h-3 w-3" />
      Pendente
    </Badge>
  )
}

function SituacaoBadge({ situacao }: { situacao: string }) {
  const s = situacao?.toLowerCase() ?? ""
  if (s === "em dia") {
    return <Badge variant="outline" className="border-success/30 text-success">Em dia</Badge>
  }
  if (s === "atrasado" || s === "em atraso" || s === "devendo") {
    return <Badge variant="outline" className="border-destructive/50 text-destructive">Em atraso</Badge>
  }
  return <Badge variant="outline" className="text-muted-foreground">{situacao || "-"}</Badge>
}

type AlunoOption = { id: string; nome: string }
type PlanoOption = { id: string; nome: string; duracaoMeses: number }

export default function ContratosPage() {
  const [contratos, setContratos] = useState<Contrato[]>([])
  const [loading, setLoading] = useState(true)
  const [novoContratoOpen, setNovoContratoOpen] = useState(false)
  const [alunos, setAlunos] = useState<AlunoOption[]>([])
  const [planos, setPlanos] = useState<PlanoOption[]>([])
  const [formAlunoId, setFormAlunoId] = useState("")
  const [formPlanoId, setFormPlanoId] = useState("")
  const [formDataInicio, setFormDataInicio] = useState("")
  const [formDataFim, setFormDataFim] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const carregarContratos = useCallback(() => {
    return fetch("/api/contratos", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then(setContratos)
      .catch(() => toast.error("Erro ao carregar contratos"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setLoading(true)
    carregarContratos()
  }, [carregarContratos])

  useEffect(() => {
    if (!novoContratoOpen) return
    fetch("/api/alunos", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((list: { id: string; nome: string }[]) => setAlunos(list))
      .catch(() => setAlunos([]))
    fetch("/api/planos", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((list: { id: string; nome: string; duracaoMeses: number }[]) => setPlanos(list))
      .catch(() => setPlanos([]))
    const hoje = new Date().toISOString().slice(0, 10)
    setFormDataInicio(hoje)
    setFormDataFim("")
    setFormAlunoId("")
    setFormPlanoId("")
  }, [novoContratoOpen])

  const handleNovoContrato = () => {
    if (!formAlunoId || !formPlanoId) {
      toast.error("Selecione o aluno e o plano.")
      return
    }
    setSubmitting(true)
    fetch("/api/contratos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        alunoId: formAlunoId,
        planoId: formPlanoId,
        dataInicio: formDataInicio || undefined,
        dataFim: formDataFim || undefined,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((d) => Promise.reject(new Error(d?.error ?? "Erro")))
        return res.json()
      })
      .then(() => {
        toast.success("Contrato criado!")
        setNovoContratoOpen(false)
        carregarContratos()
      })
      .catch((e) => toast.error(e?.message ?? "Erro ao criar contrato"))
      .finally(() => setSubmitting(false))
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
          <h1 className="text-2xl font-bold text-foreground">Contratos</h1>
          <p className="text-sm text-muted-foreground">{contratos.length} contratos cadastrados</p>
        </div>
        <Dialog open={novoContratoOpen} onOpenChange={setNovoContratoOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo contrato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo contrato</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Aluno</Label>
                <Select value={formAlunoId} onValueChange={setFormAlunoId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {alunos.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Plano</Label>
                <Select value={formPlanoId} onValueChange={setFormPlanoId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    {planos.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Data início</Label>
                <Input
                  type="date"
                  value={formDataInicio}
                  onChange={(e) => setFormDataInicio(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Data fim (opcional)</Label>
                <Input
                  type="date"
                  value={formDataFim}
                  onChange={(e) => setFormDataFim(e.target.value)}
                  placeholder="Preenchido pelo plano se vazio"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNovoContratoOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleNovoContrato} disabled={submitting} className="gap-2">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Salvando…" : "Criar contrato"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Lista de contratos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Aluno</TableHead>
                  <TableHead className="text-muted-foreground">Plano</TableHead>
                  <TableHead className="text-muted-foreground">Data início</TableHead>
                  <TableHead className="text-muted-foreground">Data fim</TableHead>
                  <TableHead className="text-muted-foreground">Data nasc.</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Situação</TableHead>
                  <TableHead className="text-muted-foreground">Assinatura digital</TableHead>
                  <TableHead className="text-muted-foreground sr-only">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contratos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      Nenhum contrato cadastrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  contratos.map((contrato) => (
                    <TableRow key={contrato.id} className="border-border hover:bg-secondary/50">
                      <TableCell className="font-medium text-foreground">{contrato.aluno}</TableCell>
                      <TableCell className="text-muted-foreground">{contrato.plano}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(contrato.dataInicio).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(contrato.dataFim).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {contrato.dataNascimento
                          ? new Date(contrato.dataNascimento).toLocaleDateString("pt-BR")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <ContractStatusBadge status={contrato.status} />
                      </TableCell>
                      <TableCell>
                        <SituacaoBadge situacao={contrato.situacaoFinanceira} />
                      </TableCell>
                      <TableCell>
                        <SignatureBadge status={contrato.assinatura} />
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
                            <DropdownMenuItem onClick={() => toast.info(`Contrato de ${contrato.aluno}`)}>Ver contrato</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Link enviado para assinatura!")}>Enviar para assinatura</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Contrato renovado!")}>Renovar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => toast.error("Contrato cancelado.")}>Cancelar</DropdownMenuItem>
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
