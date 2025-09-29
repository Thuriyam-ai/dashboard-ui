# -------- Stage 1: Build --------
FROM node:22.14.0-alpine AS builder

# Install dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build and export static site
RUN npm run build:prod

# -------- Stage 2: Serve --------
FROM node:22.14.0-alpine AS runner
WORKDIR /app

# Install a simple static file server
RUN npm install -g serve

# Copy only the exported static build from builder
COPY --from=builder /app/out ./out

ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Run static site server
CMD ["serve", "-s", "out", "-l", "3000"]
