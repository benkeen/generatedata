# Development

Version 4 of generatedata uses Docker to simplify packaging up the app for development and distribution. Docker
wasn't quite the wonder that I hoped it would be, but the benefits overall are undeniable.

I experimented with getting the dev environment running _entirely_ within Docker containers so you wouldn't require
to install anything locally, but I found it was simply too slow to be of practical use as a dev env. So instead, the
local dev env just uses docker containers for the _server and database_; the FE code is still ran locally. I know that's
a pain for non-frontend developers especially who aren't so familiar with setting up NVM, Grunt etc., but it's a
trade-off I had to make.

#### Pre-requisites:

- [Docker](https://docs.docker.com/get-docker/)
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) - namely node 12.
- Grunt CLI (`npm install grunt-cli -g`)

### Running dev environment

TODO: clarify this. `turbo build` then `npm run dev` in the root should run the dev env. Running a _local_ environment
without needing to alter the code would mean Docker.

- `git clone https://github.com/benkeen/generatedata.git` - this clones the repo to your local computer. On Mac, I'd
  suggest putting it in your `~` folder; I tried it in other locations but Docker ran into permissions issues.

- `nvm install`

  - assuming your have NVM installed (see above), this'll choose the right node version. If not, just choose the
    right node version specified in the `.nvmrc` file. If you're not running the correct version of node it will
    throw an error during startup.

- `pnpm install`

[TODO]

- After starting Docker, in one tab run: `npm run startAndBuildDevServer` - this boots up the server + database containers.
  For subsequent runs you can just use `npm run startDevServer` and it'll be faster.
- In a second tab, `npm run start` - this boots up the client-side code. Be warned: this does a _LOT_ of stuff and the
  first time you run it it'll take a very long time to run.

After running the second command it should open up `http://localhost:9000` in your browser.

#### Shutting down dev env

`npm run stopDevServer` - shuts down docker.

I've found that sometimes that command chokes and you have to wait a few minutes before it runs properly. Presumably
it's because the docker container was still in the process of booting up. If there are still problems, you might want to just run
`npm run dockerCleanup`. I do this on the live server every time I update it. It completely clears everything out so you
can start from scratch. It WON'T, however, delete your

### Troubleshooting

> ERROR: for db Cannot start service db: error while creating mount source path '/host_mnt/xxx/data/db': mkdir /host_mnt/Users/xxx/data/db: no such file or directory
> ERROR: Encountered errors while bringing up the project.

Restarting Docker seemed to fix this. I did that via the UI tool.

## Locale file helpers

There are a several grunt helper functions for validation and managing the locale files. It's important to keep the files
up to date so every i18n file contains the same keys and won't cause bugs when the user selects the language.

#### Core localization files

These are found in `src/i18n`. They contain all the core i18n files.

- `grunt validateI18n` - general validation function to examine all the localization files and check everything in sync.
- `grunt validateI18n --key=fr` - same as above, except it only looks at a particular locale file.
- `grunt removeI18nKey --key=xxx` - where xxx is the property name.
- `grunt sortI18nFiles` - sorts the keys of all i18n files alphabetically.

### Text rules:

- titles, headings: capitalize every letter
- tooltips: sentence case, no ending period

### Building

Local dev, general steps:

- `npm run start` - builds and rubs the client-side code
- `npm run startDevServer` - starts the dev server

### Common problems

#### Logging in with Google works but logs out when page is refreshed

If you find that after logging in with Google it gets lost after refreshing the page, check your system clock. The
OAuth2Client lib we're using uses the system clock when re-validating the google auth info. My own computer locally
(an 2017 Mac) when I leave it on for too long the time gets very out of whack, causing this problem. Restarting the
computer (which restarts the clock) fixes it.

#### M1 mac

After upgrading to Ventura, I found I had problems running Docker.

To fix it I enabled "Use Rosetta for x86/amd64 emulation on Apple Silicon" in Docker Desktop and added a
`export DOCKER_DEFAULT_PLATFORM=linux/amd64` env variable, then wiped out all existing docker containers and started afresh.
