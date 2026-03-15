const globals = require('globals');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  ...tsPlugin.configs['flat/recommended'],
  reactPlugin.configs.flat.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          experimentalObjectRestSpread: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2015,
        ...globals.node
      }
    },
    settings: {
      react: {
        version: '18.3.1'
      }
    },
    rules: {
      semi: [2, 'always'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'object-curly-spacing': ['error', 'always'],
      allowIndentationTabs: 0,
      'no-extra-parens': ['off'],
      'no-duplicate-imports': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'no-multi-spaces': 'error',
      'react/prop-types': ['off'],
      'react/react-in-jsx-scope': 'off',
      'comma-dangle': 'off',
      'no-tabs': 'off',
      'no-multiple-empty-lines': 'off',
      'no-plusplus': 'off',
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
    }
  }
];
