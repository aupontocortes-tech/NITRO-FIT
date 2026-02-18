import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const planos = await prisma.plano.findMany({ orderBy: { duracaoMeses: "asc" } })
    const data = planos.map((p) => ({
      id: p.id,
      nome: p.nome,
      valor: Number(p.valor),
      duracaoMeses: p.duracaoMeses,
    }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar planos" }, { status: 500 })
  }
}
