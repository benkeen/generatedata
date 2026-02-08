## `@generatedata/i18n-core`

This package contains the translations for the core script. This is imported by the main `@generatedata/i18n` package, which
provides the complete translations - core and plugins - to the main `apps/client` package and the CLI.

### Commands

`build` - this actually doesn't build anything, but validates the localization files and throws and error when there are
problems. This ensures the package is always in a valid state for building the monorepo.
