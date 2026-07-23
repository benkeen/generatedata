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
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
- Grunt CLI (`npm install grunt-cli -g`)

### Running dev environment

- `git clone https://github.com/benkeen/generatedata.git` - this clones the repo to your local computer. On Mac, I'd
  suggest putting it in your `~` folder; I tried it in other locations but Docker ran into permissions issues.

- `nvm install`

  - assuming your have NVM installed (see above), this'll choose the right node version. If not, just choose the
    right node version specified in the `.nvmrc` file. If you're not running the correct version of node it will
    throw an error during startup.

- `corepack enable`

  - this is kind of like nvm, but we can use it for pnpm.

- `pnpm install` - bootstraps the repo

- `npm run build`

  - this is important. When starting afresh you have to have do a full build before starting the dev server. You'll only need
    to run this once.

- `npm run dev`
  - this starts the whole application, backend server, and load it in your browser. Note: at the time of writing, you may see
    a blank page. Just click refresh and the app should load.

### Publishing a new version

There isn't an automated release script yet. For now, use the manual workflow below.

1. Ensure your local repo is up to date and clean.

```bash
git checkout master
git pull origin master
git status
```

2. Use the repo's Node version.

```bash
nvm use
```

3. Update the root version in `package.json`.

- Example: `5.0.0-beta3` -> `5.0.0-beta4`

4. Add a new top entry in `CHANGELOG.md` for that version.

5. Run a quick validation pass.

```bash
npm run build
```

6. Commit the release bump.

```bash
git add package.json CHANGELOG.md
git commit -m "chore(release): cut <version>"
```

7. Create a matching git tag.

```bash
git tag <version>
```

8. Push the branch and tag.

```bash
git push origin master
git push origin <version>
```

9. Create a GitHub Release from the tag.

- Open: `https://github.com/benkeen/generatedata/releases/new`
- Tag: `<version>`
- Title: `<version>`
- Body: paste the relevant changelog notes.

Notes:

- Keep version, changelog header, commit, and tag names identical.
- If there are unrelated local changes, commit them separately before doing the release bump.

### Troubleshooting

> ERROR: for db Cannot start service db: error while creating mount source path '/host_mnt/xxx/data/db': mkdir /host_mnt/Users/xxx/data/db: no such file or directory
> ERROR: Encountered errors while bringing up the project.

Restarting Docker seemed to fix this. I did that via the UI tool.

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
