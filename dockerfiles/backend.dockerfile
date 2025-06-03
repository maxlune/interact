FROM node:18-alpine

WORKDIR /usr/interact-backend

COPY apps/backend/package*.json ./

RUN npm install

COPY apps/backend/ ./

EXPOSE 8080

CMD ["npm", "run", "dev"]