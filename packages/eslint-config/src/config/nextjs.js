// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

import { nextConfig, nextIgnores } from "../shared/nextjs.js";
import { importConfig } from "../shared/import.js";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextConfig,
  eslintConfigPrettier,
  ...importConfig,
  ...nextIgnores,
);
