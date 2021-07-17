FROM node:12 as base

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

CMD ["./node_modules/.bin/moleculer-runner", "-c", "dist/moleculer.config.js", "dist/webhooks/services"]