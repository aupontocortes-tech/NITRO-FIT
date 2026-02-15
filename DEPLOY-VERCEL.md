# Como colocar o NITRO-FIT na Vercel

O app já está pronto para deploy. Siga estes passos:

## 1. Subir o código no GitHub

Se ainda não fez:

```bash
git add .
git commit -m "App pronto para Vercel"
git push origin main
```

## 2. Conectar na Vercel

1. Acesse **[vercel.com](https://vercel.com)** e entre na sua conta (ou crie uma com GitHub).
2. Clique em **"Add New..."** → **"Project"**.
3. **Import** o repositório do GitHub (ex: `nitro-fit/NITRO-FIT`).
4. A Vercel vai detectar que é um projeto **Next.js** e preencher:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (ou deixar em branco)
   - **Output Directory:** `.next` (deixe padrão)
   - **Install Command:** `npm install`
5. Clique em **Deploy**.

## 3. Depois do deploy

- A Vercel vai dar uma URL tipo: `https://seu-projeto.vercel.app`.
- Cada **push** na branch que você conectou (ex: `main`) gera um novo deploy automático.

## Variáveis de ambiente (se precisar depois)

Se no futuro você usar API keys, banco de dados, etc.:

1. No projeto na Vercel: **Settings** → **Environment Variables**.
2. Adicione as variáveis (ex: `DATABASE_URL`, `NEXT_PUBLIC_API_URL`).
3. Faça um novo deploy para aplicar.

## Comando pela linha de comando (opcional)

Se tiver a Vercel CLI instalada:

```bash
npm i -g vercel
vercel
```

Siga as perguntas (linkar conta, projeto, etc.) e o deploy será feito a partir da pasta do projeto.

---

## Plano grátis: por que o app pode “cair” e o que fizemos

No **plano grátis (Hobby)** da Vercel:

- As páginas estáticas (como as do NITRO-FIT) são servidas pela CDN e **não “dormem”**.
- O que pode acontecer é **rede lenta**, **timeout no navegador** ou **erro de JavaScript** em algum momento, e aí a tela parece “cair” ou travar.

Para deixar o app **mais estável e agradável** no plano grátis, fizemos o seguinte no código:

1. **Telas de carregamento**  
   Enquanto o dashboard carrega, aparece um esqueleto (skeleton) em vez de tela em branco.

2. **Telas de erro**  
   Se der algum erro, aparece a mensagem “Algo deu errado” com um botão **“Tentar novamente”** ou **“Recarregar página”**, em vez de a tela quebrar sem explicação.

3. **Gráficos carregados sob demanda**  
   Os gráficos (Recharts) são carregados depois que a página principal já abriu. Assim o primeiro carregamento fica mais leve e menos sujeito a travar em conexões lentas.

**Dicas para o plano grátis:**

- Evite muitas **Serverless Functions** ou **API Routes** pesadas; no grátis há limite de tempo de execução e de uso.
- Este app usa **dados mock** (em `lib/mock-data.ts`). Quando conectar um banco ou API real, prefira buscar dados no **cliente** ou usar **Edge** para manter o app rápido e dentro do grátis.

---

**Resumo:** Coloque o código no GitHub → Vercel → Import do repositório → Deploy. O app está funcional, com loading, tratamento de erro e carregamento otimizado para o plano grátis.
