#!/bin/bash
# ================================
# Bootstrap Script - Run inside container
# ================================

set -e

echo "🚀 Initializing SvelteKit project inside Docker..."

# Create data directory with correct permissions
mkdir -p /app/data
chown -R $(id -u):$(id -g) /app/data 2>/dev/null || true

# Initialize SvelteKit if not exists
if [ ! -f "package.json" ]; then
    echo "📦 Creating SvelteKit project..."
    npm create svelte@latest . -- --template skeleton --types ts --no-add-ons
    npm install
fi

# Install Drizzle and SQLite
echo "📦 Installing Drizzle ORM and SQLite dependencies..."
npm install drizzle-orm @libsql/client
npm install -D drizzle-kit

# Generate schema file if not exists
if [ ! -f "src/lib/server/db/schema.ts" ]; then
    mkdir -p src/lib/server/db
    cat > src/lib/server/db/schema.ts << 'EOF'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
EOF
fi

# Generate drizzle config
cat > drizzle.config.ts << 'EOF'
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'file:./data/app.db',
  },
});
EOF

# Push initial schema to database
echo "🗄️  Initializing database..."
mkdir -p data
npx drizzle-kit push

echo "✅ Project initialized successfully!"
echo "📁 Database will be persisted in ./data directory"
echo ""
echo "Run 'docker-compose up dev' to start development server"
