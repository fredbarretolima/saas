# SaaS Fullstack Template

Template SaaS otimizado para VPS de baixo custo com SvelteKit + Drizzle ORM + SQLite.

## Stack Técnica

| Componente | Tecnologia |
|------------|------------|
| Framework | SvelteKit |
| ORM | Drizzle ORM |
| Database | SQLite (libsql) |
| Container | Docker Multi-stage |
| Adapter | @sveltejs/adapter-node |

## Quick Start

```bash
# Clone o repositório
git clone https://github.com/fredbarretolima/saas.git
cd saas

# Suba o container de desenvolvimento
docker-compose up dev

# Acesse
http://localhost:5173
```

## Comandos Docker

```bash
# Desenvolvimento
docker-compose up dev

# Ver logs
docker-compose logs -f dev

# Rebuild
docker-compose build --no-cache dev

# Parar
docker-compose down
```

## Estrutura do Projeto

```
├── src/
│   ├── routes/
│   │   ├── admin/          # Painel Admin
│   │   │   ├── +layout.svelte
│   │   │   ├── +page.svelte      # Dashboard
│   │   │   ├── users/           # Gerenciamento de usuários
│   │   │   └── settings/        # Configurações
│   │   └── +page.svelte        # Landing page
│   └── lib/server/db/      # Schema Drizzle
├── Dockerfile             # Produção (multi-stage)
├── Dockerfile.dev         # Desenvolvimento
├── docker-compose.yml     # Orquestração
└── drizzle.config.ts      # Configuração ORM
```

## Database

```bash
# Gerar migrations
docker-compose exec dev npx drizzle-kit generate

# Aplicar mudanças
docker-compose exec dev npx drizzle-kit push

# Abrir Drizzle Studio
docker-compose exec dev npx drizzle-kit studio
```

## Produção

```bash
# Build imagem
docker build -t saas-prod .

# Run
docker run -p 3000:3000 -v ./data:/app/data saas-prod
```

## Variáveis de Ambiente

```env
DATABASE_URL=file:./data/app.db
NODE_ENV=production
PORT=3000
```

## Features

- Dashboard administrativo estilo AdminLTE
- Sidebar responsivo com navegação
- Página de gerenciamento de usuários
- Configurações com tabs (General, Security, Notifications, Appearance)
- Gráficos e tabelas de dados
- SQLite persistente via Docker volume
- Build otimizado (~200MB imagem final)
