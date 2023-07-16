FROM node:18.16.1-alpine3.18 AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build


FROM node:18.16.1-alpine3.18 as final
WORKDIR /app
COPY  --from=build  /app/dist /app/dist
COPY package.json .
COPY package-lock.json .

RUN npm ci --only=production
CMD [ "node","./dist/bin/www.js" ]