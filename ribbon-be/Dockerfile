FROM node:16.13.1

RUN mkdir -p /usr/src/app/
RUN mkdir -p /usr/src/app/ribbon-be

WORKDIR /usr/src/app/ribbon-be

COPY package*.json ./

RUN npm install -g npm@8.1.2 && npm install
RUN npm install

COPY . . 

EXPOSE 5000

CMD [ "npm", "start"]