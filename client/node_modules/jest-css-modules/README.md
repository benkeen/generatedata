> Note: As of v2.0.0, this library is simply implementing [identity-obj-proxy](https://github.com/keyz/identity-obj-proxy).
> The [Jest documentation](https://jestjs.io/docs/en/webpack.html#mocking-css-modules) provides more details on using identity-obj-proxy to solve this problem directly, and I recommend that you use that library instead of this one.

# Jest CSS Modules
A [Jest](https://facebook.github.io/jest/) [script processor](https://facebook.github.io/jest/docs/en/configuration.html#transform-object-string-string) that prevents [CSS module](https://github.com/css-modules/css-modules) parse errors.

## Installation

```shell
npm install -D jest-css-modules
```

Update your package.json file's `jest` configuration:

```json
{
  "jest": {
    "moduleNameMapper": {
      "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
    }
  }
}
```

Now, imports such as `import styles from './MyModule.css';` will pass through Jest without causing any pain.

Supports `.css`, `.less`, `.scss`, `.sss`, and `.styl` extensions.

> Note: If you continue to experience CSS module parsing errors after installing and configuring this library, try running jest with the `--no-cache` flag. Read the [Jest documentation on caching](https://jestjs.io/docs/en/cli#cache) for more details.
