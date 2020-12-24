FROM node:14-alpine3.10

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000

# our default dev command
CMD ["npm","run","dev"]
