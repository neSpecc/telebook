module.exports = {
  'extends': [
    'codex/ts',
  ],
  parserOptions: {
    project: [
      './tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  include: [
    '.eslintrc.cjs',
  ],
  'rules': {
    /** Prefer semicolons */
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
  },
}
