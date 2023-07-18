/* NOTE: please try to use human-readable rules instead of numbers--
   i.e. 'off' instead of 0, 'warn' instead of 1, 'error' instead of 2,
   also please be mindful about not adding redundant/conflicting rules.
 */

module.exports = {
  env: {
    es6: true,
    node: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: "detect" } },
  plugins: ["react", "import", "@typescript-eslint", "jest"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "no-use-before-define": ["off"],
    "no-trailing-spaces": ["warn"],
    "react/function-component-definition": ["off"],
    "arrow-parens": ["warn", "always"],
    "class-methods-use-this": ["warn"],
    "eol-last": ["warn", "always"],
    "func-call-spacing": ["off"],
    "global-require": ["off"],
    "comma-dangle": ["warn", "always-multiline"],
    "import/no-unresolved": [
      "warn",
      {
        caseSensitive: false,
        ignore: ["@assets", "@screens", "@elements", "@library", "@util", "@state", "../", "./"],
      },
    ],
    "import/extensions": ["off"],
    "import/prefer-default-export": ["off"],
    "lines-between-class-members": ["off"],
    "linebreak-style": ["warn", "unix"],
    "no-async-promise-executor": ["warn"],
    "no-confusing-arrow": ["warn"],
    "no-multiple-empty-lines": [
      "warn",
      {
        max: 2,
        maxEOF: 1,
        maxBOF: 1,
      },
    ],
    "object-curly-spacing": ["warn", "always"],
    "object-property-newline": "warn",
    "no-unused-expressions": ["off"],
    "prefer-object-spread": ["warn"],
    "react/destructuring-assignment": ["warn"],
    "react/jsx-boolean-value": ["warn", "always"],
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }],
    "react/no-unused-prop-types": ["off"],
    "react/no-unescaped-entities": ["warn", { forbid: [">", "}"] }],
    "react/jsx-props-no-spreading": ["off"],
    "react/prop-types": ["off"],
    "react/require-default-props": ["off"],
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-member-accessibility": ["off"],
    "@typescript-eslint/interface-name-prefix": ["off"],
    "@typescript-eslint/no-empty-function": ["warn"],
    "@typescript-eslint/ban-types": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"], /* TODO: remove this!!!! (once all major broken things are fixed) */
    "@typescript-eslint/type-annotation-spacing": ["warn"],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-var-requires": ["off"],
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],
    "max-len": ["warn", { "code": 150 }],
    "function-paren-newline": ["warn", { "minItems": 3 }],
    "object-curly-newline": ["warn", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 3,
      },
      "ObjectPattern": {
        "multiline": true,
        "minProperties": 4,
      },
      "ImportDeclaration": {
        "multiline": true,
        "minProperties": 3,
      },
      "ExportDeclaration": {
        "multiline": true,
        "minProperties": 3,
      },
    }],
    "no-console": ["warn"],
    "no-debugger": ["warn"],
    "indent": ["warn", 2],
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
};
