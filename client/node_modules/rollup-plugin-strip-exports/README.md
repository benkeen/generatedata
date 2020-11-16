# rollup-plugin-strip-exports

> Remove unwanted exports from your code.

[![ci status][ci-badge]][ci-link]
[![npm package][npm-badge]][npm-link]
[![license MIT][license-badge]][license]
[![commit style angular][commit-style-badge]][commit-style-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![Dependabot Status][dependabot-badge]][dependabot-link]

rollup-plugin-strip-exports is intended to remove unwanted exports from your entry file. It does not check if an export is imported by another file, the intention is to just strip exports from the entry file. The primary use-case for this is when using iife, as exports are added to the global scope and this is often not useful if you are bundling everything together, as you have no purpose for using those exports.

As of rollup version [1.26.0](https://github.com/rollup/rollup/releases/tag/v1.26.0) not providing a name for iife bundles will no longer cause an error (just a warning) and will not pollute the global scope. However this plugin is still useful for a few reasons.
1. The iife will still have the exports assign to a variable which it returns. This could cause confusion when a developer is reading the rollup output, so it is cleaner to just not export anything (in my opinion).
2. You may want to remove exports for a different reason.

## Installation
```bash
yarn add rollup-plugin-strip-exports --dev
# or
npm install rollup-plugin-strip-exports --save-dev
```

## Usage
```javascript
// rollup.config.js
import stripExports from 'rollup-plugin-strip-exports';

export default {
  input: 'source/index.js',
  output: {
    file: 'build/index.js',
    format: 'iife'
  },
  plugins: [
    stripExports({ /* options */ })
  ]
};
```

## Functionality
Function definitions or variable declerations or any other named value will be kept but the export stripped as code in the same file may use them.
However if they are not used and you have tree-shaking turned on, then they will be removed anyway.
```javascript
// input.js
export const variable = 6;

export function add(a, b) {
  return a + b;
}

console.log(add(variable, 4));
// output.js
const variable = 6;

function add(a, b) {
  return a + b;
}

console.log(add(variable, 4));
```

Exported default literals will be removed, as they serve no purpose without an export.
```javascript
// input.js
export default 'literal';
// output.js
```

## Options
None of the following options are required.

| name | description | type | default |
| --- | --- | --- | --- |
| sourceMap | Whether you are using sourceMaps or not. | `Boolean` | `true` |

---

[LICENSE][license] | [CHANGELOG][changelog] | [ISSUES][issues]

[license]: ./LICENSE
[changelog]: ./CHANGELOG.md
[issues]: https://github.com/xeroxinteractive/rollup-plugin-strip-exports/issues

[ci-badge]: https://flat.badgen.net/github/checks/xeroxinteractive/rollup-plugin-strip-exports/release?label=ci
[ci-link]: https://github.com/xeroxinteractive/rollup-plugin-strip-exports/actions?query=branch%3Arelease

[npm-badge]: https://flat.badgen.net/npm/v/rollup-plugin-strip-exports?color=cyan
[npm-link]: https://www.npmjs.com/package/rollup-plugin-strip-exports

[license-badge]: https://flat.badgen.net/npm/license/rollup-plugin-strip-exports

[commit-style-badge]: https://flat.badgen.net/badge/commit%20style/angular/purple
[commit-style-link]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines

[semantic-release-badge]: https://flat.badgen.net/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80/semantic%20release/e10079
[semantic-release-link]: https://github.com/semantic-release/semantic-release

[dependabot-badge]: https://flat.badgen.net/dependabot/xeroxinteractive/rollup-plugin-strip-exports?icon=dependabot
[dependabot-link]: https://dependabot.com
