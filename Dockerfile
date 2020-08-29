FROM node:latest AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run tsc

EXPOSE 3000
CMD ["node", "out/server.js"]
