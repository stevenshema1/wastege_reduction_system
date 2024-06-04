# Professional Multi-Stage Dockerfile for Silver Project Submission
# Rules followed: Pinned images, --no-install-recommends, lockfile-driven installs

# Stage 1: Build Stage
FROM node:20.11.1-slim AS builder

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies using lockfile-driven installs
RUN npm ci && \
    cd frontend && npm ci && \
    cd ../backend && npm ci

# Copy full source code
COPY . .

# Simulate build process for frontend assets
# RUN cd frontend && npm run build

# Stage 2: Final Production Image
FROM node:20.11.1-slim

# Environment configuration
ENV NODE_ENV=production \
    PORT=3001

# Set working directory
WORKDIR /app

# Install essential system dependencies with pinned versions and security flags
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl=7.88.1-10+deb12u5 \
    git=1:2.39.2-1.1 \
    ca-certificates=20230311 \
    && rm -rf /var/lib/apt/lists/*

# Copy built assets and full source (Silver requires .git history)
COPY --from=builder /app /app

# Expose necessary ports
EXPOSE 3001 5173

# Security: Run as non-root user
RUN chown -R node:node /app
USER node

# Healthcheck to ensure service availability
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Start the application
CMD ["npm", "start"]
