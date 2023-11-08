FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i 

COPY next.config.js ./next.config.js

COPY src/pages ./pages
COPY public ./public
COPY src/styles ./styles

CMD [ "npm","run","dev" ]