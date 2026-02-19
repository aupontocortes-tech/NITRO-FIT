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
      nome?: string
      email?: string
      telefone?: string
      cpf?: string
      planoId?: string | null
    }
    const nomeTrim = typeof nome === "string" ? nome.trim() : ""
    if (!nomeTrim) {
      return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 })
    }
    let planoIdFinal: string | null = null
    if (planoId && typeof planoId === "string" && planoId.trim()) {
      const existe = await prisma.plano.findUnique({ where: { id: planoId.trim() } })
      if (existe) {
        planoIdFinal = planoId.trim()
      }
      // se o plano não existir, salva o aluno mesmo assim com planoId null (evita perder o cadastro)
    }
    const aluno = await prisma.aluno.create({
      data: {
        nome: nomeTrim,
        email: (email && typeof email === "string" && email.trim()) ? email.trim() : null,
        telefone: (telefone && typeof telefone === "string" && telefone.trim()) ? telefone.trim() : null,
        cpf: (cpf && typeof cpf === "string" && cpf.trim()) ? cpf.trim().replace(/\D/g, "") : null,
        planoId: planoIdFinal,
        status: "Ativo",
        situacaoFinanceira: "Em dia",
        evolucao: 0,
      },
      include: { plano: true },
    })

    // Criar contrato automaticamente quando o aluno tem plano
    if (planoIdFinal) {
      const plano = await prisma.plano.findUnique({ where: { id: planoIdFinal } })
      if (plano) {
        const dataInicio = new Date()
        const dataFim = new Date(dataInicio)
        dataFim.setMonth(dataFim.getMonth() + plano.duracaoMeses)
        await prisma.contrato.create({
          data: {
            alunoId: aluno.id,
            planoId: plano.id,
            dataInicio,
            dataFim,
            status: "Ativo",
            assinatura: "Pendente",
          },
        })
      }
    }

    return NextResponse.json({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email ?? "",
      telefone: aluno.telefone ?? "",
      plano: aluno.plano?.nome ?? "-",
      planoId: aluno.planoId,
      status: aluno.status,
      situacaoFinanceira: aluno.situacaoFinanceira ?? "",
      evolucao: aluno.evolucao ?? 0,
      proximoTreino: aluno.proximoTreino ? aluno.proximoTreino.toISOString().slice(0, 10) : "-",
    })
  } catch (e) {
    console.error("POST /api/alunos error:", e)
    const msg = e instanceof Error ? e.message : "Erro ao cadastrar aluno"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
