FROM node:16.13.1

RUN mkdir -p /usr/src/app/
RUN mkdir -p /usr/src/app/ribbon-fe

WORKDIR /usr/src/app/ribbon-fe

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]