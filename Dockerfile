FROM node:alpine


WORKDIR /app


COPY package.json .
COPY yarn.lock .


RUN yarn

COPY . .

EXPOSE 3000/tcp

CMD [ "yarn","start" ]