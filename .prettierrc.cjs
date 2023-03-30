/**
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  jsxBracketSameLine: false,
  proseWrap: "preserve",
  arrowParens: "avoid",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  quoteProps: "as-needed",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: true,
};

module.exports = config;
