FROM node:14.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

ENTRYPOINT [ "node" ]

# CMD [ "start" ]