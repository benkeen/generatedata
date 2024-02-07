FROM --platform=linux/amd64 node:18 AS alpine

ENV HOME=/home/app/generatedata

WORKDIR $HOME
COPY package.json yarn.lock $HOME/
RUN yarn install --network-timeout 1000000 && npm install -g grunt-cli
COPY ./server $HOME/server/

CMD ["yarn", "startNodeDevServer"]
