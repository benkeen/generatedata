FROM --platform=linux/amd64 node:24 AS alpine

ENV HOME=/home/app/generatedata

WORKDIR $HOME
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml $HOME/
COPY ./apps/server $HOME/apps/server/
COPY ./packages/ $HOME/packages
RUN npm install -g pnpm@9
RUN npm install -g grunt-cli
RUN cd $HOME && pnpm install --fetch-timeout 1000000 
RUN cd $HOME/apps/server && ls -al

WORKDIR $HOME/apps/server
CMD ["npm", "run", "startNodeDevServer"]
