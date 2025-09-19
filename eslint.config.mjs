import js from "@eslint/js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unicorn from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "eslint:recommended",
      "next/core-web-vitals",
      "next/typescript",
      "plugin:@typescript-eslint/strict-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:jsdoc/recommended-typescript",
      "plugin:typescript-enum/recommended",
      "prettier",
    ],
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"], // Only lint TypeScript files
        parserOptions: {
          project: "./tsconfig.eslint.json",
          tsconfigRootDir: __dirname,
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["jsdoc", "prettier", "typescript-enum"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: "all",
          useTabs: false,
        },
      ],
    },
    settings: {
      jsdoc: {
        mode: "typescript",
      },
    },
  }),
  {
    plugins: {
      unicorn,
    },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
  },
];

export default eslintConfig;
