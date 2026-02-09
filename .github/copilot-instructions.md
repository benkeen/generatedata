# Copilot Instructions for generatedata

## Node Version

Before running any commands (tests, builds, installs, etc.), ensure you're using the correct Node.js version:

1. Run `nvm use` to select the version defined in the monorepo's `.nvmrc` file
2. If the version is not installed, run `nvm install` first, then `nvm use`

## Running Tests

This is a pnpm monorepo. To run tests:

1. **Navigate to the package directory first** (e.g., `apps/client`, `packages/utils`, etc.)
2. Run `npm run test` to execute all tests in that package
3. To run a specific test file, use: `npm run test -- [filename]`
   - Example: `npm run test -- ErrorBoundary` to run tests matching "ErrorBoundary"

**Important:** Do not try to run tests from the monorepo root or use `pnpm --filter`. Always `cd` into the specific package directory first.
