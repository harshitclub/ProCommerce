# Use a multi-stage build for efficiency
FROM node:18-alpine AS builder

# Set working directory to the project root
WORKDIR /ProCommerce

# Copy frontend and backend code
COPY frontend ./frontend
COPY backend ./backend

# Install dependencies for both frontend and backend (if `package.json` exists)
# RUN ["npm", "install", "--only=dev", "--prefix", "./frontend"] && \
#     ["npm", "install", "--only=dev", "--prefix", "./backend"]

RUN ["npm", "install", "--prefix", "./frontend"] && \
    ["npm", "install", "--prefix", "./backend"] && \
    cd backend && npx prisma generate

# Build the backend (assuming `npm run build`)
RUN cd backend && npm run build

# Create a new stage for the final image (smaller)
FROM node:18-alpine

# Copy only the necessary files from the build stage
# COPY --from=builder /app/frontend/public ./public
# COPY --from=builder /app/backend/build ./backend

# Set working directory to the backend directory
WORKDIR /app/backend/build

# Expose the port for the backend
EXPOSE 2001

CMD ["npm", "run", "dev", "--prefix", "./frontend"] && \
     ["npm", "start", "--prefix", "./backend"]
