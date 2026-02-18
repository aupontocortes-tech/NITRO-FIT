import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const alunos = await prisma.aluno.findMany({
      include: { plano: true },
      orderBy: { nome: "asc" },
    })
    const data = alunos.map((a) => ({
      id: a.id,
      nome: a.nome,
      email: a.email ?? "",
      telefone: a.telefone ?? "",
      cpf: a.cpf ?? "",
      plano: a.plano?.nome ?? "-",
      planoId: a.planoId,
      status: a.status,
      situacaoFinanceira: a.situacaoFinanceira ?? "",
      evolucao: a.evolucao ?? 0,
      proximoTreino: a.proximoTreino ? a.proximoTreino.toISOString().slice(0, 10) : "-",
      createdAt: a.createdAt.toISOString(),
    }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar alunos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, email, telefone, cpf, planoId } = body as {
      nome: string
      email?: string
      telefone?: string
      cpf?: string
      planoId?: string
    }
    if (!nome?.trim()) {
      return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 })
    }
    const aluno = await prisma.aluno.create({
      data: {
        nome: nome.trim(),
        email: email?.trim() || null,
        telefone: telefone?.trim() || null,
        cpf: cpf?.trim() || null,
        planoId: planoId || null,
        status: "Ativo",
        situacaoFinanceira: "Em dia",
        evolucao: 0,
      },
      include: { plano: true },
    })
    return NextResponse.json({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email ?? "",
      telefone: aluno.telefone ?? "",
      plano: aluno.plano?.nome ?? "-",
      status: aluno.status,
      situacaoFinanceira: aluno.situacaoFinanceira ?? "",
      evolucao: aluno.evolucao ?? 0,
      proximoTreino: aluno.proximoTreino ? aluno.proximoTreino.toISOString().slice(0, 10) : "-",
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao cadastrar aluno" }, { status: 500 })
  }
}
