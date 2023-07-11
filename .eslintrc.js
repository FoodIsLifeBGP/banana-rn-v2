/* NOTE: please try to use human-readable rules instead of numbers--
   i.e. 'off' instead of 0, 'warn' instead of 1, 'error' instead of 2,
   also please be mindful about not adding redundant/conflicting rules.
 */

module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    'no-use-before-define': 'off',
    'array-bracket-spacing': [ 'warn', 'always' ],
    'react/function-component-definition': [ 'off', 'never' ],
    'arrow-parens': [ 'warn', 'always' ],
    'class-methods-use-this': 'off',
    'eol-last': [ 'warn', 'always' ],
    'func-call-spacing': 'off',
    'global-require': 'off',
    'import/extensions': [ 'off', 'never' ],
    'object-curly-newline': [ 'warn', {
      ObjectExpression: { multiline: true, minProperties: 3 },
      ObjectPattern: { multiline: true, minProperties: 3 },
      ImportDeclaration: 'never',
      ExportDeclaration: { multiline: true, minProperties: 3 },
    } ],
    'import/no-unresolved': [
      'error',
      {
        caseSensitive: false,
        ignore: [
          '@assets',
          '@screens',
          '@elements',
          '@library',
          '@util',
          '@state',
          '../',
          './',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    indent: [ 'warn', 2 ],
    'lines-between-class-members': 'off',
    'linebreak-style': 'off',
    'max-len': [ 'warn', 150 ],
    'no-async-promise-executor': 'warn',
    'no-confusing-arrow': [
      'warn',
      { allowParens: true },
    ],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 2,
        maxEOF: 1,
        maxBOF: 1,
      },
    ],
    'no-tabs': [
      'warn',
      { allowIndentationTabs: true },
    ],
    'no-unused-expressions': 'off',
    'prefer-object-spread': 'warn',
    quotes: [ 'error', 'single', 'avoid-escape' ],
    'react/destructuring-assignment': [ 'warn' ],
    'react/jsx-indent': [ 'error', 2 ],
    'react/jsx-indent-props': [ 'error', 2 ],
    'react/jsx-boolean-value': [ 'warn', 'always' ],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: [
          '.ts',
          '.tsx',
        ],
      },
    ],
    'react/no-unused-prop-types': 'off',
    'react/no-unescaped-entities': [
      'warn',
      {
        forbid: [
          '>',
          '}',
        ],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    semi: [ 'warn', 'always' ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': [ 'off' ],
    '@typescript-eslint/explicit-member-accessibility': [ 'off' ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/ban-types': [ 'off' ],
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/semi': [ 'warn' ],
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
};

