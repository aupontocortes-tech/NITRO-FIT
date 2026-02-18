# Banco de dados NITRO-FIT (Supabase + Prisma)

Todas as tabelas foram criadas no Supabase via Prisma. Este documento descreve cada uma e onde são usadas no app.

---

## Tabelas

| Tabela | Uso no app |
|--------|------------|
| **planos** | Planos de mensalidade (Mensal, Trimestral, Semestral, Anual). Usado em: Alunos (seleção de plano), Contratos, Configurações (editar valores). |
| **alunos** | Cadastro de alunos. Nome, email, telefone, CPF, plano, status, situação financeira, evolução %, próximo treino. Página: Alunos. |
| **contratos** | Contratos por aluno (data início/fim, status Ativo/Expirado, assinatura). Página: Contratos. |
| **pagamentos** | Pagamentos e cobranças (valor, status Pago/Pendente/Atrasado, método, vencimento). Página: Financeiro. |
| **cobrancas** | Histórico de cobranças enviadas (automáticas ou manuais). Página: Cobranças. |
| **treinos** | Fichas de treino por aluno (ex.: "Treino A - Superior"). Página: Treinos. |
| **exercicios** | Exercícios de cada treino (nome, séries, carga, observações). Página: Treinos. |
| **agendamentos** | Agenda semanal (data, hora, aluno, tipo: Musculação, Funcional, HIIT, etc.). Página: Agenda. |
| **configuracao_cobranca** | Configurações de cobrança automática (dias antes, tentativas, WhatsApp/Email). Página: Cobranças. |
| **usuarios** | Perfil do personal (nome, email, CREF, bio). Página: Configurações > Perfil. |
| **atividades** | Feed de atividades recentes (contrato enviado, pagamento, novo aluno, etc.). Dashboard. |

---

## Relações (resumo)

- **Aluno** → tem um **Plano** (opcional), vários **Contratos**, **Pagamentos**, **Cobranças**, **Treinos**, **Agendamentos**.
- **Contrato** → pertence a um **Aluno** e a um **Plano**.
- **Pagamento** → pertence a um **Aluno** (e opcionalmente a um **Plano**).
- **Treino** → pertence a um **Aluno**; tem vários **Exercícios**.
- **Agendamento** → pertence a um **Aluno**.

---

## Comandos úteis

```bash
npm run db:generate   # Gerar cliente Prisma após mudar o schema
npm run db:migrate    # Criar/atualizar tabelas (nova migração)
npm run db:seed       # Popular planos padrão e config (rodar 1x após migrar)
npm run db:studio     # Abrir interface visual do banco no navegador
```

---

## Row Level Security (RLS) no Supabase

O app usa **Prisma** no servidor (Next.js) com a connection string do `.env`, que conecta direto ao PostgreSQL. Se você também usar o **cliente Supabase** (anon key) no frontend para ler/escrever nas mesmas tabelas, ative **RLS** no Supabase e crie políticas.

No Supabase: **Table Editor** → selecione a tabela → **Settings** → ative **Row Level Security** e defina políticas (ex.: permitir `SELECT`, `INSERT`, `UPDATE` para o role `anon` ou para `auth.uid()` quando tiver login).

Se o app usar **apenas Prisma** (API routes ou Server Components), as requisições vêm do servidor e não passam pela anon key; nesse caso RLS é opcional para esse fluxo.

---

## Seed (dados iniciais)

Depois da primeira migração, rode **uma vez**:

```bash
npm run db:seed
```

Isso cria:

- 4 **planos**: Mensal (R$ 250), Trimestral (R$ 650), Semestral (R$ 1.200), Anual (R$ 2.200).
- 1 linha em **configuracao_cobranca** (cobrança automática ativa, 3 dias antes, 5 tentativas, etc.).
- 1 **usuário** de exemplo (Rafael Costa) para a tela de Configurações > Perfil.

Você pode editar `prisma/seed.js` para mudar valores ou adicionar mais dados iniciais.
