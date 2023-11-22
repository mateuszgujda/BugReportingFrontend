FROM node:20-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ARG API_URL=http://localhost:5000
ENV REACT_APP_API_URL=$API_URL
RUN npm run build

FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]