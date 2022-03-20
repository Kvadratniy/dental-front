module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: false,
    },
  },

  rules: {
    'vue/valid-v-slot': 'off',
    'vue/no-deprecated-filter': 'warn',
    'prettier/prettier': ['error', { singleQuote: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },

  extends: [
    'plugin:vue/recommended',
    // 'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
};
