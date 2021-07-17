FROM node:12 as base

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

CMD ["node", "dist/gateway/api/server.js"]