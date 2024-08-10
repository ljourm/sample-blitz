// @ts-check

import path from "path"
import { fileURLToPath } from "url"
import { fixupPluginRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"

// https://github.com/import-js/eslint-plugin-import/issues/2948#issuecomment-2148832701
const project = "./tsconfig.json"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
})

function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias]

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`)
  }

  return fixupPluginRules(plugin)
}

const configImportOrder = {
  languageOptions: {
    parserOptions: {
      project,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project,
      },
    },
  },
  plugins: { import: legacyPlugin("eslint-plugin-import", "import") },
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

const pluginsToPatch = [
  "@next/next",
  // Other plugins to patch, example :
  // "react-hooks",
]

// https://github.com/vercel/next.js/issues/64409#issuecomment-2265632495
const compatConfig = [...compat.extends("next/core-web-vitals")]
const patchedConfig = compatConfig.map((entry) => {
  const plugins = entry.plugins
  for (const key in plugins) {
    if (plugins.hasOwnProperty(key) && pluginsToPatch.includes(key)) {
      plugins[key] = fixupPluginRules(plugins[key])
    }
  }
  return entry
})

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("plugin:import/typescript"),
  configImportOrder,
  eslintConfigPrettier
)
