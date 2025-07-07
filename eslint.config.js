import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'

export default antfu(
  {
    react: true
  },
  {
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'antfu/if-newline': 'off'
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
