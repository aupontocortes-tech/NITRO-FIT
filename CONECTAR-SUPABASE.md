# Como conectar o NITRO-FIT ao Supabase

## 1. Criar projeto no Supabase

1. Acesse **[app.supabase.com](https://app.supabase.com)** e faça login.
2. Clique em **New Project**.
3. Preencha:
   - **Name**: ex. `nitro-fit`
   - **Database Password**: crie uma senha forte e guarde.
   - **Region**: escolha a mais próxima (ex. South America (São Paulo)).
4. Clique em **Create new project** e aguarde alguns minutos.

## 2. Pegar a URL e a chave (API)

1. No menu lateral, vá em **Project Settings** (ícone de engrenagem).
2. Clique em **API**.
3. Copie:
   - **Project URL** (ex. `https://xxxxx.supabase.co`)
   - **Project API keys** → **anon** **public** (a chave longa que começa com `eyJ...`).

## 3. Configurar no seu app

1. Na raiz do projeto, crie o arquivo **`.env.local`** (se ainda não existir).
2. Adicione (trocando pelos seus valores):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Reinicie o servidor de desenvolvimento (`npm run dev`).

## 4. Usar no código

O cliente já está em `lib/supabase.ts`. Exemplo de uso:

```ts
import { supabase } from "@/lib/supabase"

// Buscar alunos
const { data, error } = await supabase.from("alunos").select("*")

// Inserir
await supabase.from("alunos").insert({ nome: "João", email: "joao@email.com" })
```

## 5. Prisma — quem monta as tabelas

O projeto usa **Prisma** para definir e criar as tabelas no PostgreSQL do Supabase.

1. **Configurar a conexão:** no arquivo **`.env`** (na raiz), defina `DATABASE_URL` com a senha do banco:
   - No Supabase: **Project Settings** → **Database** → **Connection string** → **URI**
   - Ou use: `postgresql://postgres:SUA_SENHA@db.srqcojrvsgwlckuieqoq.supabase.co:5432/postgres`
2. **Criar as tabelas:** no terminal, rode:
   ```bash
   npm run db:migrate
   ```
   O Prisma vai criar a tabela `alunos` (e outras que estiverem em `prisma/schema.prisma`).
3. **Usar no código:** importe o cliente e use os modelos:
   ```ts
   import { prisma } from "@/lib/prisma"
   const alunos = await prisma.aluno.findMany()
   ```

Comandos úteis: `npm run db:generate` (gerar cliente), `npm run db:studio` (abrir interface do banco).

---

**Segurança:** Não commite `.env` nem `.env.local` (já estão no `.gitignore`). O `.env.example` é só modelo, sem senhas.
