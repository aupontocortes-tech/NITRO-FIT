import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

/**
 * Cliente Prisma singleton (evita múltiplas instâncias em dev com hot reload).
 * Use nas páginas/API: import { prisma } from "@/lib/prisma"
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
