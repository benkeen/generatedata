FROM --platform=linux/amd64 node:24 AS alpine

ENV HOME=/home/app/generatedata

WORKDIR $HOME
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml $HOME/
COPY ./apps/server $HOME/apps/server/
COPY ./packages/ $HOME/packages
# COPY ./apps/server/package.json $HOME/apps/server
# COPY ./packages/i18n $HOME/packages/i18n
# COPY ./packages/types $HOME/packages/types
# COPY ./packages/utils $HOME/packages/utils
RUN npm install -g pnpm@9
RUN npm install -g grunt-cli
RUN cd $HOME && pnpm install --fetch-timeout 1000000 
RUN cd $HOME/apps/server && ls -al
# COPY ./apps/server/node_modules $HOME/apps/server/node_modules

# RUN npm uninstall bcrypt
# RUN npm install bcrypt

CMD ["npm", "run", "startNodeDevServer"]
