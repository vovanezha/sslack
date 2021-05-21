module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    },
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: ["unicorn", "eslint-plugin-import-helpers", "svelte3"],
  extends: ["plugin:unicorn/recommended"],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    "unicorn/no-null": "off",
    "unicorn/prefer-module": "off",
  }
}