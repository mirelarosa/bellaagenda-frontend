# BellaAgenda — Frontend

SPA React (Vite) para clientes, profissionais e administradores do salão.

## Áreas da aplicação

| Área | Rotas | Perfil |
|------|-------|--------|
| Público | `/`, `/login`, `/cadastro` | Todos |
| Cliente | `/cliente/*` | `client` |
| Profissional | `/profissional/*` | `professional` |
| Administrador | `/admin/*` | `admin` |

Layouts distintos: área usuário (`UserLayout`) vs painel admin (`AdminLayout`).

## Configuração

```bash
cp .env.example .env
npm install
npm run dev
```

Configure `VITE_API_URL` apontando para o backend (`http://localhost:3000/api`).

## Docker Compose

Sobe o servidor de desenvolvimento Vite na porta 5173.

```bash
cp .env.example .env
npm run docker:up
```

| Comando | Descrição |
|---------|-----------|
| `npm run docker:up` | Sobe o frontend (foreground) |
| `npm run docker:up:detached` | Sobe em segundo plano |
| `npm run docker:down` | Para o container |
| `npm run docker:logs` | Acompanha logs |

Acesse **http://localhost:5173**. O `VITE_API_URL` padrão aponta para `http://localhost:3000/api` (requisições feitas pelo navegador no host; suba o backend separadamente).

Use sempre a porta **5173** (`strictPort` no Vite). Não rode Docker e `npm run dev` ao mesmo tempo — isso faz o Stripe redirecionar para outra porta e você perde a sessão do Firebase.

Configure as variáveis `VITE_FIREBASE_*` no `.env` (ou o frontend entra em modo mock e o login falha na API).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento (porta 5173) |
| `npm run build` | Build produção |
| `npm test` | Testes Vitest + MSW |
| `npm run lint` | ESLint |
| `npm run docker:up` | Sobe frontend via Docker Compose |
| `npm run docker:down` | Para container do Compose |

## Deploy (Vercel)

- Projeto separado do backend
- Root Directory: `frontend`
- Variáveis `VITE_*` no painel
- `vercel.json` com rewrite SPA

## CI

GitHub Actions em `.github/workflows/ci.yml`.
