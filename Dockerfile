# syntax=docker/dockerfile:1

FROM node:20 AS builder
WORKDIR /app

COPY ./.yarn ./.yarn
COPY ./.pnp.cjs ./.pnp.loader.mjs ./.yarnrc.yml ./package.json ./yarn.lock ./
RUN yarn

COPY ./public/ ./public/
COPY ./src/ ./src/
COPY ./.browserslistrc ./.eslintrc.js ./index.html ./tsconfig.json ./tsconfig.node.json ./tsconfig.node.json ./vite.config.ts ./
RUN yarn build

FROM nginx:alpine AS deploy

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
