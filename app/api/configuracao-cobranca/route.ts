import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const config = await prisma.configuracaoCobranca.findFirst()
    if (!config) {
      return NextResponse.json({
        cobrancaAutomatica: true,
        envioWhatsApp: true,
        envioEmail: true,
        diasAntesVencimento: 3,
        tentativasAposVencimento: 5,
        intervaloEntreTentativasDias: 3,
      })
    }
    return NextResponse.json({
      id: config.id,
      cobrancaAutomatica: config.cobrancaAutomatica,
      envioWhatsApp: config.envioWhatsApp,
      envioEmail: config.envioEmail,
      diasAntesVencimento: config.diasAntesVencimento,
      tentativasAposVencimento: config.tentativasAposVencimento,
      intervaloEntreTentativasDias: config.intervaloEntreTentativasDias,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar configuração" }, { status: 500 })
  }
}
