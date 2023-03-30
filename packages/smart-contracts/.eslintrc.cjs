/**
 * @type {import("eslint").ESLint.ConfigData}
 */
const config = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  overrides: [
    {
      files: ["*.{m,c,}ts"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
      ],
      parserOptions: {
        project: ["tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/restrict-template-expressions": [
          "error",
          {
            allowNumber: true,
            allowBoolean: true,
            allowAny: false,
            allowNullish: true,
            allowRegExp: false,
          },
        ],
      },
    },
    {
      files: ["test/**/*.{m,c,}ts"],
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
      },
    },
    {
      files: ["*.{,c}js"],
      extends: ["eslint:recommended"],
    },
    {
      files: ["*.mjs"],
      extends: ["eslint:recommended"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};

module.exports = config;
