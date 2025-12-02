# ===== BUILD STAGE =====
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ===== RUN STAGE =====
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app ./

COPY .env.example ./.env

EXPOSE 4000

CMD ["node", "server.js"]