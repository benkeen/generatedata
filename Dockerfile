# Currently: just trying to get the whole app to load within the browser, but from a container.

# TODO try node:12-alpine, or
# FROM alpine:3.12
FROM node:12

ENV HOME=/home/app

WORKDIR $HOME/generatedata

COPY package.json yarn.lock $HOME/generatedata/

RUN yarn install --network-timeout 100000 && npm install -g grunt-cli

COPY . $HOME/generatedata

RUN yarn docker

CMD ["node", "app.js"]
