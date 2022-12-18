FROM node:12.22.11-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci -qy

COPY . .

EXPOSE 4001

CMD ["npm", "start"]
