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
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true
        }
      }
    ]
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+test.ts?(x)'],
  testPathIgnorePatterns: ['/.*.d.ts$', '/dist/'],
  transformIgnorePatterns: ['node_modules/(?!(@generatedata|react-select|creatable-select)/)'],
  moduleNameMapper: {
    '^@generatedata/utils(.*)$': '<rootDir>/../../packages/utils/src$1.ts',
    '^@generatedata/i18n$': '<rootDir>/../../packages/i18n/locales/en.json',
    '^@generatedata/shared$': '<rootDir>/../../packages/shared/src/index.ts',
    '^@generatedata/config/(.*)$': '<rootDir>/../../packages/config/src/$1.ts'
  }
};
