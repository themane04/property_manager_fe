# Use an official Node.js image to build the app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# --- Production Image ---
FROM nginx:alpine

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build output
COPY --from=build /app/dist /usr/share/nginx/html

# 👉 Copy your custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]