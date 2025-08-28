# Uses Node.js version 22
FROM node:lts-alpine

USER node

# Create app directory
WORKDIR /home/node

# Copy package.json and lock first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy app source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]
