FROM node:18-alpine 

WORKDIR /app/backend-nodejs

COPY package-lock.json ./
COPY package.json ./

COPY . .

RUN npm install


CMD [ "npm", "start" ]