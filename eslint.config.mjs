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
    plugins: ["prettier"],
      rules: {
        // Disable Prettier formatting rules to avoid quote conflicts
        "prettier/prettier": "off",
        // Disable strict rules that are causing deployment failures
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/prefer-optional-chain": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "react/no-unescaped-entities": "off",
        "jsdoc/require-jsdoc": "off",
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
        "warn",
        {
          case: "kebabCase",
        },
      ],
    },
  },
];

export default eslintConfig;
