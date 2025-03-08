# Giai đoạn 1: Build ứng dụng Vite
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:18 AS serve
WORKDIR /app
COPY --from=builder /app/dist ./dist

RUN npm install -g serve
CMD ["npm", "run", "serve"]
EXPOSE 3000
