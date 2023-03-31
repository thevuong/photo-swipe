module.exports = {
  extends: ['turbo', 'prettier', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['**/node_modules/**', '**/dist/**'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'newline-before-return': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
  },
};
