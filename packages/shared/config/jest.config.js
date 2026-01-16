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
        tsconfig: './tsconfig.json'
      }
    ]
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+test.ts?(x)'],
  testPathIgnorePatterns: ['/.*.d.ts$', '/dist/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@generatedata|react-select|creatable-select|@react-hook|@testing-library)/)',
    'sinon/pkg/sinon-esm.js'
  ],
  moduleNameMapper: {
    '^@generatedata/utils/(.+)$': '<rootDir>/../../packages/utils/src/$1.ts',
    '^@generatedata/utils$': '<rootDir>/../../packages/utils/src/index.ts',
    '^@generatedata/i18n$': '<rootDir>/../../packages/i18n/locales/en.json',
    '^@generatedata/config/constants$': '<rootDir>/../../packages/config/src/constants.ts',
    '^@generatedata/config/(.+)$': '<rootDir>/../../packages/config/src/$1.ts',
    '^sinon$': '<rootDir>/../../node_modules/.pnpm/sinon@21.0.0/node_modules/sinon/lib/sinon.js'
  }
};
