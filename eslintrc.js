module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next/core-web-vitals",
    "eslint-config-next", // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:testing-library/react",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "~/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "./images/*",
            group: "type",
            position: "after",
          },
          {
            pattern: "./storybook/*",
            group: "type",
            position: "after",
          },
          {
            pattern: "**/*.{css,scss}",
            group: "type",
            position: "after",
          },
        ],
        alphabetize: { order: "asc" },
        warnOnUnassignedImports: true,
      },
    ],
  },
}
