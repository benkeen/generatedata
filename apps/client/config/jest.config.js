/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '../',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '.+.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.json',
        isolatedModules: true
      }
    ],
    '.+.jsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.json',
        isolatedModules: true
      }
    ]
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+test.ts?(x)'],
  testPathIgnorePatterns: ['/.*.d.ts$', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/tests/jestSetup.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@generatedata|react-select|creatable-select|@react-hook|@testing-library|nanoid|@griffel|@uidotdev)/)'
  ],
  moduleNameMapper: {
    '^@generatedata/utils/array$': '<rootDir>/../../packages/utils/src/array.ts',
    '^@generatedata/utils/date$': '<rootDir>/../../packages/utils/src/date.ts',
    '^@generatedata/utils/extension$': '<rootDir>/../../packages/utils/src/extension.tsx',
    '^@generatedata/utils/general$': '<rootDir>/../../packages/utils/src/general.ts',
    '^@generatedata/utils/lang$': '<rootDir>/../../packages/utils/src/lang.ts',
    '^@generatedata/utils/number$': '<rootDir>/../../packages/utils/src/number.ts',
    '^@generatedata/utils/random$': '<rootDir>/../../packages/utils/src/random.ts',
    '^@generatedata/utils/string$': '<rootDir>/../../packages/utils/src/string.ts',
    '^@generatedata/utils/worker$': '<rootDir>/../../packages/utils/src/worker.ts',
    '^@generatedata/utils$': '<rootDir>/../../packages/utils/src/index.ts',
    '^@generatedata/plugins/workerPluginsFileMap$': '<rootDir>/../../packages/plugins/dist/workers/workerPluginsFileMap.js',
    '^@generatedata/plugins/dist/(.+)$': '<rootDir>/../../packages/plugins/dist/$1',
    '^@generatedata/plugins/(.+)$': '<rootDir>/../../packages/plugins/src/$1.ts',
    '^@generatedata/plugins$': '<rootDir>/../../packages/plugins/src/index.ts',
    '^@generatedata/i18n$': '<rootDir>/../../packages/i18n/locales/en.json',
    '^@generatedata/shared$': '<rootDir>/../../packages/shared/dist/index.js',
    '^@generatedata/shared/(.+)$': '<rootDir>/../../packages/shared/dist/$1.js',
    '^@generatedata/config/constants$': '<rootDir>/../../packages/config/dist/cjs/constants.js',
    '^@generatedata/config/clientConfig$': '<rootDir>/../../packages/config/dist/cjs/client.config.js',
    '^@generatedata/config/(.+)$': '<rootDir>/../../packages/config/dist/cjs/$1.js',
    '^sinon$': '<rootDir>/../../node_modules/.pnpm/sinon@21.0.0/node_modules/sinon/lib/sinon.js',
    '^@react-hook/throttle$':
      '<rootDir>/../../node_modules/.pnpm/@react-hook+throttle@2.2.0_react@18.3.1/node_modules/@react-hook/throttle/dist/umd/use-throttle.js',
    '^nanoid$': '<rootDir>/../../node_modules/.pnpm/nanoid@3.3.8/node_modules/nanoid/index.cjs',
    '^~store(.*)$': '<rootDir>/src/store$1',
    '^~core(.*)$': '<rootDir>/src/core$1',
    '^~utils(.*)$': '<rootDir>/src/utils$1',
    '^~types(.*)$': '<rootDir>/types$1',
    '^~components(.*)$': '<rootDir>/src/components$1'
  }
};
