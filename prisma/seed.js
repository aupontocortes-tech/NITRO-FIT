const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  const planos = [
    { nome: "Mensal", valor: 250, duracaoMeses: 1 },
    { nome: "Trimestral", valor: 650, duracaoMeses: 3 },
    { nome: "Semestral", valor: 1200, duracaoMeses: 6 },
    { nome: "Anual", valor: 2200, duracaoMeses: 12 },
  ]

  for (const p of planos) {
    const existe = await prisma.plano.findFirst({ where: { nome: p.nome } })
    if (!existe) {
      await prisma.plano.create({
        data: { nome: p.nome, valor: p.valor, duracaoMeses: p.duracaoMeses },
      })
    }
  }

  const configExiste = await prisma.configuracaoCobranca.findFirst()
  if (!configExiste) {
    await prisma.configuracaoCobranca.create({
      data: {
        cobrancaAutomatica: true,
        envioWhatsApp: true,
        envioEmail: true,
        diasAntesVencimento: 3,
        tentativasAposVencimento: 5,
        intervaloEntreTentativasDias: 3,
        updatedAt: new Date(),
      },
    })
  }

  const usuarioExiste = await prisma.usuario.findFirst()
  if (!usuarioExiste) {
    await prisma.usuario.create({
      data: {
        nome: "Rafael Costa",
        email: "rafael@fitpro.com",
        telefone: "(11) 99999-0000",
        cref: "000123-G/SP",
        bio: "Personal Trainer certificado com 8 anos de experiência.",
        updatedAt: new Date(),
      },
    })
  }

  console.log("Seed concluído: planos, config cobrança e usuário padrão criados.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
