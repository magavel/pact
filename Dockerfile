FROM node:12-alpine AS builder
RUN apk update && apk upgrade
RUN apk add git
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM httpd:2.4
COPY --from=builder /usr/src/app/dist/ /usr/local/apache2/htdocs