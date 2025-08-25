/**
 * Root ESLint configuration for the monorepo.
 *
 * This configuration sets up sensible defaults for TypeScript, React and Prettier
 * integration. Each package can extend or override these settings by placing
 * their own `.eslintrc` file in the package root.
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    // Turn off prop-types as we use TypeScript for type checking
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    // Allow unused variables if they begin with an underscore
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // Prettier errors are treated as linting errors
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
      env: { jest: true, node: true },
    },
  ],
};
