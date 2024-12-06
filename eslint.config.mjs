import globals from 'globals'
import merge from '@sequencemedia/eslint-config-standard/merge'

export default [
  ...merge({
    files: [
      '**/*.{cjs,mjs}'
    ],
    ignores: [
      'test'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  ...merge({
    files: [
      'test/**/*.{cjs,mjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  })
]
