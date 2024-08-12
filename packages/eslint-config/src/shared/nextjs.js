// @ts-check

import tseslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";

import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

// 2024年8月現在、FlatConfigに対応していないpackageあり
// - eslint-plugin-react-hooks
// - @next/eslint-plugin-next
//
// see: https://zenn.dev/hsato_workman/articles/0f10b04a25963c

export const nextConfig = tseslint.config(
  {
    // react
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    // react-hooks
    plugins: {
      // @ts-ignore
      "react-hooks": fixupPluginRules(hooksPlugin),
    },
    // @ts-ignore
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    // next
    plugins: {
      // @ts-ignore
      "@next/next": fixupPluginRules(nextPlugin),
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // 以下を参照して導入
      // https://github.com/vercel/next.js/blob/939251bf65633c6b330bdcd6476e651bbc16efa2/packages/eslint-config-next/index.js#L64-L66
      // https://github.com/vercel/next.js/blob/939251bf65633c6b330bdcd6476e651bbc16efa2/packages/eslint-config-next/index.js#L79
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "off",
    },
  },
);

export const nextIgnores = tseslint.config({
  ignores: [".next/*"],
});
