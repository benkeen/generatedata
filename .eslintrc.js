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
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', '@stylistic/js'],
  rules: {
    semi: [2, 'always'],
    indent: [
      'error',
      'tab',
      {
        SwitchCase: 1
      }
    ],
    '@stylistic/js/indent/max-len': ['warning', 140],
    'object-curly-spacing': ['error', 'always'],
    allowIndentationTabs: 0,
    'no-extra-parens': ['off'],
    'no-multi-spaces': 'error',
    'react/prop-types': ['off'],
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
    'react/jsx-indent': [2, 'tab'],
    'react/jsx-indent-props': [2, 'tab'],
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
      version: '16.13.1'
    }
  }
};
