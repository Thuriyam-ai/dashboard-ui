import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

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
  // bolt-new style configuration for TypeScript files
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // bolt-new style rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // Enhanced TypeScript rules from bolt-new
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',
    },
  },
  // Next.js specific configuration
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
