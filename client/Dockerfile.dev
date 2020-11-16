FROM node:12-alpine AS alpine

ENV HOME=/home/app

WORKDIR $HOME/generatedata
COPY package.json yarn.lock $HOME/generatedata/
RUN yarn install --network-timeout 100000 && npm install -g grunt-cli
COPY .. $HOME/generatedata
RUN yarn dockerBuild

CMD ["node", "app.js"]
