import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { alunoId, nome, exercicios } = body as {
      alunoId: string
      nome: string
      exercicios?: Array<{ nome: string; series?: string; carga?: string; obs?: string }>
    }
    if (!alunoId?.trim() || !nome?.trim()) {
      return NextResponse.json(
        { error: "Selecione o aluno e informe o nome do treino." },
        { status: 400 }
      )
    }
    const aluno = await prisma.aluno.findUnique({ where: { id: alunoId.trim() } })
    if (!aluno) {
      return NextResponse.json({ error: "Aluno não encontrado." }, { status: 400 })
    }
    const lista = Array.isArray(exercicios) ? exercicios : []
    const treino = await prisma.treino.create({
      data: {
        alunoId: alunoId.trim(),
        nome: nome.trim(),
        exercicios: {
          create: lista.map((ex, i) => ({
            nome: (ex.nome && String(ex.nome).trim()) || "Exercício",
            series: (ex.series && String(ex.series).trim()) || "3x12",
            carga: (ex.carga && String(ex.carga).trim()) || "-",
            obs: (ex.obs && String(ex.obs).trim()) || null,
            ordem: i,
          })),
        },
      },
      include: { exercicios: { orderBy: { ordem: "asc" } } },
    })
    return NextResponse.json({
      id: treino.id,
      alunoId: treino.alunoId,
      nome: treino.nome,
      exercicios: treino.exercicios.map((e) => ({
        id: e.id,
        nome: e.nome,
        series: e.series,
        carga: e.carga,
        obs: e.obs ?? "",
      })),
    })
  } catch (e) {
    console.error("POST /api/treinos error:", e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro ao criar treino" },
      { status: 500 }
    )
  }
}

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
