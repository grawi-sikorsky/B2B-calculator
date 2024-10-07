# Step 1: Build the Angular app
FROM node:alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app (optional --configuration=production flag for prod build)
RUN npm run build -- --prod

# Step 2: Serve the app
FROM node:16-alpine

WORKDIR /app

# Copy the built Angular files from the previous stage
COPY --from=build /app .

# Expose port 4200
EXPOSE 4200

# Run the Angular app
CMD ["npm", "start"]
