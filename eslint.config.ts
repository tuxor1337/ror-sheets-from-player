import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginImport from 'eslint-plugin-import'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    plugins: {import: pluginImport},
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": ["warn", { "allowArgumentsExplicitlyTypedAsAny": true }],
      "import/no-unresolved": ["error", { "ignore": [ "\\?raw$", "virtual:audioFiles" ], "caseSensitive": true }],
      "import/no-extraneous-dependencies": ["error"],
      "@typescript-eslint/no-unused-vars": ["warn", { "args": "none" }],
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": ["warn"],
      "import/no-duplicates": ["warn"],
      "import/namespace": ["error"],
      "import/default": ["error"],
      "@typescript-eslint/no-extra-non-null-assertion": ["error"],
      "@typescript-eslint/no-non-null-asserted-optional-chain": ["error"],
      "@typescript-eslint/prefer-as-const": ["error"],
      "no-restricted-globals": ["error", "$"],
      "no-restricted-imports": ["error", "vue/types/umd"],
      "@typescript-eslint/only-throw-error": ["error"],

      "constructor-super": ["error"],
      "for-direction": ["error"],
      "getter-return": ["error"],
      "no-async-promise-executor": ["error"],
      "no-case-declarations": ["error"],
      "no-class-assign": ["error"],
      "no-compare-neg-zero": ["error"],
      "no-console": ["warn"],
      "no-const-assign": ["error"],
      "no-constant-condition": ["error"],
      "no-control-regex": ["error"],
      "no-debugger": ["error"],
      "no-delete-var": ["error"],
      "no-dupe-args": ["error"],
      "no-dupe-class-members": ["error"],
      "no-dupe-else-if": ["error"],
      "no-dupe-keys": ["error"],
      "no-duplicate-case": ["error"],
      "no-empty": ["error"],
      "no-empty-character-class": ["error"],
      "no-empty-pattern": ["error"],
      "no-ex-assign": ["error"],
      "no-extra-boolean-cast": ["error"],
      "no-fallthrough": ["error"],
      "no-func-assign": ["error"],
      "no-global-assign": ["error"],
      "no-import-assign": ["error"],
      "no-inner-declarations": ["error"],
      "no-invalid-regexp": ["error"],
      "no-irregular-whitespace": ["error"],
      "no-misleading-character-class": ["error"],
      "no-mixed-spaces-and-tabs": ["error"],
      "no-new-symbol": ["error"],
      "no-obj-calls": ["error"],
      "no-octal": ["error"],
      "no-prototype-builtins": ["error"],
      "no-regex-spaces": ["error"],
      "no-self-assign": ["error"],
      "no-setter-return": ["error"],
      "no-shadow-restricted-names": ["error"],
      "no-sparse-arrays": ["error"],
      "no-this-before-super": ["error"],
      "no-unexpected-multiline": ["error"],
      "no-unreachable": ["error"],
      "no-unsafe-finally": ["error"],
      "no-unsafe-negation": ["error"],
      "no-unused-labels": ["error"],
      "no-useless-catch": ["error"],
      "no-useless-escape": ["error"],
      "no-with": ["error"],
      "no-warning-comments": ["warn"],
      "require-yield": ["error"],
      "use-isnan": ["error"],
      "valid-typeof": ["error"],

      "vue/multi-word-component-names": "off"
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
)
