FROM node:14.18-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY server ./server
COPY web ./web

RUN yarn install
COPY . .
CMD ["npm", "start"]
EXPOSE 3003