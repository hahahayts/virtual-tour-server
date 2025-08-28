FROM node:lts-alpine

WORKDIR /home/node

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Change ownership to node user and generate Prisma client
RUN chown -R node:node /home/node
USER node
RUN npx prisma generate

# Your app startup command here
CMD ["npm", "start"]