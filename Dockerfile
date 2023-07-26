# syntax=docker/dockerfile:1

FROM node:20 AS builder
WORKDIR /app

COPY . .
RUN yarn install && yarn build

FROM nginx:alpine AS deploy

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
