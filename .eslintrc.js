module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-duplicate-imports": "error",
    quotes: ["error", "single"],
    semi: ["error", "never"],
  },
};
