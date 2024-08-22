# Użyj obrazu Node jako bazy
FROM node:18

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json ./
RUN npm install

# Skopiuj resztę aplikacji
COPY . .

# Zbuduj aplikację
RUN npm run build

# Expose port (jeśli Twoja aplikacja nasłuchuje na porcie)
EXPOSE 3000

# Uruchom aplikację
CMD ["npm", "start"]
