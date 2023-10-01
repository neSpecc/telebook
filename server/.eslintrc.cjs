module.exports = {
  'extends': [
    'codex/ts',
  ],
  'rules': {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'property',
        'format': ['camelCase', 'PascalCase'],
        'filter': {
          // Allow "2xx" as a property name, used in the API response schema
          'regex': '^(2xx)$',
          'match': false,
        },
      },
    ],
    /** Prefer semicolons */
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'jsdoc/require-returns-type': 'off',
  },
}
