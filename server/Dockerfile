# Użyj obrazu Node jako bazy
FROM node:18

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json ./
RUN npm install

# Skopiuj resztę aplikacji
COPY . .

# Skopiowanie pliku seed.ts
COPY ./seed.ts ./seed.ts

# Kompilacja TypeScript
RUN npm run build

# Expose port (jeśli Twoja aplikacja nasłuchuje na porcie)
EXPOSE 5000

# Uruchom aplikację
CMD ["node", "dist/app.js"]
