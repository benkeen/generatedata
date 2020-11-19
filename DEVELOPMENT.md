# Development

Version 4 of generatedata uses Docker to simplify packaging up the app for development and distribution. Docker
wasn't quite the wonder that I hoped it would be, but the benefits overall are undeniable.

I experimented with getting the dev environment running _entirely_ within Docker containers so you'd wouldn't require
to install anything locally, but I found it was simply too slow to be of practical use as a dev env. So instead, the 
local dev env just uses docker containers for the _server and database_; the FE code is still ran locally. I know that's
a pain for non-frontend developers especially who aren't so familiar with setting up NVM, Grunt etc., but it's a
trade-off I had to make. 

#### Pre-requisites:

- [Docker](https://docs.docker.com/get-docker/)
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) - namely node 12.
- Grunt CLI (`npm install grunt-cli -g`)

### Running dev

- `git clone https://github.com/benkeen/generatedata.git` - this clones the repo to your local computer. On Mac, I'd
suggest putting it in your `~` folder; I tried it in other locations but Docker ran into permissions issues.  
     
- `nvm install`
    - assuming your have NVM installed (see above), this'll choose the right node version. If not, just choose the 
    right node version specified in the `.nvmrc` file. 

- `yarn install` 
- `docker-compose up -d` - this boots up the server + database containers. If you find it times out (it may well the 
first time), use the command: `COMPOSE_HTTP_TIMEOUT=150 docker-compose up -d` 
- `yarn start` - this boots up the client-side code. Be warned: this does a *LOT* of stuff and the first time you run
it it'll take a very long time to run. Subsequent runs will be much faster. 


#### Shutting down dev env

`docker-compose down` - shuts down docker.

I've found that sometimes that command chokes and you have to wait a few minutes before it runs properly. Presumably
it's because the docker container was still in the process of booting up.

#### Other handy Docker commands 

TODO.







## Locale file helpers

There are a several grunt helper functions for validation and managing the locale files. It's important to keep the files
up to date so every i18n file contains the same keys and won't cause bugs when the user selects the 

#### Core localization files

These are found in `src/i18n`. They contain all the core i18n files.

- `grunt validateI18n` - general validation function to examine all the localization files and check everything in sync.
- `grunt validateI18n --key=fr` - same as above, except it only looks at a particular locale file.
- `grunt removeI18nKey --key=xxx` - where xxx is the property name.
- `grunt sortI18nFiles` - sorts the keys of all i18n files alphabetically.


### Text rules:

- titles, headings: capitalize every letter
- tooltips: sentence case, no ending period

