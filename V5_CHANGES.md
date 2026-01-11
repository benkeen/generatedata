# 5.x Changes

This file tracks the changes in 5.x. I'll keep this updated as I progress.

## High-level changes

The repo was a bit of a mess architecturally. Code was being referenced all over the place - env vars were read by FE and BE code, shared code was sometimes duplicated and there was a ton of complex logic around building the app and dynamically generating files out of plugins. Basically it had grown into a bit of a ball of mud. The 4.x version did tons of great stuff, but didn't use a sane architecture.

Version 5.x is a _re-architecture only_ - I'm not changing any UI or functionality. I know - _booooring_.

The chief motivation for this major version bump that whenever I return to work on this project to complete the unfinished CLI, I find myself stymied by the lack of a formal architecture and run into problem and problem trying to create the CLI in a clean standalone format. Also, since I the simplicity of PHP / MySQL / MAMP/WAMP etc. it became far harder for devs to actually set up and use. That's a real pity. I don't think I can get around the fact that Docker is far more complex but I can at least make the on-ramp easier.

## Packages

Logical units of the code are now found under `apps` and `packages`.

**Apps**

- `apps/client` - the main client-side app.
- `apps/server` - the server-side app.

**Packages**

- `packages/cli` - this was the never-completed CLI package. Still **definitely** something I want to complete!
- `packages/core` - contains shared components for use across the client application and plugins
- `packages/cli-test` - testing for the CLI package. This might be temporary. Not sure it needs to be separate from `cli` itself.
- `packages/config` - this'll house the main configuration settings and replace the old `.env` file. For simplicity and backward compatibility, I've left the same uppercase names from the old .env variables.
- `packages/plugins` - the countries, Data Types and Export Types. Perhaps I'll split them into separate packages for each, but for now they're lumped in the same package.
- `packages/types` - global types.
- `packages/utils` - utility methods
  
## Other changes

- now uses turborepo
- moved to pnpm, uses catalogs for dependencies
- node 24
- dropped Sass/CSS modules in favour of Griffel
- dropped redux-persist since it's no longer supported
- move from `react-beautiful-dnd` (deprecated) to `@dnd-kit/core`
- react 18 (19 is still too new for some deps)
- ditch Grunt [TODO]
- greatly improved dev flow.

## Bootstrap process for new clones

(Need instructions):

- install turborepo CLI, nvm, pnpm globals
- `pnpm install` - this bootstraps the whole repo

### Note on Workers

The web worker file generation process for the plugins is vastly faster now I ditched TS in the rollup config and just target the JS
version of the plugin worker generated in the main build/tsc step. It's so fast, I ditched all the extra manual memoization stuff which
has simplifies the bilds.

For clear code organization, I want the following:

1. `plugins` package: generates DT + ET workers as part of its dist/
2. `utils` package: generates the "worker utils" worker (just a subset of all available utils)
3. `client` app package: generates the "generator utils" worker. This is only needed here. The CLI package should't need it, I don't think. If it does, down the road I'll move it somewhere sensible.

It'll be the client app's responsibility to copy all the necessary workers to its own dist folder for runtime loading on the site.
