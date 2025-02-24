FROM node:20-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ARG API_URL=https://backend.bugs-drago.net
ARG APP_NAME="Winter Survival"
ENV REACT_APP_API_URL=$API_URL
ENV REACT_APP_APP_NAME=$APP_NAME
RUN npm run build

FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]