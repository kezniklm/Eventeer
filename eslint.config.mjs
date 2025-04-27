import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import preferArrow from "eslint-plugin-prefer-arrow";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores([
    "**/.eslintrc.cjs",
    "**/tailwind.config.cjs",
    "**/postcss.config.js",
    "**/next.config.mjs",
    "**/*.md",
    "**/*.html"
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "next/core-web-vitals",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended"
      )
    ),

    plugins: {
      import: fixupPluginRules(_import),
      react: fixupPluginRules(react),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "prefer-arrow": preferArrow,
      "jsx-a11y": fixupPluginRules(jsxA11Y),
      prettier: fixupPluginRules(prettier)
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },

        project: "./tsconfig.json"
      }
    },

    settings: {
      react: {
        version: "detect"
      },

      "import/resolver": {
        node: {
          paths: "src"
        },

        typescript: {
          extensionAlias: {
            ".js": [".ts", ".tsx", ".d.ts", ".js"],
            ".jsx": [".tsx", ".d.ts", ".jsx"],
            ".cjs": [".cts", ".d.cts", ".cjs"],
            ".mjs": [".mts", ".d.mts", ".mjs"]
          }
        }
      }
    },

    rules: {
      indent: "off",
      quotes: "off",
      "linebreak-style": "off",
      semi: "off",
      "no-template-curly-in-string": ["error"],
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
      "no-var": "error",
      "no-useless-rename": "error",
      "object-shorthand": ["error", "always"],
      "comma-dangle": ["error", "never"],
      "arrow-body-style": ["error", "as-needed"],
      eqeqeq: ["error", "always"],
      "dot-notation": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "prefer-arrow/prefer-arrow-functions": "error",

      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function"
        }
      ],

      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": ["error", "never"],
      "react/jsx-curly-spacing": ["error", "never"],
      "react/jsx-equals-spacing": ["error", "never"],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-no-useless-fragment": "error",
      "react/display-name": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],

      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"]
        }
      ]
    }
  },
  {
    files: ["**/*.tsx"],

    rules: {
      "react/prop-types": "off"
    }
  }
]);
