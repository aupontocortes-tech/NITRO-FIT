"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, Bell, Shield, CreditCard, Palette } from "lucide-react"

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuracoes</h1>
        <p className="text-sm text-muted-foreground">Gerencie as configuracoes da sua conta</p>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList className="bg-secondary">
          <TabsTrigger value="perfil" className="gap-1.5 text-xs">
            <User className="h-3.5 w-3.5" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-1.5 text-xs">
            <Bell className="h-3.5 w-3.5" />
            Notificacoes
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-1.5 text-xs">
            <Shield className="h-3.5 w-3.5" />
            Seguranca
          </TabsTrigger>
          <TabsTrigger value="planos" className="gap-1.5 text-xs">
            <CreditCard className="h-3.5 w-3.5" />
            Planos
          </TabsTrigger>
          <TabsTrigger value="aparencia" className="gap-1.5 text-xs">
            <Palette className="h-3.5 w-3.5" />
            Aparencia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Informacoes pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/20 text-primary text-lg font-bold">
                    RC
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Selecione uma imagem (max 2MB)")}>Alterar foto</Button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG. Maximo 2MB</p>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome completo</Label>
                  <Input defaultValue="Rafael Costa" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="rafael@fitpro.com" type="email" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="(11) 99999-0000" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label>CREF</Label>
                  <Input defaultValue="000123-G/SP" className="bg-secondary" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  defaultValue="Personal Trainer certificado com 8 anos de experiencia. Especialista em emagrecimento e hipertrofia."
                  className="bg-secondary resize-none"
                  rows={3}
                />
              </div>

              <Button onClick={() => toast.success("Alteracoes salvas!")}>Salvar alteracoes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Preferencias de notificacao</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Novos pagamentos</p>
                    <p className="text-xs text-muted-foreground">Notificar quando um pagamento for confirmado</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Vencimentos proximos</p>
                    <p className="text-xs text-muted-foreground">Alertar sobre cobrancas a vencer</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Inadimplencia</p>
                    <p className="text-xs text-muted-foreground">Alertar sobre atrasos de pagamento</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Novos contratos</p>
                    <p className="text-xs text-muted-foreground">Notificar sobre assinaturas de contrato</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email semanal</p>
                    <p className="text-xs text-muted-foreground">Resumo semanal por email</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Button onClick={() => toast.success("Preferencias de notificacao salvas!")}>Salvar preferencias</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Seguranca da conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Senha atual</Label>
                  <Input type="password" className="bg-secondary" />
                </div>
                <div />
                <div className="space-y-2">
                  <Label>Nova senha</Label>
                  <Input type="password" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label>Confirmar nova senha</Label>
                  <Input type="password" className="bg-secondary" />
                </div>
              </div>

              <Button onClick={() => toast.success("Senha alterada com sucesso!")}>Alterar senha</Button>

              <Separator className="bg-border" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Autenticacao em dois fatores</p>
                  <p className="text-xs text-muted-foreground">Adicione uma camada extra de seguranca</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planos" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Configuracao de planos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { nome: "Mensal", valor: "250,00", duracao: "1 mes" },
                { nome: "Trimestral", valor: "650,00", duracao: "3 meses" },
                { nome: "Semestral", valor: "1.200,00", duracao: "6 meses" },
                { nome: "Anual", valor: "2.200,00", duracao: "12 meses" },
              ].map((plano, idx) => (
                <div key={idx} className="flex flex-col gap-3 rounded-lg bg-secondary p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{plano.nome}</p>
                    <p className="text-xs text-muted-foreground">Duracao: {plano.duracao}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-foreground">R$ {plano.valor}</p>
                    <Button variant="outline" size="sm" onClick={() => toast.info(`Editar plano ${plano.nome}`)}>Editar</Button>
                  </div>
                </div>
              ))}
              <Button className="mt-2" onClick={() => toast.success("Novo plano adicionado!")}>Adicionar plano</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aparencia" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Aparencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select defaultValue="dark">
                  <SelectTrigger className="w-48 bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Idioma</Label>
                <Select defaultValue="pt-BR">
                  <SelectTrigger className="w-48 bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Portugues (BR)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Espanol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => toast.success("Preferencias de aparencia salvas!")}>Salvar preferencias</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
