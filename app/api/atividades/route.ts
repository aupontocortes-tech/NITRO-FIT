import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const atividades = await prisma.atividade.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    })
    const data = atividades.map((a) => ({
      id: a.id,
      tipo: a.tipo,
      descricao: a.descricao,
      tempo: formatTempo(a.createdAt),
      createdAt: a.createdAt.toISOString(),
    }))
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar atividades" }, { status: 500 })
  }
}

function formatTempo(date: Date) {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMin / 60)
  const diffD = Math.floor(diffH / 24)
  if (diffMin < 1) return "Agora"
  if (diffMin < 60) return `${diffMin} min atrás`
  if (diffH < 24) return `${diffH}h atrás`
  if (diffD === 1) return "1 dia atrás"
  return `${diffD} dias atrás`
}
