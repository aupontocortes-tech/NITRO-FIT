import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const contratos = await prisma.contrato.findMany({
      include: { aluno: true, plano: true },
      orderBy: { dataInicio: "desc" },
    })
    const data = contratos.map((c) => ({
      id: c.id,
      aluno: c.aluno.nome,
      alunoId: c.alunoId,
      plano: c.plano.nome,
      planoId: c.planoId,
      dataInicio: c.dataInicio.toISOString().slice(0, 10),
      dataFim: c.dataFim.toISOString().slice(0, 10),
      dataNascimento: c.aluno.dataNascimento ? c.aluno.dataNascimento.toISOString().slice(0, 10) : null,
      status: c.status,
      situacaoFinanceira: c.aluno.situacaoFinanceira ?? "Em dia",
      assinatura: c.assinatura,
    }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar contratos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { alunoId, planoId, dataInicio: dataInicioStr, dataFim: dataFimStr } = body as {
      alunoId?: string
      planoId?: string
      dataInicio?: string
      dataFim?: string
    }
    if (!alunoId || !planoId) {
      return NextResponse.json(
        { error: "alunoId e planoId são obrigatórios" },
        { status: 400 }
      )
    }
    const aluno = await prisma.aluno.findUnique({ where: { id: alunoId } })
    const plano = await prisma.plano.findUnique({ where: { id: planoId } })
    if (!aluno) {
      return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 })
    }
    if (!plano) {
      return NextResponse.json({ error: "Plano não encontrado" }, { status: 404 })
    }
    const dataInicio = dataInicioStr
      ? new Date(dataInicioStr)
      : new Date()
    let dataFim: Date
    if (dataFimStr) {
      dataFim = new Date(dataFimStr)
    } else {
      dataFim = new Date(dataInicio)
      dataFim.setMonth(dataFim.getMonth() + plano.duracaoMeses)
    }
    const contrato = await prisma.contrato.create({
      data: {
        alunoId,
        planoId,
        dataInicio,
        dataFim,
        status: "Ativo",
        assinatura: "Pendente",
      },
      include: { aluno: true, plano: true },
    })
    return NextResponse.json({
      id: contrato.id,
      aluno: contrato.aluno.nome,
      alunoId: contrato.alunoId,
      plano: contrato.plano.nome,
      planoId: contrato.planoId,
      dataInicio: contrato.dataInicio.toISOString().slice(0, 10),
      dataFim: contrato.dataFim.toISOString().slice(0, 10),
      dataNascimento: contrato.aluno.dataNascimento
        ? contrato.aluno.dataNascimento.toISOString().slice(0, 10)
        : null,
      status: contrato.status,
      situacaoFinanceira: contrato.aluno.situacaoFinanceira ?? "Em dia",
      assinatura: contrato.assinatura,
    })
  } catch (e) {
    console.error("POST /api/contratos error:", e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro ao criar contrato" },
      { status: 500 }
    )
  }
}
