FROM node:17-alpine

WORKDIR /apollo-vault-frontend

COPY package.json .

RUN npm install 

RUN npm install vite


COPY . .

EXPOSE 3000

CMD ["npm", "run","dev"]