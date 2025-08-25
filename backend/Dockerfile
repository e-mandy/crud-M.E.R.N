FROM node:22

WORKDIR /backend

COPY package*.json .

RUN npm install && npm install -g nodemon

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]