import antfu from '@antfu/eslint-config'

import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    react: {
      overrides: {
        'react/no-useless-fragment': 'off',

        // https://github.com/facebook/react/issues/28313
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
      },
    },
    jsonc: false,
    yaml: false,

    ignores: [
      'src/components/ui/**/*.ts',
      'src/components/ui/**/*.tsx',
      'src/routeTree.gen.ts',
    ],
  },
  ...compat.config({
    // https://github.com/francoismassart/eslint-plugin-tailwindcss
    extends: ['plugin:tailwindcss/recommended'],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  }),
  {
    rules: {
      'unused-imports/no-unused-vars': 'warn',
    },
  },
)
