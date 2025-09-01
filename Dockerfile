# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application
# Use a lightweight Nginx image
FROM nginx:alpine-slim

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration
# This is optional but recommended for custom routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]