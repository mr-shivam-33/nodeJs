FROM node:16.8.0

WORKDIR /user

COPY package.json /user

# RUN npm install

RUN npm install -g npm@9.1.0

COPY . /user

CMD node server.js

EXPOSE 2023