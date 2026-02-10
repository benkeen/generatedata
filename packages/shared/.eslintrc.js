module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['react'],
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    semi: [2, 'always'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    // 'max-len': [1, { code: 140 }],
    // '@stylistic/js/indent/max-len': ['warning', 140],
    'object-curly-spacing': ['error', 'always'],
    allowIndentationTabs: 0,
    'no-extra-parens': ['off'],
    'no-duplicate-imports': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    'no-multi-spaces': 'error',
    'react/prop-types': ['off'],
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': 'off',
    'no-tabs': 'off',
    'no-multiple-empty-lines': 'off',
    'no-plusplus': 'off',
    'import/no-unresolved': 'off',
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'object-curly-newline': 'off',
    quotes: ['error', 'single'],
    'import/no-mutable-exports': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  },
  settings: {
    react: {
      version: '18.3.1'
    }
  }
};
