# Deploy na Vercel — cadastro funcionando

Para o **cadastro de alunos** (e todas as outras telas que usam o banco) funcionarem no site publicado na Vercel, você **precisa configurar as variáveis de ambiente** no projeto da Vercel. Sem isso, a API não consegue conectar no Supabase e nada é salvo.

---

## 1. Abrir o projeto na Vercel

1. Acesse **[vercel.com](https://vercel.com)** e faça login.
2. Abra o projeto **NITRO-FIT** (ou o nome que você deu ao projeto).

---

## 2. Adicionar variáveis de ambiente

1. No projeto, clique em **Settings** (Configurações).
2. No menu lateral, clique em **Environment Variables** (Variáveis de ambiente).
3. Adicione **cada** variável abaixo. Use o mesmo valor que está no seu `.env` ou `.env.local` **local** (no seu computador).

### Obrigatória para o cadastro e o banco funcionarem

| Nome | Valor | Onde achar |
|------|--------|------------|
| **DATABASE_URL** | `postgresql://postgres:SUA_SENHA@db.srqcojrvsgwlckuieqoq.supabase.co:5432/postgres` | No seu arquivo **`.env`** (troque SUA_SENHA pela senha real do banco do Supabase). |

- **Environment:** marque **Production**, **Preview** e **Development** (ou pelo menos **Production**).
- Clique em **Save**.

### Recomendadas (para o app usar Supabase no frontend, se precisar)

| Nome | Valor |
|------|--------|
| **NEXT_PUBLIC_SUPABASE_URL** | A URL do projeto no Supabase (ex.: `https://srqcojrvsgwlckuieqoq.supabase.co`) |
| **NEXT_PUBLIC_SUPABASE_ANON_KEY** | A chave **anon (public)** do Supabase (começa com `eyJ...`) |

Você encontra essas duas em: Supabase → **Project Settings** → **API**.

---

## 3. Fazer um novo deploy

Depois de salvar as variáveis:

1. Vá em **Deployments**.
2. No último deploy, clique nos **três pontinhos** → **Redeploy** (Redeploy).
3. Marque **Use existing Build Cache** como desmarcado (opcional, para garantir build limpo) e confirme.

Ou faça um novo push no GitHub: a Vercel vai fazer o deploy de novo **usando as variáveis que você acabou de configurar**.

---

## 4. Testar o cadastro

1. Abra o site na Vercel (ex.: `https://seu-projeto.vercel.app`).
2. Vá em **Alunos** → **Novo aluno**.
3. Preencha o nome e cadastre.
4. O aluno deve aparecer na lista e continuar lá após recarregar a página.

Se ainda não salvar, confira no Vercel: **Deployments** → clique no deploy → **Functions** → veja os logs da função que atende `/api/alunos` para checar erros de conexão com o banco.

---

## Resumo

- **Problema:** cadastro não salva na Vercel.  
- **Causa:** falta da variável **DATABASE_URL** (e/ou Prisma client não gerado no build).  
- **Solução:** configurar **DATABASE_URL** (e as outras acima, se usar) em **Settings → Environment Variables** e fazer um **novo deploy**.
