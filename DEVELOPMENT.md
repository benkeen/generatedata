# Development

Version 4 of generatedata uses Docker to simplify packaging up the app for development and distribution. Docker
wasn't quite the wonder that I hoped it would be, but the benefits overall are undeniable.

My goals with the dev environment was the following:
- require as little setup as possible
- require as few steps as possible to start and stop the dev environment
- make it reasonably performant with hot reloading.

Frankly, given the complexity of the app it's a tough thing to simplify. I experimented with getting the dev 
environment running entirely within a Docker container so you'd need less stuff locally to make it run. I _did_ get 
that running okay, but found it was simply too slow to be of practical use as a dev env. So instead, the local dev env 
just uses a docker container for the _server and database_. The FE code is ran locally. I know that's a pain for
non-frontend developers especially who aren't so familiar with setting up NVM, Grunt etc. - sorry about that! 

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
- `yarn start` - This is where the action happens. This does a LOT of stuff and the first time you run it it'll take a
looooong time to run. Subsequent runs will be much faster, but webpack is still very slow. 
  - runs various grunt tasks
  - builds every separate web worker bundle file
  - builds every plugin bundle
  - runs webpack watcher for the main sxriot 
  - starts the docker containers for the node API and DB


#### Shutting down dev env

Still early days, so this can be improved but right now you need to manually shut down docker:

`docker-compose down`

I've found that sometimes that command chokes and you have to wait a few minutes before it runs properly. Presumably
it's because the docker container was still in the process of booting up. 







### Locale file helpers

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

