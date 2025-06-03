FROM node:18-alpine

WORKDIR /usr/interact-frontend

COPY apps/frontend/package*.json ./

RUN npm install

COPY apps/frontend/ ./

EXPOSE 5173

CMD ["npm", "run", "dev"]