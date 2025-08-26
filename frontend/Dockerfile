FROM node:22 AS builder

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:22

WORKDIR /frontend

COPY package.json .

RUN npm install 

COPY --from=builder /frontend/dist ./dist

EXPOSE 4173

CMD ["npm", "run", "preview"]