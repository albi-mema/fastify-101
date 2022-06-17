FROM node:18.2.0

WORKDIR /home/user/fastify-101


COPY package*.json ./

RUN npm install 


COPY . .

EXPOSE 8080


CMD ["npm","start"]