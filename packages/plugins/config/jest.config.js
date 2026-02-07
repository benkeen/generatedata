/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '../',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.test.json'
      }
    ]
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+test.ts?(x)'],
  testPathIgnorePatterns: ['/.*.d.ts$', '/dist/'],
  transformIgnorePatterns: ['/node_modules/(?!(@generatedata|react-select|creatable-select|@react-hook|@testing-library)/)'],
  moduleNameMapper: {
    '^@generatedata/utils/(.+)$': '<rootDir>/node_modules/@generatedata/utils/src/$1.ts',
    '^@generatedata/utils$': '<rootDir>/node_modules/@generatedata/utils/src/index.ts',
    '^@generatedata/i18n$': '<rootDir>/node_modules/@generatedata/i18n/locales/en.json',
    '^@generatedata/shared/(.+)$': '<rootDir>/node_modules/@generatedata/shared/src/$1.ts',
    '^@generatedata/shared$': '<rootDir>/node_modules/@generatedata/shared/src/index.ts',
    '^@generatedata/config/(.+)$': '<rootDir>/node_modules/@generatedata/config/src/$1.ts',
    '^@generatedata/config$': '<rootDir>/node_modules/@generatedata/config/src/index.ts',
    '^@react-hook/throttle$': '<rootDir>/node_modules/@react-hook/throttle/dist/umd/use-throttle.js',
    '^sinon$': '<rootDir>/node_modules/sinon/lib/sinon.js'
  }
};
