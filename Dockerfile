# Etapa 1: Instalar dependências
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Etapa 2: Buildar a aplicação
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa 3: Rodar a aplicação em produção
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
# Se você usar um banco de dados ou outras variáveis de ambiente, defina-as aqui
# ENV DATABASE_URL="sua_url_do_banco_de_dados"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expor a porta que o Next.js usa (padrão é 3000)
EXPOSE 3001
ENV PORT 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]