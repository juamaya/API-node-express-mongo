# Multi-stage Dockerfile para desarrollo y producción

# Etapa base
FROM node:18-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./

# Etapa de desarrollo
FROM base as development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Etapa de producción
FROM base as production
RUN npm ci --only=production && npm cache clean --force
COPY . .

  
EXPOSE 3000
CMD ["node", "server.js"]
