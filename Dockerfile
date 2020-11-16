# Currently: just trying to get the whole app to load within the browser, but from a container.

# TODO try node:12-alpine, or
# FROM alpine:3.12
FROM node:12

#ENV NPM_CONFIG_LOGLEVEL warn
ENV HOME=/home/app

WORKDIR $HOME/generatedata

COPY package.json yarn.lock $HOME/generatedata/

## grouping on a single line means less memory usage
RUN yarn install --network-timeout 100000 && npm install -g grunt-cli

COPY . $HOME/generatedata
# hazy on this... difference between `dc up -d` and `dc build` ? when running the latter it freezes here so should
# this command be inside the docker-compose file?
RUN yarn docker

EXPOSE 8080
