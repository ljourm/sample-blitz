// @ts-check

// eslint-plugin-import はFlatConfig未対応
// PR
// - https://github.com/import-js/eslint-plugin-import/pull/3018
// Issue
// - https://github.com/import-js/eslint-plugin-import/issues/2948
// - https://github.com/import-js/eslint-plugin-import/issues/2556

import path from "path";
import { fileURLToPath } from "url";

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";

import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";

const importRules = {
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
};

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslintJs.configs.recommended,
});

function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export const importConfig = tseslint.config({
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: {
    import: legacyPlugin("eslint-plugin-import", "import"),
  },
  // @ts-ignore rulesの型定義のexportが不足している模様で、解消できなかったためignore
  rules: importRules,
});
