"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Dumbbell,
  CalendarDays,
  Send,
  BarChart3,
  Settings,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/alunos", label: "Alunos", icon: Users },
  { href: "/contratos", label: "Contratos", icon: FileText },
  { href: "/financeiro", label: "Financeiro", icon: DollarSign },
  { href: "/treinos", label: "Treinos", icon: Dumbbell },
  { href: "/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/cobrancas", label: "Cobrancas", icon: Send },
  { href: "/relatorios", label: "Relatorios", icon: BarChart3 },
  { href: "/configuracoes", label: "Configuracoes", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center border-r border-border bg-sidebar py-4 lg:w-56">
      <div className="mb-8 flex items-center gap-2 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Activity className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="hidden text-lg font-bold text-foreground lg:inline">FitPro</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 w-full">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </nav>
    </aside>
  )
}
