#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/b2b-calculator /usr/share/nginx/html
# COPY /b2b.nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 8100
