# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine-slim

# Copy the built application files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Replace the default Nginx configuration with our custom, secure version
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the non-privileged port
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]