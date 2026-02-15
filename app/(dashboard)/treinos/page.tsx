"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Plus, Dumbbell, TrendingUp } from "lucide-react"
import { treinosPorAluno, alunos } from "@/lib/mock-data"

export default function TreinosPage() {
  const [selectedAluno, setSelectedAluno] = useState(treinosPorAluno[0].aluno)
  const alunoData = treinosPorAluno.find((t) => t.aluno === selectedAluno)
  const alunoInfo = alunos.find((a) => a.nome === selectedAluno)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Treinos</h1>
          <p className="text-sm text-muted-foreground">Gestao de treinos por aluno</p>
        </div>
        <Button className="gap-2" onClick={() => toast.success("Novo treino cadastrado!")}>
          <Plus className="h-4 w-4" />
          Novo treino
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground px-1">Selecionar aluno</p>
          {treinosPorAluno.map((item) => {
            const info = alunos.find((a) => a.nome === item.aluno)
            return (
              <button
                key={item.aluno}
                onClick={() => setSelectedAluno(item.aluno)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  selectedAluno === item.aluno
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-card border border-border hover:bg-secondary"
                }`}
              >
                <p className="text-sm font-medium text-foreground">{item.aluno}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] px-1.5">
                    {item.treinos.length} treino{item.treinos.length > 1 ? "s" : ""}
                  </Badge>
                  {info && (
                    <span className="text-xs text-muted-foreground">
                      Evolucao: {info.evolucao}%
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-3 space-y-4">
          {alunoInfo && (
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground">{alunoInfo.nome}</p>
                  <p className="text-sm text-muted-foreground">Plano {alunoInfo.plano}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-foreground">
                      {alunoInfo.evolucao}% evolucao
                    </span>
                  </div>
                  <Progress value={alunoInfo.evolucao} className="mt-1.5 h-1.5 w-32" />
                </div>
              </CardContent>
            </Card>
          )}

          {alunoData && alunoData.treinos.length > 0 && (
            <Tabs defaultValue={alunoData.treinos[0].nome}>
              <TabsList className="bg-secondary">
                {alunoData.treinos.map((treino) => (
                  <TabsTrigger key={treino.nome} value={treino.nome} className="text-xs">
                    {treino.nome}
                  </TabsTrigger>
                ))}
              </TabsList>
              {alunoData.treinos.map((treino) => (
                <TabsContent key={treino.nome} value={treino.nome}>
                  <Card className="border-border bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold">{treino.nome}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-muted-foreground">Exercicio</TableHead>
                            <TableHead className="text-muted-foreground">Series</TableHead>
                            <TableHead className="text-muted-foreground">Carga</TableHead>
                            <TableHead className="text-muted-foreground">Observacoes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {treino.exercicios.map((ex, idx) => (
                            <TableRow key={idx} className="border-border hover:bg-secondary/50">
                              <TableCell className="font-medium text-foreground">{ex.nome}</TableCell>
                              <TableCell className="text-muted-foreground">{ex.series}</TableCell>
                              <TableCell className="text-muted-foreground">{ex.carga}</TableCell>
                              <TableCell className="text-muted-foreground text-xs">
                                {ex.obs || "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}
