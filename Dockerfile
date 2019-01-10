FROM node:10

WORKDIR /usr/src/app

COPY package*json ./

RUN npm install

COPY . .

EXPOSE 8008

RUN npm run build

CMD ["npm", "start"]