FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# 7. Chạy NestJS trên port 3001
CMD ["npm", "run", "start"]
