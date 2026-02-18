import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const cobrancas = await prisma.cobranca.findMany({
      include: { aluno: true },
      orderBy: { createdAt: "desc" },
    })
    const data = cobrancas.map((c) => ({
      id: c.id,
      aluno: c.aluno.nome,
      alunoId: c.alunoId,
      valor: c.valor,
      valorDecimal: c.valorDecimal ? Number(c.valorDecimal) : null,
      status: c.status,
      dataEnvio: c.dataEnvio ? c.dataEnvio.toISOString().slice(0, 10) : null,
      metodo: c.metodo ?? "",
      tentativas: c.tentativas,
    }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar cobranças" }, { status: 500 })
  }
}
