# Use Node.js for building
FROM node:20-slim AS builder

WORKDIR /app

# Install build dependencies if needed
# RUN apt-get update && apt-get install -y python3 make g++

# Copy server and client package files
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN cd server && npm install
RUN cd client && npm install

# Copy source code
COPY server ./server
COPY client ./client

# Build Next.js
RUN cd client && npm run build

# Final image
FROM node:20-slim

WORKDIR /app

# Copy built assets and node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/client ./client

# Ensure the app can write to its directory if needed (for mockDB)
RUN chmod -R 777 /app/server

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

# Startup script
COPY start.sh .
RUN chmod +x start.sh

CMD ["./start.sh"]
