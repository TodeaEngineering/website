import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      'react/no-danger': 'warn',
      'react/jsx-no-target-blank': ['error', { allowReferrer: false, enforceDynamicLinks: 'always' }],
      'react/jsx-no-script-url': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-script-url': 'error',
      'react-hooks/set-state-in-effect': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['.next/**', 'out/**', '.wrangler/**', 'node_modules/**', 'next-env.d.ts'],
  },
];
