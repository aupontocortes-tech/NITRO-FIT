"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  plano: string
  dataInicio: string
  dataFim: string
  status: string
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

export default function ContratosPage() {
  const [contratos, setContratos] = useState<Contrato[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/contratos")
      .then((res) => res.ok ? res.json() : [])
      .then(setContratos)
      .catch(() => toast.error("Erro ao carregar contratos"))
      .finally(() => setLoading(false))
  }, [])

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
        <Button className="gap-2" onClick={() => toast.success("Novo contrato criado!")}>
          <Plus className="h-4 w-4" />
          Novo contrato
        </Button>
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
                  <TableHead className="text-muted-foreground">Data inicio</TableHead>
                  <TableHead className="text-muted-foreground">Data fim</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Assinatura digital</TableHead>
                  <TableHead className="text-muted-foreground sr-only">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contratos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
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
                      <TableCell>
                        <ContractStatusBadge status={contrato.status} />
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
