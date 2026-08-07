import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { "argsIgnorePattern": "^_" }],
    },
  }),
  {
    files: ['src/modules/portal/**/*.ts', 'src/modules/portal/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', {
        'patterns': [
          {
            'group': ['@/modules/admin/**', '**/modules/admin/**'],
            'message': 'Không được phép import từ admin module vào portal module để bảo toàn tính độc lập.'
          }
        ]
      }]
    }
  },
  {
    files: ['src/modules/admin/**/*.ts', 'src/modules/admin/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', {
        'patterns': [
          {
            'group': ['@/modules/portal/**', '**/modules/portal/**'],
            'message': 'Không được phép import từ portal module vào admin module để bảo toàn tính độc lập.'
          }
        ]
      }]
    }
  }
];

export default eslintConfig;
