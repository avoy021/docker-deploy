FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .

RUN npm build

CMD ["npm","run","dev"]

