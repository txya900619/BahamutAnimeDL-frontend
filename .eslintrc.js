module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        allowDestructuring: true, // Allow `const { props, state } = this`; false by default
        allowedNames: ["vm"] // Allow `const self = this`; `[]` by default
      }
    ]
  }
};
