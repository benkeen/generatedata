/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  rootDir: '../',
  transform: {
    '.+.tsx?$': ['ts-jest', {}]
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+test.ts?(x)'],
  testPathIgnorePatterns: ['/.*.d.ts$', '/dist/']

  //   "moduleFileExtensions": [
  //   "ts",
  //   "tsx",
  //   "js"
  // ],
  // "testEnvironment": "jsdom",
  // "transform": {
  //   "node_modules/nanoid/index.js$": "ts-jest",
  //   "node_modules/@react-hook/throttle/dist/module/index.js$": "ts-jest",
  //   "\\.(ts|tsx)$": "ts-jest"
  // },
  // "transformIgnorePatterns": [
  //   "node_modules/(?!nanoid)/.*",
  //   "node_modules/@react-hook/throttle/dist/module/.*"
  // ],
  // "setupFilesAfterEnv": [
  //   "<rootDir>/client/tests/jestSetup.ts"
  // ],
  // "testRegex": "/__tests__/.*\\.(ts|tsx)$",
  // "moduleNameMapper": {
  //   "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  //   "^~components(.*)$": "<rootDir>/client/src/components$1",
  //   "^~types(.*)$": "<rootDir>/client/types$1",
  //   "^~utils(.*)$": "<rootDir>/client/src/utils$1",
  //   "^~store(.*)$": "<rootDir>/client/src/core/store$1",
  //   "^~core(.*)$": "<rootDir>/client/src/core$1"
  // },
  // "collectCoverageFrom": [
  //   "<rootDir>/client/src/**/*.(ts|tsx)"
  // ],
  // "coveragePathIgnorePatterns": [
  //   "bundle.ts",
  //   ".*.scss.d.ts",
  //   ".*.types.d.ts"
  // ],
  // "modulePathIgnorePatterns": [
  //   "<rootDir>/cli/dist"
  // ]
};
