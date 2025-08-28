# Use Node.js LTS Alpine for smaller image
FROM node:lts-alpine

# Set working directory
WORKDIR /home/node

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the TypeScript code (outputs dist/)
RUN npm run build

# Expose backend port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start"]
