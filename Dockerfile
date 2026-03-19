# ================================
# PRODUCTION DOCKERFILE
# Multi-stage: Build → Runtime
# ================================

# ================================
# BUILDER STAGE
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ git

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Generate Prisma/Drizzle client if needed
# RUN npx prisma generate

# Build SvelteKit
RUN npm run build

# ================================
# RUNTIME STAGE (Minimal Alpine)
# ================================
FROM node:20-alpine AS runtime

# Install production dependencies only
RUN apk add --no-cache sqlite-libs

# Create non-root user
ARG UID=1000
ARG GID=1000

RUN addgroup -g ${GID} appgroup && \
    adduser -D -u ${UID} -G appgroup -g "App User" appuser

WORKDIR /app

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy built assets
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Copy static files if any
COPY --from=builder /app/static ./static

# Create directory for SQLite database
RUN mkdir -p /app/data && chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start production server
CMD ["node", "build"]
