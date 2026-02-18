# Cursor, Prisma e Supabase — explicado e o que fazer agora

## O que é cada ferramenta

### 1. Cursor
- **O que é:** Editor de código (baseado no VS Code) com IA integrada.
- **No seu projeto:** Você usa o Cursor para escrever e editar o NITRO-FIT. A IA ajuda a gerar código, explicar arquivos e corrigir erros.
- **Resumo:** É onde você programa; não precisa “configurar” nada específico para Supabase ou Prisma.

---

### 2. Supabase
- **O que é:** Backend-as-a-Service (BaaS). Oferece:
  - **Banco PostgreSQL** na nuvem
  - **API REST e em tempo real** automáticas
  - **Auth** (login, cadastro)
  - **Storage** (arquivos)
  - **Row Level Security (RLS)** para segurança por linha
- **No seu projeto:** Você já instalou `@supabase/supabase-js` e configurou o cliente em `lib/supabase.ts` com a URL e a chave **anon** no `.env.local`.
- **Resumo:** O Supabase é o seu “servidor” e banco. O app Next.js fala com ele pela biblioteca do Supabase (não precisa de outro backend).

---

### 3. Prisma
- **O que é:** ORM (Object-Relational Mapping) para Node.js. Você define o schema das tabelas em um arquivo e o Prisma gera migrações e um cliente para acessar o banco.
- **No seu projeto:** **Você ainda não está usando Prisma.** Só tem Next.js + Supabase client.
- **Resumo:** Prisma é opcional. Com Supabase você pode:
  - **Opção A — Só Supabase:** criar tabelas direto no painel do Supabase e usar apenas o cliente Supabase no código (mais simples para começar).
  - **Opção B — Supabase + Prisma:** usar o PostgreSQL do Supabase como banco e o Prisma para schema/migrações; aí você teria Supabase (auth, realtime, RLS) + Prisma (modelos e queries tipadas). Mais configuração.

---

## Como eles se relacionam (no seu caso)

```
┌─────────────────────────────────────────────────────────────────┐
│  CURSOR (onde você edita o código)                               │
│  └── Projeto Next.js (NITRO-FIT)                                 │
│        └── lib/supabase.ts  →  Cliente Supabase                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │  HTTPS (anon key)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  SUPABASE (na nuvem)                                             │
│  └── PostgreSQL + API + Auth + Storage                           │
└─────────────────────────────────────────────────────────────────┘

Prisma: não está no projeto. Se quiser, pode ser adicionado depois para
        falar com o mesmo PostgreSQL do Supabase (connection string).
```

---

## O que fazer agora (passo a passo)

### Etapa 1 — Criar as tabelas no Supabase
1. Acesse [app.supabase.com](https://app.supabase.com) e abra o projeto **srqcojrvsgwlckuieqoq**.
2. No menu lateral: **Table Editor** → **New table**.
3. Crie pelo menos a tabela **alunos** (o app já tem página de alunos):
   - Nome da tabela: `alunos`
   - Colunas sugeridas:
     - `id` — type `uuid`, default `gen_random_uuid()`, primary key
     - `nome` — type `text`
     - `email` — type `text`
     - `telefone` — type `text` (opcional)
     - `created_at` — type `timestamptz`, default `now()`
   - Salve a tabela.

Você pode criar outras tabelas depois (treinos, cobranças, contratos, etc.) conforme for precisando.

### Etapa 2 — Ativar Row Level Security (RLS)
1. Na tabela `alunos`, abra **Settings** (ou o ícone de configuração da tabela).
2. Ative **Row Level Security (RLS)**.
3. Crie uma política para permitir leitura (e depois escrita) para o role `anon` se quiser que o app público leia. Exemplo de política (SQL no Supabase):
   - Para **SELECT**: policy que permite `anon` a fazer `SELECT` em `alunos`.
   - Quando tiver login (Supabase Auth), você restringe por `auth.uid()`.

Sem RLS, a chave anon consegue acessar tudo; com RLS, você controla quem vê o quê.

### Etapa 3 — Usar o Supabase no código (no Cursor)
1. No Cursor, abra a página que deve listar alunos: `app/(dashboard)/alunos/page.tsx`.
2. Importe o cliente: `import { supabase } from "@/lib/supabase"`.
3. Busque os dados, por exemplo em um Server Component:
   ```ts
   const { data: alunos, error } = await supabase.from("alunos").select("*")
   ```
4. Mostre `alunos` na interface (tabela, cards, etc.).

Assim você conecta a tela de alunos ao Supabase. O mesmo padrão vale para treinos, cobranças, etc.: criar tabela no Supabase → usar `supabase.from("nome_tabela")` na página.

### Etapa 4 — Rodar o app
1. No terminal (no Cursor ou fora): `npm run dev` (ou `pnpm dev`).
2. Confirme que o `.env.local` tem `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Acesse a rota da dashboard (ex.: `/alunos`) e veja se a lista vem do Supabase.

---

## Resumo rápido

| Ferramenta | Função no NITRO-FIT |
|------------|----------------------|
| **Cursor** | Editor + IA para programar o projeto. |
| **Supabase** | Banco (PostgreSQL), API e auth. Já configurado com anon key. |
| **Prisma** | Não está no projeto. Opcional; só adicione se quiser ORM e migrações. |

**Próximos passos concretos:**  
1) Criar tabela `alunos` (e outras) no Supabase.  
2) Ativar RLS e criar políticas.  
3) Em `app/(dashboard)/alunos/page.tsx` (e outras páginas), usar `supabase.from("alunos").select("*")` e exibir os dados.  
4) Rodar `npm run dev` e testar.

Se quiser, no próximo passo podemos escrever juntos o código da página de alunos (busca e exibição) ou das políticas RLS no Supabase.
