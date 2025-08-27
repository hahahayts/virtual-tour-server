
#Uses Node.js version 22
FROM node:22 

USER node

# Create app directory
WORKDIR /home/node

#Copy app source code
COPY . .

RUN npm ci

ARG PORT

EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start"]