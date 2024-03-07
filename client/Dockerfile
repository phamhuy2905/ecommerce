FROM node:18-alpine AS frontend

WORKDIR /app/frontend-reactjs

COPY package-lock.json ./
COPY package.json ./

COPY . .

RUN npm install && npm run build


CMD [ "npm", "start" ]