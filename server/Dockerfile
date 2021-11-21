FROM node:14-alpine AS alpine

ENV HOME=/home/app/generatedata

WORKDIR $HOME
COPY package.json yarn.lock $HOME/
RUN yarn install --network-timeout 100000 && npm install -g grunt-cli
COPY ./server $HOME/server/

CMD ["yarn", "startNodeDevServer"]
