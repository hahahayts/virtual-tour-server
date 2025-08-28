FROM node:lts-alpine

WORKDIR /home/node

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Change ownership to node user
RUN chown -R node:node /home/node
USER node

# Generate Prisma client and build the application
RUN npx prisma generate
RUN npm run build 

# Your app startup command here
CMD ["npm", "start"]