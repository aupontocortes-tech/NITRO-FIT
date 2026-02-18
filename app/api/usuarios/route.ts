import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const usuario = await prisma.usuario.findFirst()
    if (!usuario) {
      return NextResponse.json({
        nome: "",
        email: "",
        telefone: "",
        cref: "",
        bio: "",
        avatarUrl: null,
      })
    }
    return NextResponse.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone ?? "",
      cref: usuario.cref ?? "",
      bio: usuario.bio ?? "",
      avatarUrl: usuario.avatarUrl ?? null,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 })
  }
}
