# --- ЭТАП 1: СБОРКА ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# --- ЭТАП 2: РАЗДАЧА ---
FROM nginx:stable-alpine

# Копируем "собранные" файлы из папки /app/dist ЭТАПА 1
COPY --from=builder /app/dist/. /usr/share/nginx/html/

# Настраиваем Nginx
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
