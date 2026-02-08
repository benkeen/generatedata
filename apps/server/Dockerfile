FROM --platform=linux/amd64 node:24-slim AS builder

ENV HOME=/home/app/generatedata
ENV NODE_OPTIONS="--max-old-space-size=4096"
# Disable corepack auto-install to prevent pnpm from trying to reinstall itself
ENV COREPACK_ENABLE_AUTO_PIN=0

WORKDIR $HOME

# Enable corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml $HOME/
COPY ./apps/server/package.json $HOME/apps/server/
COPY ./packages/ $HOME/packages

# Install dependencies with frozen lockfile (no resolution needed)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the rest of the server code
COPY ./apps/server $HOME/apps/server/

RUN cd $HOME/apps/server && ls -al

WORKDIR $HOME/apps/server
CMD ["npm", "run", "startNodeDevServer"]
