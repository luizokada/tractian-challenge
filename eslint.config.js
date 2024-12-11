/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "react", "prettier", "react-hooks"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "no-console": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-extra-boolean-cast": "off",
    "react-hooks/exhaustive-deps": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  root: true,
};
