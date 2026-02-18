import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const alunoId = searchParams.get("alunoId")

    if (alunoId) {
      const treinos = await prisma.treino.findMany({
        where: { alunoId },
        include: { exercicios: { orderBy: { ordem: "asc" } } },
        orderBy: { nome: "asc" },
      })
      const data = treinos.map((t) => ({
        id: t.id,
        alunoId: t.alunoId,
        nome: t.nome,
        exercicios: t.exercicios.map((e) => ({
          id: e.id,
          nome: e.nome,
          series: e.series,
          carga: e.carga,
          obs: e.obs ?? "",
        })),
      }))
      return NextResponse.json(data)
    }

    const todosAlunosComTreinos = await prisma.aluno.findMany({
      include: {
        treinos: { include: { exercicios: { orderBy: { ordem: "asc" } } } },
      },
      orderBy: { nome: "asc" },
    })
    const data = todosAlunosComTreinos
      .filter((a) => a.treinos.length > 0)
      .map((a) => ({
        aluno: a.nome,
        alunoId: a.id,
        treinos: a.treinos.map((t) => ({
          id: t.id,
          nome: t.nome,
          exercicios: t.exercicios.map((e) => ({
            nome: e.nome,
            series: e.series,
            carga: e.carga,
            obs: e.obs ?? "",
          })),
        })),
      }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar treinos" }, { status: 500 })
  }
}
