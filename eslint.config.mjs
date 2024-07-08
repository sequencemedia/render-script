import globals from 'globals'
import merge from '@sequencemedia/eslint-config-standard/merge'

export default (
  merge({
    ignores: [
      'test'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }).concat(
    merge({
      files: [
        'test/**/*.{cjs,mjs}'
      ],
      languageOptions: {
        globals: {
          ...globals.mocha
        }
      }
    })
  )
)
