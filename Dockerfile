#!/bin/bash

FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN yarn install --no-lockfile

COPY . .

CMD ["yarn", "start"]
