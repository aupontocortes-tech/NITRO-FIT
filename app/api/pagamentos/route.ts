import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const pagamentos = await prisma.pagamento.findMany({
      include: { aluno: true },
      orderBy: { vencimento: "desc" },
    })
    const data = pagamentos.map((p) => ({
      id: p.id,
      aluno: p.aluno.nome,
      alunoId: p.alunoId,
      valor: Number(p.valor),
      status: p.status,
      metodo: p.metodo ?? "",
      vencimento: p.vencimento.toISOString().slice(0, 10),
      pagoEm: p.pagoEm?.toISOString().slice(0, 10) ?? null,
    }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar pagamentos" }, { status: 500 })
  }
}
