const path = require("node:path");

/**
 * @type {import("type-fest").PackageJson}
 */
const packageJson = require("./package.json");

/**
 * @param {string} packagePath
 * @return {import("eslint").Linter.ConfigOverride<OverrideRules>}
 */
const createTsProjectOverride = packagePath => {
  return {
    files: [`${packagePath}/**/*.{m,c,}ts`],
    plugins: ["@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "prettier",
    ],
    parserOptions: {
      tsconfigRootDir: path.join(__dirname, packagePath),
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
  };
};

/**
 * @type {import("eslint").ESLint.ConfigData}
 */
const config = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  ignorePatterns: ["./packages/dist/**", "./packages/coverage/**"],
  overrides: [
    {
      files: ["*.{m,c,}ts"],
      plugins: ["@typescript-eslint"],
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
      },
    },
    ...packageJson.workspaces.map(createTsProjectOverride),
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
