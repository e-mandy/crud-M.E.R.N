FROM node:22

WORKDIR /frontend

COPY package.json .

RUN npm install && npm install -g serve

COPY . .

RUN npm run build

CMD ["serve", "-s", "dist", "-l", "4173"]