# Guia completo — do zero (para quem não é desenvolvedor)

Este guia explica **cada passo** para conectar o projeto NITRO-FIT ao Supabase e ao Prisma: onde clicar, o que copiar e onde colar. Siga na ordem.

---

## O que você vai fazer (resumo)

1. Entrar no site do Supabase e abrir seu projeto.
2. Pegar ou criar a **senha do banco de dados** e anotar.
3. Preencher o arquivo **`.env`** no projeto com essa senha.
4. Pegar a **URL do projeto** e a **chave anon** no Supabase.
5. Preencher o arquivo **`.env.local`** no projeto.
6. Rodar um comando no terminal para criar as tabelas.

Não precisa saber programar: só seguir os passos.

---

# PARTE A — Abrir o Supabase e seu projeto

## Passo A1 — Abrir o site do Supabase

1. Abra o **navegador** (Chrome, Edge, etc.).
2. Na barra de endereço, digite: **https://app.supabase.com**
3. Aperte **Enter**.
4. Se aparecer uma tela de **login**, entre com o e-mail e a senha da sua conta Supabase.
5. Depois de entrar, você deve ver a **lista de projetos** (ou o painel do Supabase).

## Passo A2 — Abrir o seu projeto

1. Na tela inicial do Supabase, procure o **projeto** que você usa para o NITRO-FIT (o nome pode ser algo como "nitro-fit" ou o nome que você deu).
2. **Clique** no nome do projeto para entrar nele.
3. Você deve ver o menu lateral esquerdo (com opções como **Table Editor**, **SQL Editor**, **Project Settings**, etc.).  
   — Se não vir, clique no ícone de **menu** (três risquinhos) no canto superior esquerdo para abrir.

Quando estiver **dentro do projeto**, siga para a Parte B.

---

# PARTE B — Senha do banco de dados

O “banco de dados” é onde o Supabase guarda os dados (alunos, treinos, etc.). Para o Prisma conectar, ele precisa de uma **senha**. Essa senha é a que **você definiu quando criou o projeto** no Supabase (não é a senha do seu login no site).

## Passo B1 — Ir nas configurações do projeto

1. No **menu lateral esquerdo**, role até o final (se precisar).
2. Clique no ícone de **engrenagem** (⚙️) com o texto **Project Settings**.
3. Na página que abrir, no menu da **esquerda** da própria tela de configurações, clique em **Database**.

## Passo B2 — Ver a parte da senha

1. Na tela **Database**, role a página para baixo.
2. Procure a seção que fala em **Database password** (ou “Senha do banco”).
3. **Importante:** o Supabase **não mostra** a senha que você já definiu. Só é possível **criar uma nova** (reset).

## Passo B3 — Se você NÃO lembra da senha (criar uma nova)

1. Na seção **Database password**, procure o botão **Reset database password** (ou “Redefinir senha do banco”).
2. Clique nele.
3. O site vai pedir uma **senha nova**. Crie uma senha e **anote em um lugar seguro** (bloco de notas, papel).
   - Use letras, números e, se quiser, símbolos (ex.: `MinhaSenha2024!`).
   - **Não use** apenas coisas muito óbvias como `123456`.
4. Confirme a senha (digite de novo onde pedir) e salve.
5. **Guarde essa senha:** você vai colar ela no arquivo `.env` no próximo passo.

## Passo B4 — Se você LEMBRA da senha

1. Use essa mesma senha no próximo passo, quando for preencher o arquivo `.env`.
2. Anote em um bloco de notas temporário se quiser (só para copiar e colar no `.env`).

Quando tiver a **senha anotada** (nova ou a que você já sabia), siga para a Parte C.

---

# PARTE C — Preencher o arquivo `.env` (senha do Prisma)

O arquivo **`.env`** fica na **pasta raiz** do seu projeto (a mesma pasta onde está o `package.json`). Nele você coloca a **senha do banco** para o Prisma conseguir conectar.

## Passo C1 — Abrir o projeto no Cursor

1. Abra o **Cursor** (o programa onde você edita o projeto).
2. Abra a **pasta do projeto**: **File** → **Open Folder** (ou **Arquivo** → **Abrir Pasta**).
3. Selecione a pasta **NITRO-FIT** (a pasta principal do projeto) e clique em **Abrir** (ou **Select Folder**).

## Passo C2 — Abrir o arquivo `.env`

1. Na **barra lateral esquerda** do Cursor, você vê a lista de pastas e arquivos do projeto.
2. Procure o arquivo chamado **`.env`** (o nome começa com ponto).
   - Ele fica no **nível mais alto** do projeto, junto com `package.json`, pasta `app`, pasta `prisma`, etc.
3. **Clique duas vezes** em **`.env`** para abrir o arquivo.
4. O conteúdo deve aparecer no centro da tela (à direita).

## Passo C3 — O que você deve ver no `.env`

Algo parecido com isto:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA_DO_BANCO@db.srqcojrvsgwlckuieqoq.supabase.co:5432/postgres"
```

A única coisa que você vai mudar é: **trocar o texto `SUA_SENHA_DO_BANCO` pela senha real** (a que você anotou na Parte B).

## Passo C4 — Fazer a troca

1. No arquivo `.env`, localize o trecho **SUA_SENHA_DO_BANCO**.
2. **Selecione** só essa parte (clique e arraste com o mouse, ou clique duas vezes na palavra).
3. **Apague** o texto `SUA_SENHA_DO_BANCO`.
4. **Digite** (ou **cole**) a **senha do banco** que você anotou.
   - Não apague as aspas `"` nem o resto da linha.
   - Exemplo: se sua senha for `MinhaSenha2024!`, a linha deve ficar:
     ```env
     DATABASE_URL="postgresql://postgres:MinhaSenha2024!@db.srqcojrvsgwlckuieqoq.supabase.co:5432/postgres"
     ```
5. Aperte **Ctrl + S** (ou **Cmd + S** no Mac) para **salvar** o arquivo.

**Se sua senha tiver caracteres como `#` ou `@`**, pode dar erro. Nesse caso, no Supabase use **Reset database password** e crie uma senha **só com letras e números** (ex.: `MinhaSenha2024`).

Quando o `.env` estiver salvo com a senha certa, siga para a Parte D.

---

# PARTE D — Pegar a URL do projeto e a chave “anon” no Supabase

O Next.js (o app do NITRO-FIT) precisa de duas coisas do Supabase: a **URL do projeto** e a **chave anon** (uma chave longa que começa com `eyJ...`). Ambas você coloca no arquivo **`.env.local`**.

## Passo D1 — Ir na página de API do Supabase

1. No **Supabase**, com o **seu projeto** aberto, clique de novo em **Project Settings** (engrenagem no menu lateral).
2. No menu **à esquerda** da tela de configurações, clique em **API** (não em Database).

## Passo D2 — Copiar a “Project URL”

1. Na página **API**, no topo, procure a seção **Project URL** (ou “URL do projeto”).
2. Ao lado há uma caixa com um endereço que parece com: `https://xxxxx.supabase.co`.
3. Clique no **ícone de copiar** (dois quadradinhos) ao lado desse endereço para copiar a URL.
4. **Cole** em um bloco de notas e guarde; você vai colar no `.env.local` no próximo passo.

## Passo D3 — Copiar a chave “anon (public)”

1. Na mesma página **API**, role para baixo.
2. Procure a seção **Project API keys** (ou “Chaves de API do projeto”).
3. Procure a chave chamada **anon** com a etiqueta **public**.
4. Ao lado dela há uma chave **muito longa** que começa com **eyJ**.
5. Clique no **ícone de copiar** ao lado dessa chave para copiá-la.
6. **Cole** no bloco de notas e guarde; você vai colar no `.env.local` no próximo passo.

Quando tiver **as duas** (URL e chave anon) copiadas, siga para a Parte E.

---

# PARTE E — Preencher o arquivo `.env.local`

O arquivo **`.env.local`** também fica na **pasta raiz** do projeto (mesma pasta do `.env`). Nele você coloca a URL e a chave anon que acabou de copiar.

## Passo E1 — Abrir o `.env.local` no Cursor

1. No Cursor, na **barra lateral esquerda**, procure o arquivo **`.env.local`** (no mesmo nível do `.env`).
2. Se **não existir**, crie: clique com o botão direito na área da pasta raiz → **New File** (Novo arquivo) → digite o nome: **`.env.local`** e aperte Enter.
3. **Clique duas vezes** em **`.env.local`** para abrir.

## Passo E2 — Colar a URL e a chave

O arquivo deve ter **duas linhas** (ou você pode colar por cima do que já existir). Use **exatamente** o formato abaixo, trocando só onde indicado:

**Linha 1 — URL do projeto**  
- Cole a **URL** que você copiou no Passo D2 no lugar de `COLE_AQUI_A_URL`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=COLE_AQUI_A_URL
  ```
  Exemplo (o seu será parecido, mas com outro endereço):
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://srqcojrvsgwlckuieqoq.supabase.co
  ```
  **Não** coloque espaço antes nem depois do `=` e **não** use aspas.

**Linha 2 — Chave anon**  
- Cole a **chave anon** que você copiou no Passo D3 no lugar de `COLE_AQUI_A_CHAVE_ANON`:
  ```env
  NEXT_PUBLIC_SUPABASE_ANON_KEY=COLE_AQUI_A_CHAVE_ANON
  ```
  Exemplo (a sua chave será longa e diferente):
  ```env
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
  ```
  **Não** coloque espaço antes nem depois do `=` e **não** use aspas.

O arquivo pode ficar assim (com seus valores reais):

```env
NEXT_PUBLIC_SUPABASE_URL=https://srqcojrvsgwlckuieqoq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycWNvanJ2c2d3bGNrdWllcW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODU1MDQsImV4cCI6MjA4Njg2MTUwNH0.FI_jpTos4e_Dh-YlEFlyFvuQ1a6Tw9GpvjCke-Ie8EQ
```

## Passo E3 — Salvar

1. Aperte **Ctrl + S** (ou **Cmd + S** no Mac) para salvar o `.env.local`.

Quando os dois arquivos (`.env` e `.env.local`) estiverem preenchidos e salvos, siga para a Parte F.

---

# PARTE F — Criar as tabelas no banco (rodar o Prisma)

O **Prisma** é a ferramenta que “monta” as tabelas (como a de alunos) no banco do Supabase. Para isso, você só precisa rodar **um comando** no terminal do Cursor.

## Passo F1 — Abrir o terminal no Cursor

1. No Cursor, no **menu superior**, clique em **Terminal** (ou **View** → **Terminal**).
2. Ou use o atalho: **Ctrl + '** (Ctrl + aspas) ou **Ctrl + J** para abrir o painel inferior.
3. Deve aparecer uma **janela preta ou escura** embaixo (o terminal), com um texto tipo `C:\...\NITRO-FIT>` ou parecido. Isso indica que você está na pasta certa do projeto.

## Passo F2 — Rodar o comando de migração

1. No terminal, **digite** exatamente (ou copie e cole):
   ```bash
   npm run db:migrate
   ```
2. Aperte **Enter**.
3. Pode demorar alguns segundos. O Prisma pode pedir um **nome para a migração** (ex.: `init`). Se pedir, digite **init** e aperte **Enter**.
4. Se tudo der certo, deve aparecer uma mensagem indicando que a migração foi aplicada e que a tabela (por exemplo `alunos`) foi criada.
5. Se aparecer **erro de conexão**, volte à Parte C e confira se a **senha** no `.env` está correta (e se não tem espaço a mais no início ou no fim).

## Passo F3 — Conferir no Supabase (opcional)

1. No **Supabase**, no menu lateral, clique em **Table Editor**.
2. Você deve ver a tabela **alunos** na lista. Clique nela para ver as colunas (`id`, `nome`, `email`, `telefone`, `created_at`).

Quando a migração rodar sem erro, a configuração está concluída.

---

# Resumo do que você fez

| Onde | O que você colocou |
|------|---------------------|
| **Supabase → Project Settings → Database** | Você viu ou criou a **senha do banco** e anotou. |
| **Arquivo `.env`** | A linha `DATABASE_URL=...` com a **senha do banco** no lugar de `SUA_SENHA_DO_BANCO`. |
| **Supabase → Project Settings → API** | Você copiou a **Project URL** e a chave **anon (public)**. |
| **Arquivo `.env.local`** | As duas linhas: `NEXT_PUBLIC_SUPABASE_URL=...` e `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`. |
| **Terminal** | O comando `npm run db:migrate` para criar as tabelas. |

---

# Dúvidas comuns

**Onde fica a pasta “raiz” do projeto?**  
É a pasta que contém `package.json`, as pastas `app`, `prisma`, `lib` e os arquivos `.env` e `.env.local`. No Cursor, é a pasta que você abriu com “Open Folder”.

**Esqueci a senha do banco.**  
Siga de novo a **Parte B**, Passo B3: use **Reset database password** no Supabase e anote a nova senha. Depois atualize o `.env` (Parte C) com essa nova senha.

**O terminal diz que não encontrou o comando `npm`.**  
Você precisa ter o **Node.js** instalado no computador. Baixe em https://nodejs.org (versão LTS), instale e abra o Cursor de novo; depois tente `npm run db:migrate` outra vez.

**Não acho o arquivo `.env`.**  
Arquivos que começam com ponto às vezes ficam ocultos. No Cursor, use **Ctrl + P** (ou Cmd + P), digite **.env** e abra o arquivo que aparecer na raiz do projeto.

Se algo não funcionar, diga em qual **Parte** e **Passo** você parou e qual mensagem de erro apareceu (pode copiar e colar aqui).
