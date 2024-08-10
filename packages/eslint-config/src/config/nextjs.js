// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

import { nextConfig, nextIgnores } from "../shared/nextjs.js";

// FlatConfigに対応していないpackageあり
// - eslint-plugin-react-hooks
// - @next/eslint-plugin-next
//
// see: https://zenn.dev/hsato_workman/articles/0f10b04a25963c

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextConfig,
  eslintConfigPrettier,
  ...nextIgnores
);
