// @ts-check
const base = require('./index.cjs');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...base,
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    ...base.rules,
    'no-console': 'off', // Servers can log freely
  },
};
