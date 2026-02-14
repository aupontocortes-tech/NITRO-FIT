"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { alunos } from "@/lib/mock-data"

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
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = alunos.filter(
    (a) =>
      a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alunos</h1>
          <p className="text-sm text-muted-foreground">{alunos.length} alunos cadastrados</p>
        </div>
        <Dialog>
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
                <Input id="name" placeholder="Nome do aluno" className="bg-secondary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" className="bg-secondary" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" className="bg-secondary" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan">Plano</Label>
                <Select>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mensal">Mensal - R$ 250,00</SelectItem>
                    <SelectItem value="trimestral">Trimestral - R$ 650,00</SelectItem>
                    <SelectItem value="semestral">Semestral - R$ 1.200,00</SelectItem>
                    <SelectItem value="anual">Anual - R$ 2.200,00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-2 w-full">Cadastrar aluno</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                {filtered.map((aluno) => (
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
                          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver treinos</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
