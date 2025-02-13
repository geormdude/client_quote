# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (switched from npm ci to npm install)
RUN npm install

# Copy source code
COPY . .

# Set up PDF.js worker
RUN mkdir -p public/pdfjs && \
    cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdfjs/

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public/pdfjs /usr/share/nginx/html/pdfjs

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 