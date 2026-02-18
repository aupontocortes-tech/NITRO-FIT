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
      status: c.status,
      assinatura: c.assinatura,
    }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar contratos" }, { status: 500 })
  }
}
