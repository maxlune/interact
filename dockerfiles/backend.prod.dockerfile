FROM node:18-alpine AS builder

WORKDIR /app

COPY apps/backend/package*.json ./

RUN npm ci

COPY apps/backend/ ./

RUN npx tsc --project tsconfig.prod.json

FROM node:18-alpine AS production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S interact -u 1001 -G nodejs

WORKDIR /usr/interact-backend

COPY --chown=interact:nodejs apps/backend/package*.json ./

RUN npm ci && npm cache clean --force

COPY --from=builder --chown=interact:nodejs /app/dist ./dist
COPY --from=builder --chown=interact:nodejs /app/src ./src

USER interact

EXPOSE 8080

CMD ["npm", "start"]