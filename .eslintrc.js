module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    '@react-native-community',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'comma-dangle': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/style-prop-object': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/unbound-method': 0,
    'global-require': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'no-void': 0,
    'no-useless-constructor': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
};
