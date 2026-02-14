"use client"

import { Bell, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar alunos, treinos..."
            className="w-64 bg-secondary pl-9 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Novo aluno</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Cadastrar novo aluno</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Nome do aluno" className="bg-secondary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" className="bg-secondary" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" className="bg-secondary" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan">Plano</Label>
                <Select>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mensal">Mensal - R$ 250,00</SelectItem>
                    <SelectItem value="trimestral">Trimestral - R$ 650,00</SelectItem>
                    <SelectItem value="semestral">Semestral - R$ 1.200,00</SelectItem>
                    <SelectItem value="anual">Anual - R$ 2.200,00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-2 w-full">Cadastrar aluno</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-primary text-primary-foreground">
            3
          </Badge>
          <span className="sr-only">Notificacoes</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-secondary transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
                  RC
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium text-foreground">Rafael Costa</p>
                <p className="text-xs text-muted-foreground">Personal Trainer</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuracoes</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
