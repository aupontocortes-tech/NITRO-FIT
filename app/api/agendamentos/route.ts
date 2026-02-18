import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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
