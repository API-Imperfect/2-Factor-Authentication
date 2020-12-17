FROM node:14-alpine3.10

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=admin123456

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]