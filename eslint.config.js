import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'

export default antfu(
  {
    react: true
  },
  {
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'antfu/if-newline': 'off',
      'react-hooks/exhaustive-deps': 'off',

      'jsdoc/check-alignment': 'off',
      'jsdoc/check-indentation': 'off',
      'jsdoc/check-param-names': 'off',
      'jsdoc/check-tag-names': 'off',
      'jsdoc/check-types': 'off',
      'jsdoc/implements-on-classes': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-param-name': 'off',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-check': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-returns-type': 'off'
    }
  },
  {
    plugins: {
      prettier: eslintConfigPrettier
    },
    rules: {
      ...eslintConfigPrettier.rules
    }
  },
  {
    ignores: [
      '**/routeTree.gen.ts',
      '**/dist',
      '**/node_modules',
      '**/.tanstack'
    ]
  }
)
