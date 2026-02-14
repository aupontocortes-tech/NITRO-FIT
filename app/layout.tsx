import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'FitPro - Gestao de Alunos',
  description: 'Sistema SaaS para gestao de alunos de personal trainer',
}

export const viewport: Viewport = {
  themeColor: '#0f1729',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
