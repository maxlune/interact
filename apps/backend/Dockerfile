FROM node:18-alpine

WORKDIR /usr/interact-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
