/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['custom'],
  ignorePatterns: ['src/services/graphql/*', '*.js'],
  rules: {
    // This allows us to use to autofocus attribute on input elements (or all elements, really)
    // It's used for the accordion effects in PriceCalculator. Without autofocus user would have to tab
    // through the entire page to get to the newly shown form items, which is worse than messing
    // with auto-focus. Probably.
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md
    'jsx-a11y/no-autofocus': 'off',
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: ['./tsconfig.json', '../../packages/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        // Causes eslint timeout on our code (src/blocks/HeaderBlock.tsx)
        '@typescript-eslint/no-misused-promises': 'off',
        // TODO: Consider fixing errors and enabling these rules
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ],
}
