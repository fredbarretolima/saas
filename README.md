# SaaS Fullstack Template

Template SaaS otimizado para VPS de baixo custo com SvelteKit + Drizzle ORM + SQLite.

## Stack Técnica

| Componente | Tecnologia |
|------------|------------|
| Framework | SvelteKit 5 (Svelte 5 Runes) |
| ORM | Drizzle ORM |
| Database | SQLite (libsql/Turso) |
| Container | Docker Multi-stage |
| Adapter | @sveltejs/adapter-node |
| Auth | Cookie-based sessions + bcrypt |
| i18n | date-fns + custom i18n store |

## Quick Start

```bash
# Clone o repositório
git clone https://github.com/fredbarretolima/saas.git
cd saas

# Suba o container de desenvolvimento
docker-compose up -d dev

# Acesse
http://localhost:5173
```

## Comandos Docker

```bash
# Desenvolvimento
docker-compose up -d dev

# Ver logs
docker-compose logs -f dev

# Rebuild
docker-compose build --no-cache dev

# Parar
docker-compose down
```

## Database

```bash
# Aplicar migrations
docker exec saas_dev npx drizzle-kit push --force

# Abrir Drizzle Studio (porta 4983)
docker exec saas_dev npx drizzle-kit studio --port 4983
```

## Autenticação

O sistema de autenticação está implementado com:

- **Registro**: `/register` - Criação de conta com validação
- **Login**: `/login` - Login com email/senha
- **Logout**: POST `/logout` - Encerra sessão
- **Sessions**: Cookies seguros com expiração de 7 dias
- **Proteção de rotas**: `/admin/*` requer autenticação

**Usuário padrão:**
- Email: `admin@example.com`
- Senha: `password123`

## i18n - Traduções

Idiomas suportados:
- 🇺🇸 English (en)
- 🇪🇸 Español (es)
- 🇧🇷 Português (BR) (pt)

O seletor de idioma está disponível em todas as páginas no canto superior direito.

## Estrutura do Projeto

```
src/
├── routes/
│   ├── (auth)/           # Rotas públicas
│   │   ├── login/         # Página de login
│   │   ├── register/     # Página de registro
│   │   └── logout/       # Endpoint de logout
│   ├── admin/            # Painel Admin (protegido)
│   │   ├── +layout.svelte      # Layout com sidebar
│   │   ├── +page.svelte        # Dashboard
│   │   ├── users/             # Gerenciamento de usuários
│   │   └── settings/          # Configurações
│   ├── api/              # API REST
│   │   └── users/       # CRUD de usuários
│   ├── +page.svelte      # Landing page
│   └── +error.svelte    # Página 404
├── lib/
│   ├── i18n/             # Sistema de traduções
│   │   ├── locales/      # Arquivos de idioma
│   │   └── dates.ts      # Formatação de datas
│   └── server/
│       ├── auth/        # Utilitários de autenticação
│       └── db/          # Schema Drizzle
└── hooks.server.ts       # Middleware de sessão
```

## API Routes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/users` | Lista todos os usuários |
| GET | `/api/users/[id]` | Retorna usuário específico |
| PUT | `/api/users/[id]` | Atualiza usuário |
| DELETE | `/api/users/[id]` | Remove usuário |

## Features

- **Autenticação completa**: Login, registro, logout com sessões
- **Gerenciamento de usuários**: CRUD com modal de edição
- **Dashboard administrativo**: Stats, gráficos, tabelas
- **Configurações**: Tabs (General, Security, Notifications, Appearance)
- **i18n**: Traduções em 3 idiomas com formatação de datas
- **Docker-ready**: Desenvolvimento e produção com Docker
- **SQLite persistente**: Dados salvos em volume Docker
- **Build otimizado**: ~200MB imagem final

## Produção

```bash
# Build imagem
docker-compose build prod

# Run
docker-compose up -d prod
# Acessa em http://localhost:3000
```

## Variáveis de Ambiente

```env
DATABASE_URL=file:./data/app.db
NODE_ENV=production
PORT=3000
```

## Database Schema

```typescript
// Users
users: {
  id: text (primary key)
  email: text (unique)
  passwordHash: text
  name: text
  createdAt: timestamp
  updatedAt: timestamp
}

// Sessions
sessions: {
  id: text (primary key)
  userId: text (references users.id)
  expiresAt: timestamp
  createdAt: timestamp
}
```
