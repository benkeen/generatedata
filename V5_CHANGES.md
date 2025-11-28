# 5.x Changes

This file tracks the changes in 5.x. I'll keep this updated as I progress.

## High-level changes

The repo was a bit of a mess architecturally. Code was being referenced all over the place - env vars were read by FE and BE code, shared code was sometimes duplicated and there was a ton of complex logic around building the app and dynamically generating files out of plugins and so on and so forth. Basically it had grown into a bit of a ball of mud. The 4.x version did tons of great stuff, but didn't really choose a sane architecture.

Version 5.x is devoted to a _re-architecture only_ - I'm not changing any UI or functionality. I know - _booooring_. The biggest change is that **I'm converted to a standard monorepo using [Turborepo](https://turborepo.com/)**. I haven't used it much before but it seems like a usable and sensible tool. There won't be any fundamental changes to any of the technologies beyond various version updates. It'll still use Docker (sigh, I hate Docker), React, Redux, TS etc. but the structure of the code will be quite different.

The chief motivation for this major version bump that whenever I return to work on this project to complete the unfinished CLI, I find myself stymied by the lack of a formal architecture and run into problem and problem trying to create the CLI in a clean standalone format. Also, since I the simplicity of PHP / MySQL / MAMP/WAMP etc. it became far harder for devs to actually set up and use. That's a real pity. I don't think I can get around the fact that Docker is far more complex but I can at least make the on-ramp easier.

## Packages

Logical units of the code are now going to be split into standard _npm packages_, found under `apps` and `packages`.

**Apps**

- `apps/client` - the main client-side app.
- `apps/server` - the server-side app. I'd LOVE to actually convert this to TS and not continue to use plain wild-west JS, but I don't want to bloat the work, so will probably punt on it until a later version. We'll see.

**Packages**

- `packages/cli` - this was the never-completed CLI package. Still **definitely** something I want to complete!
- `packages/components` - contains shared components for use across the client application and plugins
- `packages/cli-test` - testing for the CLI package. This might be temporary. Not sure it needs to be separate from `cli` itself.
- `packages/config` - this'll house the main configuration settings and replace the old `.env` file. For simplicity and backward compatibility, I've left the same uppercase names from the old .env variables.
- `packages/plugins` - the countries, Data Types and Export Types. Perhaps I'll split them into separate packages for each, but for now they're lumped in the same package.
- `packages/types` - global types.

## Other changes

- moved to pnpm
- dropped Sass/CSS modules in favour of Griffel

## Bootstrap process for new clones

(Need instructions):

- install turborepo CLI, nvm, pnpm globals
- `pnpm install` - this bootstraps the whole repo
