"use client"

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
import { Plus, Send, CheckCircle, MoreHorizontal, DollarSign, Clock, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { financeiro } from "@/lib/mock-data"

function PaymentStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Pago":
      return <Badge className="bg-success/20 text-success hover:bg-success/20">Pago</Badge>
    case "Pendente":
      return <Badge className="bg-primary/20 text-primary hover:bg-primary/20">Pendente</Badge>
    case "Atrasado":
      return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/20">Atrasado</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const totalPago = financeiro.filter((f) => f.status === "Pago").reduce((acc, f) => acc + f.valor, 0)
const totalPendente = financeiro.filter((f) => f.status === "Pendente").reduce((acc, f) => acc + f.valor, 0)
const totalAtrasado = financeiro.filter((f) => f.status === "Atrasado").reduce((acc, f) => acc + f.valor, 0)

export default function FinanceiroPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
          <p className="text-sm text-muted-foreground">Gestao de pagamentos e cobrancas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => toast.info("Selecione os alunos para enviar cobranca")}>
            <Send className="h-4 w-4" />
            Enviar cobranca
          </Button>
          <Button className="gap-2" onClick={() => toast.success("Nova cobranca criada!")}>
            <Plus className="h-4 w-4" />
            Nova cobranca
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2.5">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total recebido</p>
                <p className="text-xl font-bold text-foreground">
                  R$ {totalPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendente</p>
                <p className="text-xl font-bold text-foreground">
                  R$ {totalPendente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-destructive/10 p-2.5">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Atrasado</p>
                <p className="text-xl font-bold text-foreground">
                  R$ {totalAtrasado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Pagamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Aluno</TableHead>
                  <TableHead className="text-muted-foreground">Valor</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Metodo</TableHead>
                  <TableHead className="text-muted-foreground">Vencimento</TableHead>
                  <TableHead className="text-muted-foreground sr-only">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financeiro.map((item) => (
                  <TableRow key={item.id} className="border-border hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{item.aluno}</TableCell>
                    <TableCell className="text-foreground font-medium">
                      R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.metodo}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.vencimento).toLocaleDateString("pt-BR")}
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
                          <DropdownMenuItem className="gap-2" onClick={() => toast.success(`Pagamento de ${item.aluno} marcado como pago!`)}>
                            <CheckCircle className="h-3.5 w-3.5" />
                            Marcar como pago
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => toast.success(`Cobranca enviada para ${item.aluno}`)}>
                            <Send className="h-3.5 w-3.5" />
                            Enviar cobranca
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Detalhes: ${item.aluno} - R$ ${item.valor.toFixed(2)}`)}>Ver detalhes</DropdownMenuItem>
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
