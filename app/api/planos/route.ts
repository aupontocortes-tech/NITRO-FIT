import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const PLANOS_PADRAO = [
  { nome: "Mensal", valor: 250, duracaoMeses: 1 },
  { nome: "Trimestral", valor: 650, duracaoMeses: 3 },
  { nome: "Semestral", valor: 1200, duracaoMeses: 6 },
  { nome: "Anual", valor: 2200, duracaoMeses: 12 },
]

export async function GET() {
  try {
    let planos = await prisma.plano.findMany({ orderBy: { duracaoMeses: "asc" } })
    if (planos.length === 0) {
      for (const p of PLANOS_PADRAO) {
        await prisma.plano.create({
          data: { nome: p.nome, valor: p.valor, duracaoMeses: p.duracaoMeses },
        })
      }
      planos = await prisma.plano.findMany({ orderBy: { duracaoMeses: "asc" } })
    }
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
