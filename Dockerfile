# --- ЭТАП 1: СБОРКА ---
FROM node:20-alpine AS builder
WORKDIR /app

# --- ВОТ ИСПРАВЛЕНИЕ ---
# 1. Объявляем, что мы ОЖИДАЕМ build-аргумент
ARG GEMINI_API_KEY
# 2. Превращаем его в системную переменную,
#    которую "увидит" vite.config.ts
ENV GEMINI_API_KEY=$GEMINI_API_KEY
# --- КОНЕЦ ИСПРАВЛЕНИЯ ---

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# --- ЭТАП 2: РАЗДАЧА ---
FROM nginx:stable-alpine

COPY --from=builder /app/dist/. /usr/share/nginx/html/
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
