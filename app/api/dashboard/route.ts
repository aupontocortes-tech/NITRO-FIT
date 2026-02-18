import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [alunos, pagamentos, atividades] = await Promise.all([
      prisma.aluno.findMany({ include: { plano: true } }),
      prisma.pagamento.findMany({ include: { aluno: true } }),
      prisma.atividade.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    ])

    const totalPago = pagamentos
      .filter((p) => p.status === "Pago")
      .reduce((acc, p) => acc + Number(p.valor), 0)
    const totalPendente = pagamentos
      .filter((p) => p.status === "Pendente")
      .reduce((acc, p) => acc + Number(p.valor), 0)
    const totalAtrasado = pagamentos
      .filter((p) => p.status === "Atrasado")
      .reduce((acc, p) => acc + Number(p.valor), 0)

    const inadimplentes = alunos.filter((a) => a.status === "Inadimplente")
    const ativos = alunos.filter((a) => a.status === "Ativo")

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const em30Dias = new Date(hoje)
    em30Dias.setDate(em30Dias.getDate() + 30)
    const proximosVencimentos = pagamentos
      .filter((p) => p.status === "Pendente" && p.vencimento >= hoje && p.vencimento <= em30Dias)
      .sort((a, b) => a.vencimento.getTime() - b.vencimento.getTime())
      .slice(0, 5)
      .map((p) => ({
        aluno: p.aluno.nome,
        valor: `R$ ${Number(p.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        vencimento: p.vencimento.toLocaleDateString("pt-BR"),
      }))

    const alunosParaEvolucao = ativos
      .slice(0, 5)
      .map((a) => ({ id: a.id, nome: a.nome, evolucao: a.evolucao ?? 0 }))

    const atividadesFormatadas = atividades.map((a) => ({
      tipo: a.tipo,
      descricao: a.descricao,
      tempo: formatTempo(a.createdAt),
    }))

    return NextResponse.json({
      kpis: {
        faturamentoMes: totalPago,
        receitaPrevista: totalPago + totalPendente,
        pagamentosPendentes: totalPendente,
        cobrancasPendentes: pagamentos.filter((p) => p.status === "Pendente").length,
        alunosAtivos: ativos.length,
        alunosInadimplentes: inadimplentes.length,
      },
      inadimplentes: inadimplentes.map((a) => ({
        id: a.id,
        nome: a.nome,
        plano: a.plano?.nome ?? "-",
      })),
      proximosVencimentos,
      alunosEvolucao: alunosParaEvolucao,
      atividades: atividadesFormatadas,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar dashboard" }, { status: 500 })
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
