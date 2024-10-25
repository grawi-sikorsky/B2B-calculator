# #stage 1
# FROM node:latest as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# #stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/b2b-calculator /usr/share/nginx/html
# # COPY /b2b.nginx.conf /etc/nginx/conf.d/nginx.conf

# EXPOSE 8100


# Stage 1: Build the Angular application
FROM node:16 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --output-path=dist/b2b-calculator

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy the build output to NGINX’s default public directory
COPY --from=build /app/dist/b2b-calculator /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
