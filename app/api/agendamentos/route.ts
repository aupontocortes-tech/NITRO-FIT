import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { alunoId, data, hora, tipo } = body as {
      alunoId: string
      data: string
      hora: string
      tipo: string
    }
    if (!alunoId?.trim() || !data?.trim() || !hora?.trim() || !tipo?.trim()) {
      return NextResponse.json(
        { error: "Preencha aluno, data, hora e tipo do treino." },
        { status: 400 }
      )
    }
    const aluno = await prisma.aluno.findUnique({ where: { id: alunoId.trim() } })
    if (!aluno) {
      return NextResponse.json({ error: "Aluno não encontrado." }, { status: 400 })
    }
    const dataDate = new Date(data + "T12:00:00")
    if (isNaN(dataDate.getTime())) {
      return NextResponse.json({ error: "Data inválida." }, { status: 400 })
    }
    const agendamento = await prisma.agendamento.create({
      data: {
        alunoId: alunoId.trim(),
        data: dataDate,
        hora: hora.trim(),
        tipo: tipo.trim(),
      },
      include: { aluno: true },
    })
    return NextResponse.json({
      id: agendamento.id,
      alunoId: agendamento.alunoId,
      aluno: agendamento.aluno.nome,
      data: agendamento.data.toISOString().slice(0, 10),
      hora: agendamento.hora,
      tipo: agendamento.tipo,
    })
  } catch (e) {
    console.error("POST /api/agendamentos error:", e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro ao agendar" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const dataInicio = searchParams.get("dataInicio")
    const dataFim = searchParams.get("dataFim")

    const where: { data?: { gte?: Date; lte?: Date } } = {}
    if (dataInicio) where.data = { ...where.data, gte: new Date(dataInicio) }
    if (dataFim) where.data = { ...where.data, lte: new Date(dataFim) }

    const agendamentos = await prisma.agendamento.findMany({
      where: Object.keys(where).length ? where : undefined,
      include: { aluno: true },
      orderBy: [{ data: "asc" }, { hora: "asc" }],
    })
    const data = agendamentos.map((a) => ({
      id: a.id,
      alunoId: a.alunoId,
      aluno: a.aluno.nome,
      data: a.data.toISOString().slice(0, 10),
      hora: a.hora,
      tipo: a.tipo,
    }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 })
  }
}
